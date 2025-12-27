from core.agents.monitoring import get_monitoring_summary
from core.agents.reasoning import decide_changes
from core.agents.planner import create_dynamic_plan
from core.agents.motivation import generate_motivation
from db.crud import save_plan, save_decision, get_profile_by_user
import re
from typing import Any

def clean_ai_text(text: str) -> str:
    """
    Clean up markdown and unnecessary formatting in text.
    This removes bold markers, numbered lines, extra newlines etc.
    """
    # Remove markdown bold syntax
    text = re.sub(r"\*\*(.*?)\*\*", r"\1", text)

    # Remove simple numbered list digits like "1. " "2. "
    text = re.sub(r"\d+\.\s+", "", text)

    # Replace multiple blank lines with a single blank line
    text = re.sub(r"\n{2,}", "\n\n", text)

    return text.strip()

def run_analyze_adapt(user_id: str) -> dict[str, Any]:
    """
    Run the analysis pipeline:
       - Get summary
       - Get reasoning/chat from LLM
       - Create a weekly (dynamic) plan
       - Save plan
       - Save decision (AI reasoning)
       - Return a cleaned structured response
    """
    # 1) Monitoring summary
    summary = get_monitoring_summary(user_id)

    # 2) Reasoning
    reasoning_response = decide_changes(summary)
    raw_reasoning_text = reasoning_response.get("reasoning_text", "")

    # Clean up text for user UI
    cleaned_reasoning = clean_ai_text(raw_reasoning_text)

    # 3) Create a personal dynamic plan
    new_plan = create_dynamic_plan(user_id)

    # 4) Motivation text
    motivation_text = generate_motivation(reasoning_response)

    # Save plan in DB (with user association)
    save_plan({
        "user_id": user_id,
        "plan": new_plan,
        "focus": reasoning_response.get("focus"),
    })

    # Save decision (original and cleaned)
    save_decision({
        "user_id": user_id,
        "reasoning": cleaned_reasoning,
        "meta": summary,
    })

    # Fetch profile for name display
    profile = get_profile_by_user(user_id)
    display_name = profile.get("name") if profile else None

    # Return structured response
    return {
        "user": {
            "id": user_id,
            "name": display_name
        },
        "summary": summary,
        "reasoning": cleaned_reasoning,
        "plan": new_plan,
        "motivation": motivation_text
    }
