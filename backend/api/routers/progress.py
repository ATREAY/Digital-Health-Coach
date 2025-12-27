from fastapi import APIRouter, Depends
from db.crud import (
    get_logs_by_user,
    get_plans_by_user,
    get_decisions_by_user
)
from core.auth import get_current_user

router = APIRouter()

@router.get("/")
def get_progress(user=Depends(get_current_user)):
    uid = user["id"]

    logs_data = get_logs_by_user(uid)
    plans_data = get_plans_by_user(uid)

    # get only the last (most recent) decision
    decisions = get_decisions_by_user(uid)
    last_decision = decisions[-1] if decisions else None

    return {
        "logs": logs_data,
        "plans": plans_data,
        "latest_decision": last_decision
    }
