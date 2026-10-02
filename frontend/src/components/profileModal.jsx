import { useEffect } from 'react';

import defaultAvatar from '../public/image/avatars/standart_user.png';
import { handleAvatarError } from '../avatar';

export default function ProfileModal({ user, onClose }) {
  // Закрытие по Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!user) return null;

  const avatarSrc = user.imageUrl || defaultAvatar;

  return (
    // Клик по фону закрывает окно
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Профиль" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Закрыть профиль" onClick={onClose} autoFocus>&times;</button>
        <img
          className="modal-avatar"
          src={avatarSrc}
          alt={user.name}
          onError={handleAvatarError}
        />
        <h2>{user.name}</h2>
        <p className="modal-status">Демонстрационный профиль</p>
      </div>
    </div>
  );
}
