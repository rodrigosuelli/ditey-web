import React, { useState } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

import Toolbar from '../../components/Toolbar';

import './styles.css';

export default function Dashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      <Toolbar />
      <div className="text">
        <TextareaAutosize
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title"
          placeholder="Untitled"
          name="title"
          id="title"
        />
        <TextareaAutosize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content"
          placeholder="Enter your text here"
          name="content"
          id="content"
        />
      </div>
    </>
  );
}
