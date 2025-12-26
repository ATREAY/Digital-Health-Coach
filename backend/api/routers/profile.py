from fastapi import APIRouter, Depends
from pydantic import BaseModel
from db.crud import upsert_user_profile
from core.auth import get_current_user

router = APIRouter()

class Profile(BaseModel):
    name: str
    age: int
    height: float
    weight_goal: float
    fitness_goal: str
    start_date: str

@router.post("/")
def create_profile(profile: Profile, user=Depends(get_current_user)):
    data = profile.dict()
    data["user_id"] = user["id"]
    upsert_user_profile(data)
    return {"status": "profile saved"}
