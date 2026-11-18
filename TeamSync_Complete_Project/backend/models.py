from pydantic import BaseModel
from typing import List, Optional

class UserProfile(BaseModel):
    name: str
    roll_no: str
    course: str
    skills: List[str]
    interests: List[str]
    profile_pic: Optional[str] = None
    resume_url: Optional[str] = None

class ProjectProfile(BaseModel):
    title: str
    description: str
    required_skills: List[str]
    created_by: str

class Message(BaseModel):
    sender_id: str
    receiver_id: str
    content: str
