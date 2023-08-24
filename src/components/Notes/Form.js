import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NOTE_MUTATION } from '../../graphql/notes/addNote';

function Form({ onNoteAdded }) {
  const [addNote] = useMutation(ADD_NOTE_MUTATION);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await addNote({
        variables: {
          input: {
            params: {
              title: title,
              body: body
            }
          }
        }
      });

      const addedNote = result.data.addNote.note;
      onNoteAdded(addedNote);

      // reset form fields
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Note creation failed:', error);
    }
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
    </div>
  );
}

export default Form;
