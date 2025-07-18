import React from 'react';

function ChatArea({ prompt, setPrompt, onSend, response, loading, onParagraphClick }) {
  const paragraphs = response ? response.split('\n').filter(Boolean) : [];

  return (
    <div className="chat-area">
      <h2 className="chat-title">💬 Chat</h2>

      <textarea
        className="chat-input"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
      />

      <div className="chat-controls">
        <button className="send-btn" onClick={() => onSend()} disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
        {prompt && (
          <button className="clear-btn" onClick={() => setPrompt('')}>
            Clear
          </button>
        )}
      </div>

      {paragraphs.length > 0 && (
        <div className="chat-response">
          <strong>Response:</strong>
          {paragraphs.map((p, idx) => (
            <div
              key={idx}
              className="chat-paragraph"
              onClick={() => onParagraphClick(p)}
            >
              {p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatArea;
