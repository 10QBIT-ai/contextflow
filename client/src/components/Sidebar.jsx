function Sidebar({ history, onHistoryClick, onSubClick }) {
  return (
    <div style={{ width: 280, borderRight: '1px solid #ccc', padding: 10, overflowY: 'auto' }}>
      <h3>📜 History</h3>
      {history.map((item, idx) => (
        <div key={idx} style={{ marginBottom: 15 }}>
          <div
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => onHistoryClick(item, idx)}
          >
            {item.model} — {item.prompt.slice(0, 50)}
          </div>
          {item.subs && item.subs.map((sub, sIdx) => (
            <div
              key={sIdx}
              onClick={() => onSubClick(sub, idx)}
              style={{ paddingLeft: 15, fontSize: 14, cursor: 'pointer', color: '#555' }}
            >
              ↳ {sub.question.slice(0, 40)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
