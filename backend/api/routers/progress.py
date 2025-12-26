from fastapi import APIRouter, Depends
from db.crud import get_logs_by_user, get_plans_by_user, get_decisions_by_user
from core.auth import get_current_user

router = APIRouter()

@router.get("/")
def get_progress(user = Depends(get_current_user)):
    user_id = user["id"]
    return {
        "logs": get_logs_by_user(user_id),
        "plans": get_plans_by_user(user_id),
        "decisions": get_decisions_by_user(user_id)
    }
