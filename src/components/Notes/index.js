import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_NOTES } from '../../graphql/notes/fetchNotes';
import Form from './Form';

const Notes = () => {
  const { loading, error, data } = useQuery(FETCH_NOTES);
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

  return (
    <div>
      <Form onNoteAdded={handleNoteAdded}/>
      <hr />
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <div>{note.id} {note.title}</div>
          <div>{note.body}</div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Notes;
