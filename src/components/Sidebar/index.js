import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import './styles.css';

export default function Sidebar(props) {
  const {
    texts,
    activeText,
    onChangeActiveText,
    onTextDelete,
    onTextAdd,
  } = props;

  function loadedTexts(index) {
    let divClass = 'text-container';
    let trashClass = 'trash';

    if (index === activeText) {
      divClass += ' active';
      trashClass += ' disabled';
    }

    return (
      <div
        onClick={() => onChangeActiveText(index)}
        key={index}
        className={divClass}
      >
        <div className="text">
          {texts[index] === '' ? (
            <p className="text-preview">Insira seu texto aqui...</p>
          ) : (
            <p className="text-preview">{texts[index]}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onTextDelete(index)}
          className={trashClass}
        >
          <FiTrash2 className="trash-icon" size={20} />
        </button>
      </div>
    );
  }

  return (
    <aside>
      <div className="sidebar-container">
        <h3 className="title">Textos Salvos:</h3>
        <button
          onClick={onTextAdd}
          type="button"
          title="Adicionar Texto"
          className="btn-add"
        >
          +
        </button>

        {texts.map((item, index) => loadedTexts(index))}
      </div>
    </aside>
  );
}
