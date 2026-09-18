export default function ChatList({ chaters, activeId, onSelect }) {
  if (!chaters) return null;

  return (
    <>
      {Object.values(chaters).map((chater) => (
        <div
          key={chater.id}
          className={`chat-item ${chater.id === activeId ? 'active' : ''}`}
          onClick={() => onSelect(chater)}
        >
          <img src={chater.imageUrl} alt={chater.name} />
          <div className="content">
            <h3>{chater.name}</h3>
            <p className="message">last message</p>
          </div>
        </div>
      ))}
    </>
  );
}
