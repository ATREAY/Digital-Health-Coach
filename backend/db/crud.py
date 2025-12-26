from db.collections import users, logs, plans, decisions, profiles
from datetime import datetime

# ---------- USERS (Auth) ----------

def find_user(email: str):
    return users.find_one({"email": email})

def create_user(user: dict):
    return users.insert_one(user)

# ---------- PROFILES ----------

def upsert_user_profile(profile: dict):
    # create or update profile by user_id
    return profiles.update_one(
        {"user_id": profile["user_id"]},
        {"$set": profile},
        upsert=True
    )

def get_profile_by_user(user_id):
    prof = profiles.find_one({"user_id": user_id})
    if prof:
        prof["id"] = str(prof["_id"])
        prof.pop("_id", None)
    return prof


# ---------- LOGS ----------

def create_daily_log(log: dict):
    return logs.insert_one(log)

def get_logs_by_user(user_id: str):
    raw_logs = list(logs.find({"user_id": user_id}))
    clean_logs = []
    for log in raw_logs:
        log["id"] = str(log["_id"])
        log.pop("_id", None)
        clean_logs.append(log)
    return clean_logs


# ---------- PLANS ----------

def save_plan(plan: dict):
    return plans.insert_one(plan)

def get_plans_by_user(user_id: str):
    raw_plans = list(plans.find({"user_id": user_id}))
    clean_plans = []
    for plan in raw_plans:
        plan["id"] = str(plan["_id"])
        plan.pop("_id", None)
        clean_plans.append(plan)
    return clean_plans


# ---------- DECISIONS (AI Reasoning) ----------

def save_decision(decision: dict):
    return decisions.insert_one(decision)

def get_decisions_by_user(user_id: str):
    raw_decisions = list(decisions.find({"user_id": user_id}))
    clean_decisions = []
    for dec in raw_decisions:
        dec["id"] = str(dec["_id"])
        dec.pop("_id", None)
        clean_decisions.append(dec)
    return clean_decisions


