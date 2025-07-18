function ParagraphBlock({ text, onClick }) {
  return (
    <div className="paragraph-block" onClick={onClick}>
      {text}
    </div>
  );
}

export default ParagraphBlock;
