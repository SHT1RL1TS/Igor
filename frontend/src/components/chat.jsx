import { handleAvatarError } from '../avatar';

export default function ChatList({ chaters, activeId, onSelect }) {
  if (!chaters) return null;

  return (
    <>
      {Object.values(chaters).map((chater) => (
        <button
          type="button"
          key={chater.id}
          className={`chat-item ${chater.id === activeId ? 'active' : ''}`}
          onClick={() => onSelect(chater)}
          aria-pressed={chater.id === activeId}
          aria-label={chater.name}
          title={chater.name}
        >
          <img src={chater.imageUrl} alt="" onError={handleAvatarError} />
          <div className="content">
            <h3>{chater.name}</h3>
            <p className="message">Открыть переписку</p>
          </div>
        </button>
      ))}
    </>
  );
}
