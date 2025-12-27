from typing import List, Dict, Any, Optional

WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

def strength_plan_template() -> List[Dict[str, str]]:
    return [
        {"day": d, "activity": "Strength Training – Full Body" if i < 5 else "Active Recovery"}
        for i, d in enumerate(WEEK_DAYS)
    ]

def fat_loss_plan_template() -> List[Dict[str, str]]:
    return [
        {"day": d,
         "activity": "HIIT Session" if i % 2 == 0 else "Steady Cardio (Walk / Run)"}
        for i, d in enumerate(WEEK_DAYS)
    ]

def endurance_plan_template() -> List[Dict[str, str]]:
    return [
        {"day": d,
         "activity": "Long Endurance Run or Cycle" if i < 5 else "Light Jog or Stretching"}
        for i, d in enumerate(WEEK_DAYS)
    ]

def mixed_plan_template() -> List[Dict[str, str]]:
    return [
        {"day": d,
         "activity": "Strength + Cardio Combo" if i < 5 else "Active Recovery & Stretching"}
        for i, d in enumerate(WEEK_DAYS)
    ]

def create_dynamic_plan(
    user_id: str,
    profile: Optional[dict[str, Any]] = None
) -> List[Dict[str, str]]:
    """
    Generate a weekly plan based on the user's training preference.

    profile may be None — in that case, default to "mixed".
    """

    # Default preference if profile missing or no training_preference provided:
    preference: str = "mixed"
    if profile and isinstance(profile, dict):
        preference = profile.get("training_preference", "mixed") or "mixed"

    # Choose the correct template based on preference
    if preference == "strength":
        weekly_plan = strength_plan_template()
    elif preference == "fat_loss":
        weekly_plan = fat_loss_plan_template()
    elif preference == "endurance":
        weekly_plan = endurance_plan_template()
    else:
        weekly_plan = mixed_plan_template()

    return weekly_plan
