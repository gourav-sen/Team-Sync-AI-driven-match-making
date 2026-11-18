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
            "interests": ["Web Development", "UI/UX"]
        },
        {
            "name": "Harsh",
            "roll_no": "2501940010",
            "course": "MCA AIML - A",
            "skills": ["Python", "Django", "SQL", "Backend", "APIs"],
            "interests": ["Data Science", "Backend Development"]
        },
        {
            "name": "Aditya Singh",
            "roll_no": "2501940015",
            "course": "MCA AIML - A",
            "skills": ["Machine Learning", "Python", "FastAPI", "TensorFlow", "AI"],
            "interests": ["Artificial Intelligence", "Deep Learning"]
        }
    ]

    print("Generating AI Embeddings and saving to MongoDB... Please wait.")
    
    for user in users:
        # NLP Vectors generate ho rahe hain
        combined_text = user["skills"] + user["interests"]
        user["embedding"] = generate_embedding(combined_text)
        await users_collection.insert_one(user)
        print(f"Added {user['name']} to database successfully!")
        
    print("All real profiles added! You can now test the matchmaking in frontend.")

if __name__ == "__main__":
    asyncio.run(seed_data())