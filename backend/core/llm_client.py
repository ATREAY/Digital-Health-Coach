import os
import requests
from config import LLM_API_KEY, MODEL_NAME

BASE_URL = "https://api.mistral.ai/v1"

def generate_text(prompt: str) -> str:
    try:
        url = f"{BASE_URL}/chat/completions"

        headers = {
            "Authorization": f"Bearer {LLM_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": "You are a helpful fitness coach AI."},
                {"role": "user",   "content": prompt}
            ],
            "temperature": 0.7
        }

        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()

        # Grab content from first choice
        if "choices" in data and len(data["choices"]) > 0:
            return data["choices"][0]["message"]["content"].strip()

        return "[Mistral: No output returned]"

    except Exception as e:
        return f"[Mistral LLM error: {str(e)}]"

