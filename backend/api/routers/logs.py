from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from db.crud import create_daily_log
from core.auth import get_current_user
router = APIRouter()

class LogEntry(BaseModel):
    date: str
    workout_done: bool
    duration: Optional[int] = None
    weight: Optional[float] = None
    mood: Optional[int] = None
    notes: str = ""


@router.post("/")
def post_log(entry: LogEntry, user=Depends(get_current_user)):
    entry_dict = entry.dict()
    entry_dict["user_id"] = user["id"]
    create_daily_log(entry_dict)
    return {"status": "log saved"}