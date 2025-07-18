function ParagraphBlock({ text, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 4,
        marginBottom: 10,
        cursor: 'pointer',
        background: '#fafafa',
        whiteSpace: 'pre-wrap',
      }}
    >
      {text}
    </div>
  );
}

export default ParagraphBlock;
