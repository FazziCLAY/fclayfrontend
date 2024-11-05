import React, { useEffect, useState } from 'react';
import { useNotesTabsContext } from './NotesTabsProvider';
import { ilog } from '../../Logger';

// вкладки gui, зависит от NotesTabsContext
const NotesTabs = () => {
  const {
    tabs, setTabs, active, setActive, activeTab, allowUsingTabs,
  } = useNotesTabsContext();
  const [trigger, setTrigger] = useState(0);

  // когда обновляется id активного ререндерим кнопки
  useEffect(() => {
    ilog('[NotesTabs.js] updated tabs, active or allowUsingTabs');
    if (!activeTab) {
      if (tabs.length > 0) {
        setActive(tabs[0].id);
      }
    }
    setTrigger((prev) => prev + 1);
  }, [tabs, active, allowUsingTabs, activeTab]);

  // обновить табу
  const updateTab = (id, newValue) => {
    setTabs((prev) => prev.map((tab) => {
      if (tab.id === id) {
        return newValue;
      }
      return tab;
    }));
  };

  // добавить табу
  const addTab = (name, token) => {
    ilog('addTab');
    let genRandom = Math.round(Math.random() * 100000);
    let i = 0;
    // eslint-disable-next-line no-loop-func
    while (tabs.filter((l) => l.id === genRandom).length !== 0) {
      genRandom = Math.round(Math.random() * 100000);
      i += 1;
      if (i > 50) {
        console.warn('50+ attempts to gen uniques id failed ;<');
        break;
      }
    }
    setTabs((prev) => [...prev, { id: genRandom, name, token }]);
  };

  // удалить табу
  const removeTab = (id) => {
    ilog(`removeTab id=${JSON.stringify(id)}`);
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
  };

  // диалог редактирования табы
  const edit = (id) => {
    const tab = tabs.filter((l) => l.id === id)[0];
    const answer = prompt(
      `Что вы хотите сделать с '${tab.name}'?
1 - поменять имя
2 - поменять токен
DELETE - удалить`,
    );
    if (!answer) {
      ilog('cancel');
    } else if (answer.toLowerCase() === 'delete') {
      removeTab(id);
    } else if (answer === '1') {
      const newname = prompt(`Новое имя для ${tab.name}`, tab.name);
      if (newname) {
        updateTab(id, { ...tab, name: newname });
      }
    } else if (answer === '2') {
      const newname = prompt(`Новый токен для ${tab.name}`, tab.token);
      if (newname) {
        updateTab(id, { ...tab, token: newname });
      }
    }
  };

  // диалог добавления новой табы
  function addnew() {
    ilog('addnew');
    const name = prompt('СОВЕТ: Чтобы отредактировать вкладку - двойной щелчок.\n\nДобавить новую вкладку.\n -> Имя\n - Токен.\n\nВведите имя:');
    if (name) {
      const token = prompt('Добавить новую вкладку.\n * Имя\n -> Токен.\n\nВведите токен:');
      if (token) {
        addTab(name, token);
      }
    }
  }

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const newTabs = [...tabs];
      const [movedTab] = newTabs.splice(draggedIndex, 1);
      newTabs.splice(index, 0, movedTab);
      setTabs(newTabs);
    }
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const calcButtonBack = (id) => {
    if (!allowUsingTabs) {
      return 'rgba(71,71,71,0.67)';
    }
    return (active === id ? 'rgba(219,15,15,0.24)' : 'rgba(27,30,27,0.67)');
  };

  function onTabClick(id) {
    if (allowUsingTabs) setActive(id);
  }

  return (
    <>
      <ul style={{
        display: 'flex',
        padding: 0,
        listStyleType: 'none',
      }}
      >
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <button
              style={{ backgroundColor: `${calcButtonBack(tab.id)}` }}
              type="button"
              onClick={() => onTabClick(tab.id)}
              onDoubleClick={() => edit(tab.id)}
            >{tab.name}
            </button>
          </li>
        ))}
        <button style={{ backgroundColor: `${activeTab ? '' : 'rgba(26,29,182,0.52)'}` }} type="button" onClick={addnew}>{activeTab ? '[+]' : 'Create first tab'}</button>
      </ul>
    </>
  );
};

export default NotesTabs;
