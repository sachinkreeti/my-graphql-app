import { useQuery } from '@apollo/client';
import { FETCH_NOTES } from '../../graphql/notes/fetchNotes';
import Form from './Form';

const Notes = () => {
  const { loading, error, data } = useQuery(FETCH_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const notes = data.fetchNotes;

  return (
    <div>
      <Form />
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
