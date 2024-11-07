import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { useNotesContext } from './NotesProvider';
import { useNotesTabsContext } from './NotesTabsProvider';
import { flog } from '../../Logger';
// eslint-disable-next-line import/named
import { hashCode, truncateString } from '../../FazziCLAY';

const TextInput = () => {
  const {
    notes, setNotes, updatingFromServer, locked,
  } = useNotesContext();

  const {
    activeTab,
  } = useNotesTabsContext();

  const [textN, setTextN] = useState('F');
  const textareaRef = useRef(null);
  const keyStart = useRef(0);

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
    if (data !== textN) {
      console.log(`keyStart=${keyStart.current} notes.latestEdit=${notes.latestEdit}`);
      if (Math.abs(keyStart.current - notes.latestEdit) > 555) {
        console.warn(`OVERWRITING TEXTAREA data=${hashCode(data)}; textN=${hashCode(textN)} keyStart::diff=${-keyStart.current + notes.latestEdit}`);
        setTextN(data);
      } else {
        console.warn(`Cancel overwiting because keyStart > latestEdit; diff=${keyStart.current - notes.latestEdit}`);
      }
    }
  }, [notes]); // Запускается один раз

  useEffect(() => {
    flog(`textN = ${truncateString(textN, 10)}`);
  }, [textN]);

  const handleChange = (event) => {
    flog(`handleChange = ${truncateString(event.target.value, 10)}`);
    if (updatingFromServer || locked) return;
    keyStart.current = Date.now();
    console.warn(`keyStart now is ${keyStart.current}`);
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
      <div style={{
        width: '100%',
        margin: '20px',
      }}
      >
        <textarea
          style={{
            color: `${locked ? '#898989' : ''}`,
            width: '95%',
            lineHeight: 1.1,
          }}
          ref={textareaRef}
          value={textN}
          onChange={handleChange}
          rows="20"
        />
      </div>

      <div style={{
        width: '90%',
        height: 100,
        resize: 'both',
        overflow: 'auto',
        padding: 14,
        background: 'linear-gradient(29deg, rgba(20,0,36,1) 0%, rgba(70,9,121,1) 35%, rgba(0,212,255,1) 100%)',
      }}
      >
        <Markdown style={{
          lineHeight: 1,
        }}
        >{textN}
        </Markdown>
      </div>

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
