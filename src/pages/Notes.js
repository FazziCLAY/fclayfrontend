import React from 'react';

import { NotesTabsProvider } from '../components/Notes/NotesTabsProvider';
import { NotesProvider } from '../components/Notes/NotesProvider';
import NotesTabs from '../components/Notes/NotesTabs';
import NotesEditor from '../components/Notes/NotesEditor';

const Notes = () => (
  <NotesTabsProvider>
    <div>
      <NotesTabs />
      <NotesProvider>
        <NotesEditor />
      </NotesProvider>
    </div>
  </NotesTabsProvider>
);

export default Notes;
