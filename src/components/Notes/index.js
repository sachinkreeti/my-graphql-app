import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_NOTES } from '../../graphql/notes/fetchNotes';
import { DELETE_NOTE_MUTATION } from '../../graphql/notes/deleteNote';
import Form from './Form';

const Notes = () => {
  const { loading, error, data } = useQuery(FETCH_NOTES);
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (data) {
      setNotes(data.fetchNotes)
    }
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleNoteAdded = (newNote) => {
    setNotes([newNote, ...notes]);
  };
  const handleNoteDelete = async (noteId) => {
    try {
      await deleteNote({
        variables: { id: noteId }
      });

      // Remove the deleted note from the state
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <Form onNoteAdded={handleNoteAdded} />
      <hr />
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <h4>{note.title}</h4>
          <div>{note.body}</div>
          <button onClick={() => handleNoteDelete(note.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Notes;
