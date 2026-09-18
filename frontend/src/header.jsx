import React from 'react';

const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=2b5278&color=fff&name=';

export default function Header({ user }) {

  function handleEnterClick() {

  }
  function test() {
    console.log('click');
  }

  if (user) {
    const avatarSrc = user.imageUrl || `${DEFAULT_AVATAR}${encodeURIComponent(user.name || 'U')}`;

    return (
      <header>
        <div className="left">
          <div className="search-bar">
            <input id="search" type="text" placeholder="Search..." />
          </div>
          <div className="avatar-border">
            <img
              className="avatar"
              src={avatarSrc}
              alt={user.name || 'User Avatar'}
              onError={(e) => {
                e.currentTarget.src = `${DEFAULT_AVATAR}${encodeURIComponent(user.name || 'U')}`;
              }}
            />
          </div>
        </div>
        <div className="right">
        </div>
      </header>
    );
  }

}
