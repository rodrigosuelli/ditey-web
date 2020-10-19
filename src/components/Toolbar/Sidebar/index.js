import React, { useState } from 'react';
import { MdArrowDropDown, MdAdd, MdDelete, MdExitToApp } from 'react-icons/md';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';

import './styles.css';

function Profile(props) {
  const { profileOptions, onProfileOptionsChange } = props;

  const storageUserInfo = localStorage.getItem('userInfo');
  const userInfo = storageUserInfo && JSON.parse(storageUserInfo);
  const { name, email } = userInfo || '';
  const nameInitial = name ? name[0].toUpperCase() : '';

  function handleToggleProfileOptions() {
    onProfileOptionsChange(!profileOptions);
  }

  return (
    <div onClick={handleToggleProfileOptions} className="profile">
      <div className="profile-wrapper">
        <div className="profile-img">{nameInitial}</div>
        <div className="profile-info">
          <h4>{name}</h4>
          <p>{email}</p>
        </div>
      </div>
      <MdArrowDropDown
        color="#fff"
        className={profileOptions && 'up'}
        size={24}
      />
    </div>
  );
}

function ProfileButtons() {
  const { logOut } = useAuth();

  return (
    <button onClick={logOut} className="logout-btn" type="button">
      <MdExitToApp size={24} />
      Log out
    </button>
  );
}

function TextsList(props) {
  const {
    texts,
    handleDeleteText,
    onActiveTextChange,
    onMenuChange,
    handleAddText,
  } = props;

  return (
    <>
      <div className="texts-list">
        <h2>Meus Textos</h2>
        {texts.map((text) => (
          <div key={text.id} className="text-item">
            <MdDelete onClick={() => handleDeleteText(text.id)} size={17} />
            <div
              onClick={() => {
                onActiveTextChange(text.id);
                onMenuChange(false);
              }}
              className="text-container"
            >
              <h4>{!text.title ? 'Untitled' : text.title}</h4>
              <p>
                {!text.content
                  ? 'Enter your text here...'
                  : text.content.substring(0, 114)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-add-container">
        <button
          onClick={handleAddText}
          type="button"
          className={texts.length === 5 ? 'primary off' : 'primary'}
        >
          <MdAdd color="#fff" size={22} /> novo texto
        </button>
      </div>
    </>
  );
}

export default function Sidebar(props) {
  const {
    menu,
    onMenuChange,
    texts,
    onTextsChange,
    activeText,
    onActiveTextChange,
  } = props;

  const [profileOptions, setProfileOptions] = useState(false);

  const { refreshToken } = useAuth();

  async function handleAddText() {
    if (texts.length === 5) {
      return;
    }

    try {
      const response = await api.post('/texts');

      const { id, title, content } = response.data;

      onTextsChange([...texts, { id, title, content }]);

      onActiveTextChange(id);

      onMenuChange(false);
    } catch (error) {
      if (error.response.data.msg === 'invalid token') {
        const response = await refreshToken();

        if (response) {
          handleAddText();
        }
      }
    }
  }

  async function handleDeleteText(id) {
    if (activeText.id === id) {
      return;
    }

    try {
      await api.delete(`/texts/${id}`);

      onTextsChange(texts.filter((text) => text.id !== id));
    } catch (error) {
      if (error.response.data.msg === 'invalid token') {
        const response = await refreshToken();

        if (response) {
          handleDeleteText(id);
        }
      }
    }
  }

  let className = 'toolbar';
  if (menu === true) className += ' visible';

  return (
    <aside className={className}>
      <Profile
        profileOptions={profileOptions}
        onProfileOptionsChange={setProfileOptions}
      />
      <div className="texts-panel">
        {profileOptions ? (
          <ProfileButtons />
        ) : (
          <TextsList
            texts={texts}
            handleDeleteText={handleDeleteText}
            onActiveTextChange={onActiveTextChange}
            onMenuChange={onMenuChange}
            handleAddText={handleAddText}
          />
        )}
      </div>
    </aside>
  );
}
