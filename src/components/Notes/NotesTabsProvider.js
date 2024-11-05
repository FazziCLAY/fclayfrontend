import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { ilog } from '../../Logger';
import { isSet } from '../../FazziCLAY'; // Импортируем PropTypes

function getNotesTabsFromLocalStorage() {
  const lp = localStorage.getItem('notes.tabs');
  if (!isSet(lp)) {
    localStorage.setItem('notes.tabs', JSON.stringify([]));
    return [];
  }
  return JSON.parse(lp);
}

function setNotesTabsToLocalStorage(set) {
  ilog(`set notes to localstorage: ${set}`);
  localStorage.setItem('notes.tabs', JSON.stringify(set));
}

function getCurrentNoteFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem('notes.tabs.current')).active;
  } catch (e) {
    console.error(e);
    return 555;
  }
}

function setCurrentNoteFromLocalStorage(active) {
  localStorage.setItem('notes.tabs.current', JSON.stringify({ active }));
}

// Создаем контекст
const NotesTabsProviderContext = createContext();

// Провайдер контекста
export const NotesTabsProvider = ({ children }) => {
  // все табы и ID активной табы в localStorage
  const [tabs, setTabs] = useState(getNotesTabsFromLocalStorage());
  const [active, setActive] = useState(getCurrentNoteFromLocalStorage());
  const [activeTab, setActiveTab] = useState(null); // json
  const [allowUsingTabs, setAllowUsingTabs] = useState(true); // json

  // когда tabs || active поменялись в tabs контексте
  useEffect(() => {
    if (!tabs) {
      console.warn('!tabs');
      return;
    }
    if (!active) {
      console.warn('!active');
      return;
    }
    ilog(`[NotesTabsProvider.js] tabs or active changed! Recalculate active tab active=${active} tabs=${tabs}`);
    const found = tabs.filter((l) => l.id === active);
    if (found.length === 0) {
      ilog(`[NotesTabsProvider.js] active=${null}`);
      setActiveTab(null);
    } else {
      ilog(`[NotesTabsProvider.js] active=${JSON.stringify(found[0])}`);
      setActiveTab(found[0]);
    }
  }, [tabs, active]);

  // обновляем в localStorage когда табы изменились
  useEffect(() => {
    ilog(`tabs updated! ${JSON.stringify(tabs)}`);
    setNotesTabsToLocalStorage(tabs);
  }, [tabs]);

  // обновляет в localStorage когда active изменилось
  useEffect(() => {
    ilog(`tabs active updated! ${active}`);
    setCurrentNoteFromLocalStorage(active);
  }, [active]);

  // возвращает memo в контекст
  const value = useMemo(() => ({
    tabs, setTabs, active, setActive, activeTab, allowUsingTabs, setAllowUsingTabs,
  }), [tabs, active, activeTab, allowUsingTabs]);

  ilog('NotesTabsProvider return...');
  return (
    <NotesTabsProviderContext.Provider value={value}>
      {children}
    </NotesTabsProviderContext.Provider>
  );
};

// Определяем типы для пропсов
NotesTabsProvider.propTypes = {
  children: PropTypes.node.isRequired, // Валидируем children как необходимый узел React
};

// Хук для использования контекста
export const useNotesTabsContext = () => useContext(NotesTabsProviderContext);
