from core.agents.monitoring import get_monitoring_summary
from core.agents.reasoning import decide_changes
from core.agents.planner import create_dynamic_plan
from core.agents.motivation import generate_motivation
from db.crud import save_plan, save_decision
from typing import Any

def run_analyze_adapt(user_id: str):
    summary = get_monitoring_summary(user_id)
    reasoning = decide_changes(summary)

    # dynamic
    new_plan = create_dynamic_plan(user_id)

    motivation_text = generate_motivation(reasoning)

    # save plan with user_id
    save_plan({
        "plan": new_plan,
        "focus": reasoning.get("focus"),
        "user_id": user_id
    })

    save_decision({
        "reasoning": reasoning.get("reasoning_text"),
        "meta": summary,
        "user_id": user_id
    })

    return {
        "summary": summary,
        "reasoning": reasoning.get("reasoning_text"),
        "plan": new_plan,
        "motivation": motivation_text
    }
