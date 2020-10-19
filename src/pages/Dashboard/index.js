import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import debounce from 'lodash.debounce';
import { ImSpinner8 } from 'react-icons/im';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import Toolbar from '../../components/Toolbar';

import './styles.css';

export default function Dashboard() {
  const [texts, setTexts] = useState([]);
  const [activeTextId, setActiveTextId] = useState(0);
  const [saving, setSaving] = useState(false);

  const activeText = texts.find((text) => text.id === activeTextId) || '';

  const { refreshToken } = useAuth();

  useEffect(() => {
    async function loadTexts() {
      try {
        const response = await api.get('/texts');

        setTexts(response.data);
        setActiveTextId(response.data[0].id);
      } catch (error) {
        if (error.response.data.msg === 'invalid token') {
          const response = await refreshToken();

          if (response) {
            loadTexts();
          }
        }
      }
    }

    loadTexts();
  }, [refreshToken]);

  const saveText = useCallback(
    async (data) => {
      try {
        await api.put(`/texts/${activeTextId}`, data);
      } catch (error) {
        if (error.response.data.msg === 'invalid token') {
          const response = await refreshToken();

          if (response) {
            saveText(data);
          }

          return;
        }
      }

      setSaving(false);
    },
    [activeTextId, refreshToken]
  );

  const debouncedSave = useMemo(() => debounce((data) => saveText(data), 800), [
    saveText,
  ]);

  async function handleTextTitleChange(e) {
    if (!saving) {
      setSaving(true);
    }

    e.persist();

    const newTextsArray = texts.map((text) => {
      if (text.id === activeTextId) {
        return { ...text, title: e.target.value };
      }
      return text;
    });

    setTexts(newTextsArray);

    const data = {
      title: e.target.value,
      content: activeText.content,
    };

    debouncedSave(data);
  }

  async function handleTextContentChange(e) {
    if (!saving) {
      setSaving(true);
    }

    e.persist();

    const newTextsArray = texts.map((text) => {
      if (text.id === activeTextId) {
        return { ...text, content: e.target.value };
      }
      return text;
    });

    setTexts(newTextsArray);

    const data = {
      title: activeText.title,
      content: e.target.value,
    };

    debouncedSave(data);
  }

  return (
    <>
      <Toolbar
        texts={texts}
        activeText={activeText}
        onActiveTextChange={setActiveTextId}
        onTextsChange={setTexts}
      />
      <div className="text">
        {saving && (
          <div className="saving">
            Salvando... <ImSpinner8 size={16} />
          </div>
        )}

        <TextareaAutosize
          onChange={(e) => handleTextTitleChange(e)}
          value={activeText.title}
          className="title"
          placeholder="Untitled"
          name="title"
          id="title"
        />
        <TextareaAutosize
          value={activeText.content}
          onChange={(e) => handleTextContentChange(e)}
          className="content"
          placeholder="Enter your text here"
          name="content"
          id="content"
        />
      </div>
    </>
  );
}
