from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
db = client["teamsync"]
users_collection = db["users"]
projects_collection = db["projects"]
messages_collection = db["messages"]
