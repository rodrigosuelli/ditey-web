import React, { useState } from 'react';
import { MdArrowDropDown, MdAdd, MdDelete, MdExitToApp } from 'react-icons/md';
import { isMobile } from 'react-device-detect';
import { useAuth } from '../../../contexts/auth';
import api from '../../../services/api';

import './TextsMenu.css';

export default function TextsMenu(props) {
  const {
    menu,
    onMenuChange,
    texts,
    onTextsChange,
    activeTextId,
    onActiveTextIdChange,
    handleToggleMenu,
  } = props;

  const [profileOptions, setProfileOptions] = useState(false);

  const { refreshToken, logOut } = useAuth();

  const storageUserInfo = localStorage.getItem('userInfo');
  const userInfo = storageUserInfo && JSON.parse(storageUserInfo);
  const { name, email } = userInfo || '';
  const nameInitial = name ? name[0].toUpperCase() : '';

  async function handleAddText() {
    if (texts.length === 5) {
      return;
    }

    try {
      const response = await api.post('/texts');

      const { id, title, content } = response.data;

      onTextsChange([...texts, { id, title, content }]);

      onActiveTextIdChange(id);
      if (isMobile) {
        onMenuChange(false);
      }
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
    if (texts.length === 1) {
      return;
    }

    try {
      await api.delete(`/texts/${id}`);

      onTextsChange(texts.filter((text) => text.id !== id));

      if (activeTextId === id) {
        if (activeTextId === texts[0].id) {
          return onActiveTextIdChange(texts[1].id);
        }

        onActiveTextIdChange(texts[0].id);
      }
    } catch (error) {
      if (error.response.data.msg === 'invalid token') {
        const response = await refreshToken();

        if (response) {
          handleDeleteText(id);
        }
      }
    }
  }

  function handleToggleProfileOptions() {
    setProfileOptions(!profileOptions);
  }

  return (
    <>
      <div
        onClick={handleToggleMenu}
        className={menu ? 'sidebar-shadow visible' : 'sidebar-shadow'}
      />
      <aside className={menu ? 'toolbar visible' : 'toolbar'}>
        <div onClick={handleToggleProfileOptions} className="profile">
          <div className="profile-wrapper">
            <div className="profile-img">{nameInitial}</div>
            <div className="profile-options-wrapper">
              <div className="profile-info">
                <h4>{name}</h4>
                <p>{email}</p>
              </div>

              <MdArrowDropDown
                color="#fff"
                className={profileOptions && 'up'}
                size={24}
              />
            </div>
          </div>
        </div>
        <div className="texts-panel">
          {profileOptions ? (
            <button onClick={logOut} className="logout-btn" type="button">
              <MdExitToApp size={24} />
              Log out
            </button>
          ) : (
            <>
              <div className="texts-list">
                <h2>Meus Textos:</h2>
                {texts.map((text) => (
                  <div
                    key={text.id}
                    className={
                      text.id === activeTextId
                        ? 'text-item active'
                        : 'text-item'
                    }
                  >
                    {texts.length > 1 && (
                      <MdDelete
                        onClick={() => handleDeleteText(text.id)}
                        size={17}
                      />
                    )}
                    <div
                      onClick={() => {
                        onActiveTextIdChange(text.id);
                        if (isMobile) {
                          onMenuChange(false);
                        }
                      }}
                      className="text-container"
                    >
                      <h4>{text.title || 'Sem título'}</h4>
                      <p>
                        {text.content.substring(0, 114) ||
                          'Insira seu texto aqui...'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btn-add-container">
                <button
                  title={
                    texts.length === 5
                      ? 'Limite de 5 textos atingido'
                      : undefined
                  }
                  onClick={handleAddText}
                  type="button"
                  className={texts.length === 5 ? 'primary off' : 'primary'}
                >
                  <MdAdd color="#fff" size={22} /> novo texto
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
