from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from db.crud import upsert_user_profile, get_profile_by_user
from core.auth import get_current_user

router = APIRouter()

class Profile(BaseModel):
    name: str
    age: int
    height: float
    current_weight: float           
    weight_goal: float
    fitness_goal: str
    training_preference: str        
    start_date: str


# Create or update the profile
@router.post("/")
def create_profile(profile: Profile, user=Depends(get_current_user)):
    data = profile.dict()
    data["user_id"] = user["id"]
    upsert_user_profile(data)
    return {"status": "Profile saved successfully"}


# Fetch the current user's profile
@router.get("/")
def fetch_profile(user=Depends(get_current_user)):
    profile_data = get_profile_by_user(user["id"])
    if not profile_data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile_data
