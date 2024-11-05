import React, {
  createContext, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { ilog } from '../../Logger';
import { useNotesTabsContext } from './NotesTabsProvider';
// eslint-disable-next-line import/named
import { BASE_API, isSet } from '../../FazziCLAY';

// Создаем контекст
const NotesProviderContext = createContext();

// Провайдер контекста заметок
export const NotesProvider = ({ children }) => {
  // текущая заметка на клиенте
  const [notes, setNotes] = useState(null);

  // текущая заметка на сервере
  const [serverNotes, setServerNotes] = useState(null);

  const [debugStatus, setDebugStatus] = useState('empty-debug-status');
  const notesSyncingStartTime = useRef(-2);
  const [updatingFromServer, setUpdatingFromServer] = useState(false);
  const [locked, setLocked] = useState(false);

  function setNotesIsSyncing(s) {
    if (s) {
      notesSyncingStartTime.current = Date.now();
    } else {
      notesSyncingStartTime.current = -1;
    }
  }

  useEffect(() => {
    ilog(`notesSyncingStartTime=${notesSyncingStartTime.current}`);
  }, [notesSyncingStartTime]);

  function notesIsSyncing() {
    return notesSyncingStartTime.current > 0;
  }

  // табы
  const {
    activeTab, setAllowUsingTabs,
  } = useNotesTabsContext();

  function fromServer(json) {
    let latestEdit = 0;
    if (notes) {
      latestEdit = notes?.latestEdit;
    }
    const l = latestEdit - (notesSyncingStartTime.current);
    ilog(`[NotesProvider.js] fromServer (${JSON.stringify(json)}) notes.isSet()=${isSet(notes)}notes.latestEdit-notesSyncingStartTime=${l} notesSyncingStartTime=${notesSyncingStartTime.current}`);
    if (latestEdit < notesSyncingStartTime.current - 1500) {
      if (notes !== json) {
        setNotes(json);
      }
      setServerNotes(json);
    } else {
      console.warn('l > 1500; notes edited after fetch start. skip result of this fetch.');
    }
    setNotesIsSyncing(false);
  }

  // fetch notes from API
  const fetchNotes = (_full) => {
    const full = _full || !serverNotes;
    if (full) {
      setUpdatingFromServer(true);
    }
    ilog('[NotesProvider.js] fetchNotes');
    setNotesIsSyncing(true);
    fetch(`${BASE_API}/notes${full ? '' : '?specKeys=latestEdit,l'}`, {
      method: 'GET',
      headers: {
        Authorization: activeTab?.token,
      },
      mode: 'cors',
    })
      .then((response) => {
        if (response.status !== 200) {
          console.error(`[NotesProvider.js] HTTP ERROR WHILE PARSING NOTES: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        if (!full) {
          if (json.latestEdit !== serverNotes.latestEdit) {
            fetchNotes(true);
          } else {
            setNotesIsSyncing(false);
          }
          setLocked(json?.l && serverNotes === notes);
        }
        if (full && json) {
          fromServer(json);
        }
        if (full) {
          setUpdatingFromServer(false);
        }
      });
  };

  const syncNotes = () => {
    setNotesIsSyncing(true);
    fetch(`${BASE_API}/notes`, {
      method: 'PATCH',
      headers: {
        Authorization: activeTab?.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: notes.text,
      }),
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          fromServer(json);
        }
      });
  };

  const sendLocked = () => {
    fetch(`${BASE_API}/notes/lock`, {
      method: 'POST',
      headers: {
        Authorization: activeTab?.token,
      },
      mode: 'cors',
    })
      .then((r) => {});
  };

  // когда активная таба объект её поменялась
  useEffect(() => {
    ilog(`[NotesProvider.js] activeTab is ${JSON.stringify(activeTab)}`);
    setNotes(null);
    setServerNotes(null);

    if (!activeTab) return;
    fetchNotes();
  }, [activeTab]);

  // когда notes поменялась
  useEffect(() => {
    ilog('[NotesProvider.js] notes = updated');

    setDebugStatus({
      Equals: serverNotes === notes,
      Syncing: notesIsSyncing(),
      error: notes?.error,
    });
    setAllowUsingTabs(serverNotes === notes);
  }, [notes, serverNotes, notesSyncingStartTime]);

  // Effect for change toRet
  useEffect(() => {
    ilog('useEffect (tick in notes)');
    let latestEdit = 0;
    if (notes) {
      latestEdit = notes?.latestEdit;
    }
    const timer = setInterval(() => {
      if (!activeTab) {
        console.warn('!activeTab');
        return;
      }

      if (Date.now() - latestEdit > 1000) {
        if (!notesIsSyncing()) {
          if (serverNotes !== notes) {
            syncNotes();
          } else {
            fetchNotes(false);
          }
        }
      }
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, [notes]);

  // Effect for change toRet
  useEffect(() => {
    let latestEdit = 0;
    if (notes) {
      latestEdit = notes?.latestEdit;
    }

    const timer = setInterval(() => {
      if (!activeTab) {
        console.warn('!activeTab');
        return;
      }

      if (!notesIsSyncing()) {
        if (serverNotes !== notes) {
          if (Date.now() - latestEdit < 300) {
            sendLocked();
          }
        }
      }
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, [notes]);

  // когда serverNotes поменялась
  useEffect(() => {
    ilog('[NotesProvider.js] serverNotes updated');
  }, [serverNotes]);

  const value = useMemo(() => ({
    notes, setNotes, activeTab, debugStatus, updatingFromServer, locked,
  }), [notes, activeTab, debugStatus, updatingFromServer, locked]);

  ilog('NotesProvider return...');
  return (
    <NotesProviderContext.Provider value={value}>
      {children}
    </NotesProviderContext.Provider>
  );
};

// Определяем типы для пропсов
NotesProvider.propTypes = {
  children: PropTypes.node.isRequired, // Валидируем children как необходимый узел React
};

// Хук для использования контекста
export const useNotesContext = () => useContext(NotesProviderContext);
