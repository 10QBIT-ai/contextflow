import { useState } from 'react';

function SidebarRight({ context, onFollowUp }) {
  const [followUp, setFollowUp] = useState('');

  if (!context) return <div style={{ width: 300, borderLeft: '1px solid #ccc' }} />;

  return (
    <div style={{ width: 300, borderLeft: '1px solid #ccc', padding: 10, overflowY: 'auto' }}>
      <h3>📌 Context</h3>
      <div style={{ marginBottom: 10, fontStyle: 'italic' }}>{context.text}</div>

      <div style={{ marginBottom: 10 }}>
        <strong>Answer:</strong>
        <div style={{ whiteSpace: 'pre-wrap' }}>{context.response}</div>
      </div>

      <textarea
        placeholder="Ask more about this..."
        value={followUp}
        onChange={(e) => setFollowUp(e.target.value)}
        rows={3}
        style={{ width: '100%', marginTop: 10 }}
      />
      <button
        onClick={() => {
          onFollowUp(followUp, context);
          setFollowUp('');
        }}
        style={{ marginTop: 10 }}
      >
        Ask
      </button>
    </div>
  );
}

export default SidebarRight;
