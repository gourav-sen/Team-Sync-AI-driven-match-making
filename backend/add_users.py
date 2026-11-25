import asyncio
from database import users_collection
from ai_engine import generate_embedding

async def seed_data():
    users = [
        {
            "name": "Aayush Raj",
            "roll_no": "2501940005",
            "course": "MCA AIML - A",
            "skills": ["React.js", "Node.js", "Tailwind CSS", "JavaScript", "Frontend"],
            "interests": ["Web Development", "UI/UX"],
            "available_hours": 15,
            "shift_preference": "Day",
            "commit_frequency": "Daily"
        },
        {
            "name": "Harsh",
            "roll_no": "2501940010",
            "course": "MCA AIML - A",
            "skills": ["Python", "Django", "SQL", "Backend", "APIs"],
            "interests": ["Data Science", "Backend Development"],
            "available_hours": 12,
            "shift_preference": "Night",
            "commit_frequency": "Weekly"
        },
        {
            "name": "Aditya Singh",
            "roll_no": "2501940015",
            "course": "MCA AIML - A",
            "skills": ["Machine Learning", "Python", "FastAPI", "TensorFlow", "AI"],
            "interests": ["Artificial Intelligence", "Deep Learning"],
            "available_hours": 20,
            "shift_preference": "Day",
            "commit_frequency": "Daily"
        }
    ]

    print("Generating AI Embeddings and saving to MongoDB... Please wait.")
    
    for user in users:
        # NLP Vectors generate ho rahe hain
        combined_text = user["skills"] + user["interests"]
        user["embedding"] = generate_embedding(combined_text)
        await users_collection.update_one(
            {"roll_no": user["roll_no"]},
            {"$set": user},
            upsert=True
        )
        print(f"Added/Updated {user['name']} in database successfully!")
        
    print("All real profiles added! You can now test the matchmaking in frontend.")

if __name__ == "__main__":
    asyncio.run(seed_data())