export const MODEL_CATEGORIES = {
  "mistral": {
    label: "General Purpose (Fast)",
    keywords: ["how", "what", "explain", "generate"],
    available: true
  },
  "llama-guard": {
    label: "Ethical / Safety Focused",
    keywords: ["safe", "bias", "ethics", "moderate", "policy"],
    available: true
  },
  "medllama2": {
    label: "Medical / Clinical",
    keywords: ["symptom", "diagnosis", "treatment", "side effect"],
    available: true // set to false if not installed
  },
  "phi": {
    label: "Educational / Reasoning",
    keywords: ["teach", "learn", "reason", "step by step", "why"],
    available: true
  },
  "openai": {
    label: "OpenAI (fallback cloud)",
    keywords: ["creative", "openai", "gpt", "completion"],
    available: false // update if/when connected
  }
};
