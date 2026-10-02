import defaultAvatar from './public/image/avatars/standart_user.png';

export function handleAvatarError(event) {
  if (event.currentTarget.getAttribute('src') !== defaultAvatar) {
    event.currentTarget.src = defaultAvatar;
  }
}
