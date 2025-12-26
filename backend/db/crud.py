from db.collections import users, logs, plans, decisions
from datetime import datetime

def upsert_user_profile(profile):
    users.update_one({"name": profile["name"]}, {"$set": profile}, upsert=True)

def create_daily_log(entry):
    entry["created_at"] = datetime.utcnow()
    logs.insert_one(entry)

def get_all_logs():
    return list(logs.find({}, {"_id": 0}))

def save_plan(plan):
    plan["created_at"] = datetime.utcnow()
    plans.insert_one(plan)

def get_all_plans():
    return list(plans.find({}, {"_id": 0}))

def save_decision(decision):
    decision["created_at"] = datetime.utcnow()
    decisions.insert_one(decision)

def get_all_decisions():
    return list(decisions.find({}, {"_id": 0}))

def find_user(email):
    return users.find_one({"email": email})

def create_user(user):
    users.insert_one(user)

def get_logs_by_user(user_id):
    return list(logs.find({"user_id": user_id}, {"_id": 0}))

def get_plans_by_user(user_id):
    return list(plans.find({"user_id": user_id}, {"_id": 0}))

def get_decisions_by_user(user_id):
    return list(decisions.find({"user_id": user_id}, {"_id": 0}))

def get_recent_logs_by_user(user_id, limit=30):
    return list(
        logs.find({"user_id": user_id})
            .sort("date", -1)
            .limit(limit)
    )
