import { useEffect } from 'react';

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=2b5278&color=fff&name=';

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

  const avatarSrc = user.imageUrl || `${DEFAULT_AVATAR}${encodeURIComponent(user.name || 'U')}`;

  return (
    // Клик по фону закрывает окно
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img
          className="modal-avatar"
          src={avatarSrc}
          alt={user.name}
          onError={(e) => {
            e.currentTarget.src = `${DEFAULT_AVATAR}${encodeURIComponent(user.name || 'U')}`;
          }}
        />
        <h2>{user.name}</h2>
        <p className="modal-status">online</p>
        <div className="modal-actions">
          <button className="btn">Изменить аватар</button>
          <button className="btn danger">Выйти</button>
        </div>
      </div>
    </div>
  );
}
