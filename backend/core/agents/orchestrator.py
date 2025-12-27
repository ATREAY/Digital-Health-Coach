from core.agents.monitoring import get_monitoring_summary
from core.agents.reasoning import decide_changes
from core.agents.planner import create_dynamic_plan
from core.agents.motivation import generate_motivation
from db.crud import save_plan, save_decision, get_profile_by_user
import re
from typing import Any

def clean_ai_text(text: str) -> str:
    """
    Clean up AI text (remove markdown artifacts)
    """
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)
    text = re.sub(r"\d+\.\s+", "", text)
    text = re.sub(r"\n{2,}", "\n\n", text)
    return text.strip()

def run_analyze_adapt(user_id: str) -> dict[str, Any]:
    """
    Orchestrate monitoring → reasoning → dynamic planning → save → return.
    """
    # 1) Monitoring summary
    summary = get_monitoring_summary(user_id)

    # 2) Reasoning (LLM / internal logic)
    reasoning_response = decide_changes(summary)
    raw_reasoning = reasoning_response.get("reasoning_text", "")
    cleaned_reasoning = clean_ai_text(raw_reasoning)

    # 3) Get profile (with training preference)
    profile = get_profile_by_user(user_id) or {}
    training_pref = profile.get("training_preference", "mixed")

    # 4) Create dynamic plan
    new_plan = create_dynamic_plan(user_id, profile)

    # 5) Motivation / messaging
    motivation_text = generate_motivation(reasoning_response)

    # 6) Save plan & decision
    save_plan({
        "user_id": user_id,
        "plan": new_plan,
        "focus": training_pref,  # store preference in meta
    })

    save_decision({
        "user_id": user_id,
        "reasoning": cleaned_reasoning,
        "meta": summary,
    })

    # Return final structured result
    return {
        "user": {
            "id": user_id,
            "name": profile.get("name")
        },
        "summary": summary,
        "reasoning": cleaned_reasoning,
        "plan": new_plan,
        "motivation": motivation_text
    }
