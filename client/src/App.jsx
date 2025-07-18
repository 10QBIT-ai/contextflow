import { useState } from 'react';
import ChatArea from './components/ChatArea';
import Sidebar from './components/Sidebar';
import SidebarRight from './components/SidebarRight';
import { MODEL_CATEGORIES } from './utils/modeLMap';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('mistral');
  const [history, setHistory] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [context, setContext] = useState(null);

  const handleSend = async (customPrompt = null, fromContext = null) => {
    const input = customPrompt || prompt;
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, model }),
      });

      const data = await res.json();
      const answer = data.response || '⚠️ No response';

      if (fromContext) {
        const updated = [...history];
        const thread = updated[fromContext.parentIndex];
        const newSub = {
          question: input,
          response: answer,
          contextText: fromContext.text,
        };
        thread.subs = thread.subs ? [...thread.subs, newSub] : [newSub];
        setHistory(updated);
        setContext({ ...fromContext, response: answer });
      } else {
        const newItem = {
          prompt: input,
          response: answer,
          model,
          subs: [],
        };
        const updated = [...history, newItem];
        setHistory(updated);
        setActiveIndex(updated.length - 1);
        setResponse(answer);
        setContext(null);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleParagraphClick = (text) => {
    if (activeIndex === null) return;
    setContext({ text, parentIndex: activeIndex });
  };

  const handleHistoryClick = (item, index) => {
    setActiveIndex(index);
    setPrompt(item.prompt);
    setModel(item.model);
    setResponse(item.response);
    setContext(null);
  };

  const handleSubClick = (sub, parentIndex) => {
    setContext({
      text: sub.contextText,
      response: sub.response,
      parentIndex,
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar
        history={history}
        onHistoryClick={handleHistoryClick}
        onSubClick={handleSubClick}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 10, background: '#f2f2f2' }}>
          <label>Model:&nbsp;</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {Object.entries(MODEL_CATEGORIES).map(([key, val]) => (
              <option key={key} value={key}>
                {key} — {val.label}
              </option>
            ))}
          </select>
        </div>
        <ChatArea
          prompt={prompt}
          setPrompt={setPrompt}
          onSend={handleSend}
          response={response}
          loading={loading}
          model={model}
          setModel={setModel}
          onParagraphClick={handleParagraphClick}
        />
      </div>
      <SidebarRight context={context} onFollowUp={handleSend} />
    </div>
  );
}

export default App;
