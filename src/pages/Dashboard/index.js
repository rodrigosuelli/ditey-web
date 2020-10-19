import React, { useState, useEffect, useCallback, useMemo } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import debounce from 'lodash.debounce';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import Toolbar from '../../components/Toolbar';

import './styles.css';

export default function Dashboard() {
  const [texts, setTexts] = useState([]);
  const [activeTextId, setActiveTextId] = useState(0);
  // const [saving, setSaving] = useState([]);

  const activeText = texts.find((text) => text.id === activeTextId) || '';

  const { refreshToken } = useAuth();

  useEffect(() => {
    async function loadTexts() {
      try {
        const response = await api.get('/texts');

        setTexts(response.data);
        setActiveTextId(response.data[0].id);
      } catch (error) {
        alert(error);
      }
    }

    loadTexts();
  }, []);

  const saveText = useCallback(
    async (data) => {
      console.log('saving');
      try {
        await api.put(`/texts/${activeTextId}`, data);
      } catch (error) {
        if (error.response.data.msg === 'invalid token') {
          await refreshToken();
          await saveText(data);
        } else {
          alert(error);
        }
      }
    },
    [activeTextId, refreshToken]
  );

  const debouncedSave = useMemo(() => debounce((data) => saveText(data), 800), [
    saveText,
  ]);

  async function handleTextTitleChange(e) {
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
