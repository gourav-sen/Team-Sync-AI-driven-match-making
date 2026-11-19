from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from bson import ObjectId
from bson.errors import InvalidId
from datetime import datetime

# --- MACHINE LEARNING LIBRARIES ---
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
# ----------------------------------

from database import (
    db,
    users_collection,
    projects_collection,
    messages_collection,
    challenges_collection,
    serialize_doc,
    serialize_docs,
)
from models import (
    UserProfile,
    ProjectProfile,
    MessageCreate,
    ProjectAnalyzeRequest,
    ProjectCreateRequest,
    UserAvailability,
    ChallengeGenerate,
    ChallengeSubmit,
)

app = FastAPI(
    title="TeamSync AI API",
    description="Machine Learning Powered Innovation Matchmaking Platform",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def to_dict(model_obj):
    """Safe Pydantic v1 / v2 dict serialization."""
    if hasattr(model_obj, "model_dump"):
        return model_obj.model_dump()
    return model_obj.dict()

def find_user_query(identifier: str):
    """Builds a query to find user by ObjectId, roll_no, or name."""
    queries = [{"roll_no": identifier}, {"name": identifier}, {"_id": identifier}]
    if ObjectId.is_valid(identifier):
        queries.append({"_id": ObjectId(identifier)})
    return {"$or": queries}

# ---------------------------------------------------------
# Health & Root Endpoints
# ---------------------------------------------------------
@app.get("/")
@app.get("/api")
@app.get("/api/")
async def root():
    return {
        "status": "online",
        "service": "TeamSync AI Platform",
        "version": "2.0.0",
        "endpoints": {
            "projects_analyze": "/api/projects/analyze",
            "projects_list": "/api/projects",
            "projects_create": "/api/projects/create",
            "synergy_match": "/api/match/synergy/{user_id}/{target_user_id}",
            "team_cluster": "/api/teams/cluster",
            "challenges": "/api/challenges/generate",
            "messages": "/api/messages",
            "docs": "/docs",
        },
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

# ---------------------------------------------------------
# ML MODEL 1: NLP (TF-IDF Vectorizer) for Keyword Analysis
# ---------------------------------------------------------
tech_vocabulary = [
    "react", "frontend", "backend", "fastapi", "mongodb", "python",
    "java", "c++", "machine learning", "ai", "data science", "node.js",
    "sql", "app", "mobile", "typescript", "javascript", "devops",
    "docker", "kubernetes", "flutter", "aws", "cloud", "ui/ux", "designer"
]

@app.post("/api/projects/analyze")
async def analyze_project(req: ProjectAnalyzeRequest):
    desc = req.description.lower().strip()
    
    if len(desc) < 5:
        return {"roles": ["General Developer"], "skills": ["Please provide a detailed description."]}
        
    vectorizer = TfidfVectorizer(vocabulary=tech_vocabulary)
    tfidf_matrix = vectorizer.fit_transform([desc])
    
    feature_names = vectorizer.get_feature_names_out()
    scores = tfidf_matrix.toarray()[0]
    
    extracted_skills = []
    roles = set()
    
    for i, score in enumerate(scores):
        if score > 0:
            skill = feature_names[i]
            extracted_skills.append(skill.title() if "/" not in skill else skill.upper())
            
            # Map ML extracted skills to roles
            if skill in ["react", "frontend", "javascript", "typescript"]:
                roles.add("Frontend Developer")
            elif skill in ["backend", "fastapi", "node.js", "sql"]:
                roles.add("Backend Developer")
            elif skill in ["mongodb"]:
                roles.add("Database Administrator")
            elif skill in ["python", "machine learning", "ai", "data science"]:
                roles.add("AI Engineer")
            elif skill in ["java", "c++"]:
                roles.add("Software Engineer")
            elif skill in ["app", "mobile", "flutter"]:
                roles.add("Mobile Developer")
            elif skill in ["devops", "docker", "kubernetes", "aws", "cloud"]:
                roles.add("DevOps & Cloud Engineer")
            elif skill in ["ui/ux", "designer"]:
                roles.add("UI/UX Designer")

    if not roles:
        roles.add("Full Stack Developer")
        extracted_skills = ["Python", "React", "REST APIs"]
        
    return {"roles": list(roles), "skills": list(extracted_skills)}

# ---------------------------------------------------------
# Projects Endpoints
# ---------------------------------------------------------
@app.get("/api/projects")
async def get_projects():
    cursor = projects_collection.find({}).sort("_id", -1)
    projects = await cursor.to_list(length=50)
    return serialize_docs(projects)

@app.post("/api/projects/create")
async def create_project(req: ProjectCreateRequest):
    try:
        doc = to_dict(req)
        doc["created_at"] = datetime.utcnow().isoformat()
        result = await projects_collection.insert_one(doc)
        return {"project_id": str(result.inserted_id), "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------------------------------------
# Users & Availability
# ---------------------------------------------------------
@app.get("/api/users")
async def get_users():
    cursor = users_collection.find({}, {"embedding": 0}).sort("_id", -1)
    users = await cursor.to_list(length=100)
    return serialize_docs(users)

@app.put("/api/users/{user_id}/availability")
async def update_availability(user_id: str, req: UserAvailability):
    query = find_user_query(user_id)
    await users_collection.update_one(
        query,
        {"$set": to_dict(req)},
        upsert=True
    )
    return {"status": "success"}

# ---------------------------------------------------------
# ML MODEL 2: Cosine Similarity for Matchmaking/Synergy
# ---------------------------------------------------------
@app.get("/api/match/synergy/{user_id}/{target_user_id}")
async def calculate_synergy(user_id: str, target_user_id: str):
    user_a = await users_collection.find_one(find_user_query(user_id))
    user_b = await users_collection.find_one(find_user_query(target_user_id))
    
    def extract_features(user_data):
        if not user_data:
            return [10, 1]
        hours = user_data.get("available_hours", 10)
        shift = 1 if user_data.get("shift_preference", "Day").lower() == "day" else 0
        return [hours, shift]
    
    vec_a = np.array(extract_features(user_a)).reshape(1, -1)
    vec_b = np.array(extract_features(user_b)).reshape(1, -1)
    
    similarity = cosine_similarity(vec_a, vec_b)[0][0]
    score = int(similarity * 100)
    
    conflicts = []
    if extract_features(user_a)[1] != extract_features(user_b)[1]:
        conflicts.append("Shift mismatch identified by synergy model")
        score = max(0, score - 15)
        
    return {
        "synergy_score": min(score, 100),
        "status": "Compatible" if score >= 70 else "Potential Conflicts",
        "conflicts": conflicts
    }

# ---------------------------------------------------------
# ML MODEL 3: K-Means Clustering for Team Generation
# ---------------------------------------------------------
@app.get("/api/teams/cluster")
async def generate_team_clusters():
    cursor = users_collection.find({})
    users = await cursor.to_list(length=100)
    
    if len(users) < 2:
        return {
            "status": "notice",
            "message": "At least 2 users required for clustering. Seed users first via add_users.py",
            "teams": {"Team_1": ["Sample User 1"], "Team_2": ["Sample User 2"]}
        }
        
    X = []
    user_ids = []
    for u in users:
        hours = u.get("available_hours", 10)
        shift = 1 if u.get("shift_preference", "Day").lower() == "day" else 0
        X.append([hours, shift])
        user_ids.append(u.get("name", str(u["_id"])))
        
    X_train = np.array(X)
    n_clusters = min(2, len(users))
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init="auto")
    kmeans.fit(X_train)
    
    clusters = {}
    for i in range(n_clusters):
        clusters[f"Team_{i + 1}"] = []
        
    for i, label in enumerate(kmeans.labels_):
        clusters[f"Team_{label + 1}"].append(user_ids[i])
        
    return {"status": "success", "ml_model": "K-Means Clustering", "teams": clusters}

# ---------------------------------------------------------
# Challenges Endpoints
# ---------------------------------------------------------
@app.post("/api/challenges/generate")
async def generate_challenge(req: ChallengeGenerate):
    stack_str = ", ".join(req.tech_stack) if req.tech_stack else "FastAPI, React & MongoDB"
    scenario = f"Design a high-throughput, scalable architecture implementing JWT auth and WebSockets using {stack_str}."
    doc = {
        "scenario": scenario,
        "submissions": {},
        "created_at": datetime.utcnow().isoformat()
    }
    result = await challenges_collection.insert_one(doc)
    return {"challenge_id": str(result.inserted_id), "scenario": scenario}

@app.post("/api/challenges/submit")
async def submit_challenge(req: ChallengeSubmit):
    try:
        obj_id = ObjectId(req.challenge_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid Challenge ID format")

    update_key = f"submissions.{req.user_id}"
    result = await challenges_collection.update_one(
        {"_id": obj_id},
        {"$set": {update_key: req.response}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Challenge not found")
        
    return {"status": "submitted"}

@app.get("/api/challenges/{challenge_id}/status")
async def challenge_status(challenge_id: str):
    try:
        obj_id = ObjectId(challenge_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid Challenge ID format")

    challenge = await challenges_collection.find_one({"_id": obj_id})
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
        
    submissions = challenge.get("submissions", {})
    return {"complete": len(submissions) >= 2, "submissions_count": len(submissions)}

# ---------------------------------------------------------
# Messages Endpoints
# ---------------------------------------------------------
@app.get("/api/messages")
async def get_messages(user_a: Optional[str] = None, user_b: Optional[str] = None):
    query = {}
    if user_a and user_b:
        query = {
            "$or": [
                {"sender_id": user_a, "receiver_id": user_b},
                {"sender_id": user_b, "receiver_id": user_a},
            ]
        }
    cursor = messages_collection.find(query).sort("timestamp", 1)
    messages = await cursor.to_list(length=100)
    return serialize_docs(messages)

@app.post("/api/messages")
async def send_message(msg: MessageCreate):
    doc = to_dict(msg)
    result = await messages_collection.insert_one(doc)
    return {"status": "sent", "message_id": str(result.inserted_id)}
