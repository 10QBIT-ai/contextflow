import React from 'react';

function Sidebar({ history, onHistoryClick, onSubClick }) {
  return (
    <div className="sidebar">
      <h3>🕘 History</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <div
              className="history-main"
              onClick={() => onHistoryClick(item, index)}
            >
              <div className="history-model">{item.model}</div>
              <div className="history-prompt">{item.prompt}</div>
            </div>

            {item.subs?.map((sub, subIdx) => (
              <div
                key={subIdx}
                className="history-sub"
                onClick={() => onSubClick(sub, index)}
              >
                ↳ {sub.question}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
