from db.connection import db

users = db["user_profiles"]
logs = db["daily_logs"]
plans = db["weekly_plans"]
decisions = db["decisions"]
