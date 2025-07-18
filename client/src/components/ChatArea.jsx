function ChatArea({ prompt, setPrompt, onSend, response, loading, onParagraphClick }) {
  const paragraphs = response ? response.split('\n').filter(Boolean) : [];

  return (
    <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
      <h2>💬 AI Chat</h2>
      <textarea
        rows={4}
        style={{ width: '100%' }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={() => onSend()} disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
        {prompt && (
          <button
            onClick={() => setPrompt('')}
            style={{ marginLeft: 10, background: '#eee' }}
          >
            Clear
          </button>
        )}
      </div>

      {paragraphs.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <strong>Response:</strong>
          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              onClick={() => onParagraphClick(p)}
              style={{
                cursor: 'pointer',
                background: '#f9f9f9',
                padding: 8,
                borderRadius: 4,
                marginTop: 6,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatArea;
