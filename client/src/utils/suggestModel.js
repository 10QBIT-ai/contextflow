import modelMap from './utils/modelMap';

function suggestModel(prompt) {
  const lowerPrompt = prompt.toLowerCase();

  for (const category in modelMap) {
    const { keywords, modelId } = modelMap[category];
    if (keywords.some(keyword => lowerPrompt.includes(keyword))) {
      return { modelId, reason: `Matched ${category} keyword` };
    }
  }

  // Fallback to default model
  return { modelId: 'llama3:latest', reason: 'Default fallback model' };
}

export default suggestModel;
