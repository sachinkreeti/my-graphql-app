import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const ADD_NOTE_MUTATION = gql`
  mutation AddNote($input: AddNoteInput!) {
    addNote(input: $input) {
      note {
        id
        title
        body
      }
    }
  }
`;

function AddNoteForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [addNote, { data }] = useMutation(ADD_NOTE_MUTATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      variables: {
        input: {
          params: {
            title: title,
            body: body
          }
        }
      }
    });
  };

  return (
    <div>
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <button type="submit">Add Note</button>
      </form>
      {data && data.addNote && (
        <div>
          <h3>New Note</h3>
          <p>ID: {data.addNote.note.id}</p>
          <p>Title: {data.addNote.note.title}</p>
          <p>Body: {data.addNote.note.body}</p>
        </div>
      )}
    </div>
  );
}

export default AddNoteForm;
