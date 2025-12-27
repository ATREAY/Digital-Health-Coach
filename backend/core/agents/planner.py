from datetime import datetime
from db.crud import get_logs_by_user
from core.agents.monitoring import get_monitoring_summary

def get_remaining_week_days():
    """
    Returns a list like:
    ['Thu','Fri','Sat','Sun'] for remaining days
    """
    today = datetime.utcnow().weekday()  # Monday=0 ... Sunday=6
    all_days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    return all_days[today+1:]

def dynamic_schedule_rules(summary, logs):
    mood = summary["mood_trend"]
    comp = summary["completion_rate"]
    
    activities = []
    # base suggestions
    base_easy = "Walk 30 min"
    base_mod = "Strength Training 20 min"
    base_hard = "HIIT 20 min"
    recovery = "Rest"

    # determine intensity style
    if comp < 50 or mood < 3:
        style = "easy"
    elif comp < 80 or mood < 4:
        style = "medium"
    else:
        style = "hard"

    if style == "easy":
        return base_easy, recovery
    if style == "medium":
        return base_mod, base_easy
    return base_hard, base_mod

def create_dynamic_plan(user_id):
    # 1) fetch summary & logs
    summary = get_monitoring_summary(user_id)
    logs = get_logs_by_user(user_id)

    remaining_days = get_remaining_week_days()

    # 2) decide activity types for style
    high_intensity, fallback = dynamic_schedule_rules(summary, logs)

    plan = []
    for idx, day in enumerate(remaining_days):
        # simple alternating logic
        if idx % 2 == 0:
            activity = high_intensity
        else:
            activity = fallback
        plan.append({"day": day, "activity": activity})

    return plan

