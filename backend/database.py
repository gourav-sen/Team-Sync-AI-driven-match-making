from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.environ.get(
    "MONGO_URL",
    "mongodb+srv://gouravsen44441_db_user:Gourav123@cluster0.poobuxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
client = AsyncIOMotorClient(MONGO_URL)
db = client["teamsync"]
users_collection = db["users"]
projects_collection = db["projects"]
messages_collection = db["messages"]
challenges_collection = db["challenges"]

