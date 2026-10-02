import defaultAvatar from '../public/image/avatars/standart_user.png';
import { handleAvatarError } from '../avatar';

export default function Header({ user, onAvatarClick, search, onSearch }) {

  if (user) {
    const avatarSrc = user.imageUrl || defaultAvatar;

    return (
      <header>
        <div className="left">
          <div className="search-bar">
            <input id="search" type="search" aria-label="Поиск чатов" placeholder="Поиск чатов…" value={search} onChange={(event) => onSearch(event.target.value)} />
          </div>
          <button type="button" className="avatar-border" onClick={onAvatarClick} aria-label="Открыть профиль" style={{ cursor: 'pointer' }}>
            <img
              className="avatar"
              src={avatarSrc}
              alt={user.name || 'User Avatar'}
              onError={handleAvatarError}
            />
          </button>
        </div>
        <div className="right">
        </div>
      </header>
    );
  }

}
