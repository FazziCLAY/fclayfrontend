import React, { useEffect, useRef, useState } from 'react';
import { useNotesContext } from './NotesProvider';
import { useNotesTabsContext } from './NotesTabsProvider';
import { flog } from '../../Logger';
import { truncateString } from '../../FazziCLAY';

const TextInput = () => {
  const {
    notes, setNotes, updatingFromServer, locked,
  } = useNotesContext();

  const {
    activeTab,
  } = useNotesTabsContext();

  const [textN, setTextN] = useState('F');
  const prevTextRef = useRef(textN); // Хранит предыдущее состояние
  const textareaRef = useRef(null);

  const setNoteText = (ttt) => {
    setNotes({ ...notes, text: ttt, latestEdit: Date.now() });
  };

  useEffect(() => {
    textareaRef.current.scrollTop = 0; // Прокручиваем на верх
    flog('scroll to top');
  }, [activeTab]);

  useEffect(() => {
    if (!notes) {
      console.warn('!notes');
      return;
    }
    const data = notes.text;

    // Сравниваем с предыдущим значением текста
    if (data !== prevTextRef.current) {
      setTextN(data);
      prevTextRef.current = data; // Обновляем предыдущее состояние
    }
  }, [notes]); // Запускается один раз

  useEffect(() => {
    flog(`textN = ${truncateString(textN, 10)}`);
  }, [textN]);

  const handleChange = (event) => {
    flog(`handleChange = ${truncateString(event.target.value, 10)}`);
    if (updatingFromServer || locked) return;
    setTextN(event.target.value);
    setNoteText(event.target.value);
  };

  // Восстановление каретки после изменения текста
  useEffect(() => {
    if (!textN) {
      console.warn('!textN');
      return;
    }
    const { current } = textareaRef;
    if (current) {
      const caretPos = Math.min(textN.length, current.selectionStart);
      requestAnimationFrame(() => {
        current.setSelectionRange(caretPos, caretPos);
      });
    }
  }, [textN]); // Срабатывает при изменении текста

  return (
    <>
      <textarea
        style={{ color: `${locked ? '#898989' : ''}` }}
        ref={textareaRef}
        value={textN}
        onChange={handleChange}
        rows="20"
      />
    </>
  );
};

// Notes Editor
const NotesEditor = () => {
  const {
    notes,
    debugStatus,
    activeTab,
    updatingFromServer,
    locked,
  } = useNotesContext();
  const [trigger, setTrigger] = useState(0);

  const rerender = () => {
    setTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    rerender();
  }, [debugStatus]);

  const isLoading = (!notes && !!activeTab) || updatingFromServer;
  const isNoTabs = !activeTab;

  return (
    <div>
      <div hidden>{trigger}</div>
      <h2 hidden={!locked}>LOCKED</h2>
      <p hidden>{JSON.stringify(debugStatus)}</p>
      <h1 hidden={!isNoTabs}>No tabs found. Create tab by press + button</h1>
      <span hidden={notes?.error === false}>
        <h1>{notes?.error?.text}</h1>
        <span style={{ whiteSpace: 'pre' }}>{JSON.stringify(notes?.error, null, 4)}</span>
      </span>
      <progress hidden={!isLoading} />
      <div hidden={notes?.error || !notes}>
        <TextInput />
      </div>
    </div>
  );
};

export default NotesEditor;