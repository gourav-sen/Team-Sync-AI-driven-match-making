from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from bson.errors import InvalidId

# --- MACHINE LEARNING LIBRARIES ---
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
# ----------------------------------

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cloud Database Connection
client = AsyncIOMotorClient("mongodb+srv://gouravsen44441_db_user:Gourav123@cluster0.poobuxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["teamsync"]

class ProjectAnalyzeRequest(BaseModel):
    description: str

class ProjectCreateRequest(BaseModel):
    title: str
    description: str
    roles: List[str]
    skills: List[str]

class UserAvailability(BaseModel):
    available_hours: int
    shift_preference: str
    commit_frequency: str

class ChallengeGenerate(BaseModel):
    tech_stack: List[str]

class ChallengeSubmit(BaseModel):
    challenge_id: str
    user_id: str
    response: str

# ---------------------------------------------------------
# ML MODEL 1: NLP (TF-IDF Vectorizer) for Keyword Analysis
# ---------------------------------------------------------
# Ye model text ko vectorize karke important skills extract karega
tech_vocabulary = ["react", "frontend", "backend", "fastapi", "mongodb", "python", "java", "c++", "machine learning", "ai", "data science", "node.js", "sql", "app", "mobile"]

@app.post("/api/projects/analyze")
async def analyze_project(req: ProjectAnalyzeRequest):
    desc = req.description.lower().strip()
    
    if len(desc) < 5:
        return {"roles": ["Invalid Input"], "skills": ["Please provide a detailed description."]}
        
    # Using Scikit-Learn TF-IDF to find important keywords
    vectorizer = TfidfVectorizer(vocabulary=tech_vocabulary)
    tfidf_matrix = vectorizer.fit_transform([desc])
    
    feature_names = vectorizer.get_feature_names_out()
    scores = tfidf_matrix.toarray()[0]
    
    extracted_skills = []
    roles = set()
    
    # Analyze TF-IDF scores
    for i, score in enumerate(scores):
        if score > 0: # If the word has mathematical importance in text
            skill = feature_names[i]
            extracted_skills.append(skill.capitalize())
            
            # Map ML extracted skills to roles
            if skill in ["react", "frontend"]: roles.add("Frontend Developer")
            elif skill in ["backend", "fastapi", "node.js"]: roles.add("Backend Developer")
            elif skill in ["mongodb", "sql"]: roles.add("Database Administrator")
            elif skill in ["python", "machine learning", "ai", "data science"]: roles.add("AI Engineer")
            elif skill in ["java", "c++"]: roles.add("Software Engineer")
            elif skill in ["app", "mobile"]: roles.add("Mobile Developer")

    if not roles:
        return {"roles": ["General Developer"], "skills": ["Programming"]}
        
    return {"roles": list(roles), "skills": list(extracted_skills)}

@app.post("/api/projects/create")
async def create_project(req: ProjectCreateRequest):
    try:
        doc = req.dict()
        result = await db.projects.insert_one(doc)
        return {"project_id": str(result.inserted_id), "status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/users/{user_id}/availability")
async def update_availability(user_id: str, req: UserAvailability):
    await db.users.update_one(
        {"_id": user_id},
        {"$set": req.dict()},
        upsert=True
    )
    return {"status": "success"}

# ---------------------------------------------------------
# ML MODEL 2: Cosine Similarity for Matchmaking/Synergy
# ---------------------------------------------------------
@app.get("/api/match/synergy/{user_id}/{target_user_id}")
async def calculate_synergy(user_id: str, target_user_id: str):
    user_a = await db.users.find_one({"_id": user_id})
    user_b = await db.users.find_one({"_id": target_user_id})
    
    # Feature extraction function for ML Vector
    def extract_features(user_data):
        if not user_data: return [10, 1] # Default fallback
        hours = user_data.get("available_hours", 10)
        shift = 1 if user_data.get("shift_preference", "Day") == "Day" else 0
        return [hours, shift]
    
    # Convert profiles to Numpy Arrays
    vec_a = np.array(extract_features(user_a)).reshape(1, -1)
    vec_b = np.array(extract_features(user_b)).reshape(1, -1)
    
    # Apply Scikit-Learn Cosine Similarity
    similarity = cosine_similarity(vec_a, vec_b)[0][0]
    
    # Convert similarity (0 to 1) into percentage score
    score = int(similarity * 100)
    
    conflicts = []
    if extract_features(user_a)[1] != extract_features(user_b)[1]:
        conflicts.append("Shift mismatch identified by model")
        score = score - 15 # Penalty for conflict
        
    return {"synergy_score": score, "conflicts": conflicts}

# ---------------------------------------------------------
# ML MODEL 3: K-Means Clustering for Team Generation
# ---------------------------------------------------------
@app.get("/api/teams/cluster")
async def generate_team_clusters():
    # Fetch available users from MongoDB
    cursor = db.users.find({})
    users = await cursor.to_list(length=100)
    
    if len(users) < 3:
        return {"status": "error", "message": "Need at least 3 users in DB to train K-Means"}
        
    # Feature Engineering for Model Input
    X = []
    user_ids = []
    for u in users:
        hours = u.get("available_hours", 10)
        shift = 1 if u.get("shift_preference", "Day") == "Day" else 0
        X.append([hours, shift])
        user_ids.append(str(u["_id"]))
        
    X_train = np.array(X)
    
    # Train K-Means Model (2 Clusters/Teams)
    kmeans = KMeans(n_clusters=2, random_state=42, n_init="auto")
    kmeans.fit(X_train)
    
    # Group users by their ML assigned labels
    clusters = {"Team_1": [], "Team_2": []}
    for i, label in enumerate(kmeans.labels_):
        cluster_name = f"Team_{label + 1}"
        clusters[cluster_name].append(user_ids[i])
        
    return {"status": "success", "ml_model": "K-Means Clustering", "teams": clusters}


@app.post("/api/challenges/generate")
async def generate_challenge(req: ChallengeGenerate):
    stack_str = ", ".join(req.tech_stack)
    scenario = "Design a scalable architecture using " + stack_str
    doc = {"scenario": scenario, "submissions": {}}
    result = await db.challenges.insert_one(doc)
    return {"challenge_id": str(result.inserted_id), "scenario": scenario}

@app.post("/api/challenges/submit")
async def submit_challenge(req: ChallengeSubmit):
    try:
        obj_id = ObjectId(req.challenge_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid Challenge ID format")

    update_key = "submissions." + req.user_id
    result = await db.challenges.update_one(
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

    challenge = await db.challenges.find_one({"_id": obj_id})
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found in database")
        
    submissions = challenge.get("submissions", {})
    is_complete = len(submissions.keys()) >= 2
    return {"complete": is_complete, "submissions_count": len(submissions.keys())}