import os
from motor.motor_asyncio import AsyncIOMotorClient

# Load from environment or fallback to cloud cluster
DEFAULT_MONGO_URL = (
    "mongodb+srv://gouravsen44441_db_user:Gourav123@cluster0.poobuxn.mongodb.net/"
    "?retryWrites=true&w=majority&appName=Cluster0"
)
MONGO_URL = os.environ.get("MONGO_URL", DEFAULT_MONGO_URL)

client = AsyncIOMotorClient(MONGO_URL)
db = client["teamsync"]

users_collection = db["users"]
projects_collection = db["projects"]
messages_collection = db["messages"]
challenges_collection = db["challenges"]

def serialize_doc(doc):
    """Converts MongoDB BSON ObjectId to string representation for JSON responses."""
    if not doc:
        return doc
    doc_copy = dict(doc)
    if "_id" in doc_copy:
        doc_copy["id"] = str(doc_copy.pop("_id"))
    return doc_copy

def serialize_docs(docs):
    """Converts a list of MongoDB documents."""
    return [serialize_doc(d) for d in docs]
