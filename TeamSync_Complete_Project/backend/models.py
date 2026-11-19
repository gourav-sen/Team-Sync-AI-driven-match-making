from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserProfile(BaseModel):
    name: str
    roll_no: str
    course: str
    skills: List[str] = Field(default_factory=list)
    interests: List[str] = Field(default_factory=list)
    profile_pic: Optional[str] = None
    resume_url: Optional[str] = None
    available_hours: Optional[int] = 10
    shift_preference: Optional[str] = "Day"
    commit_frequency: Optional[str] = "Weekly"

class ProjectProfile(BaseModel):
    title: str
    description: str
    required_skills: List[str] = Field(default_factory=list)
    roles: List[str] = Field(default_factory=list)
    created_by: Optional[str] = "Anonymous"
    created_at: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())

class MessageCreate(BaseModel):
    sender_id: str
    receiver_id: str
    content: str
    timestamp: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())

class ProjectAnalyzeRequest(BaseModel):
    description: str

class ProjectCreateRequest(BaseModel):
    title: str
    description: str
    roles: List[str] = Field(default_factory=list)
    skills: List[str] = Field(default_factory=list)

class UserAvailability(BaseModel):
    available_hours: int = 10
    shift_preference: str = "Day"
    commit_frequency: str = "Weekly"

class ChallengeGenerate(BaseModel):
    tech_stack: List[str] = Field(default_factory=list)

class ChallengeSubmit(BaseModel):
    challenge_id: str
    user_id: str
    response: str
