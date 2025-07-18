import React, { useState } from 'react';

function SidebarRight({ context, onFollowUp }) {
  const [followUpPrompt, setFollowUpPrompt] = useState('');

  const handleSend = () => {
    if (!followUpPrompt.trim()) return;
    if (context?.parentIndex != null) {
      onFollowUp(followUpPrompt, { ...context });
      setFollowUpPrompt('');
    }
  };

  if (!context) {
    return (
      <div className="sidebar-right">
        <p>Select a paragraph to ask a follow-up question.</p>
      </div>
    );
  }

  return (
    <div className="sidebar-right">
      <h3>📌 Context</h3>

      <div className="context-block">
        <div className="context-label">Selected Text:</div>
        <div className="context-text">"{context.text}"</div>
      </div>

      <div className="followup-section">
        <textarea
          value={followUpPrompt}
          onChange={(e) => setFollowUpPrompt(e.target.value)}
          placeholder="Ask a follow-up question..."
        />
        <button onClick={handleSend}>Ask</button>
      </div>

      {context.response && (
        <div className="context-response">
          <div className="context-label">Response:</div>
          <div className="context-answer">{context.response}</div>
        </div>
      )}
    </div>
  );
}

export default SidebarRight;
