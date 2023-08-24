import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Card, Col, Row, Spin, Typography } from 'antd';
import { FETCH_NOTES } from '../../graphql/notes/fetchNotes';
import { DELETE_NOTE_MUTATION } from '../../graphql/notes/deleteNote';
import NoteForm from './NoteForm';

import './index.css';

const { Title, Text } = Typography;

const Notes = () => {
  const { loading, error, data } = useQuery(FETCH_NOTES);
  const [deleteNote] = useMutation(DELETE_NOTE_MUTATION);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (data) {
      setNotes(data.fetchNotes);
    }
  }, [data]);

  if (loading) return <Spin size="large" />;
  if (error) return <Text type="danger">Error: {error.message}</Text>;

  const handleNoteAdded = (newNote) => {
    setNotes([newNote, ...notes]);
  };

  const handleNoteDelete = async (noteId) => {
    try {
      await deleteNote({
        variables: { id: noteId },
      });

      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="notes-container">
      <Title level={2}>Notes App</Title>
      <NoteForm onNoteAdded={handleNoteAdded} />
      <hr />
      <Title level={3}>Notes List</Title>
      <Row gutter={[16, 16]}>
        {notes.map((note) => (
          <Col span={12} key={note.id}>
            <Card title={note.title} extra={<Button onClick={() => handleNoteDelete(note.id)}>Delete</Button>}>
              <p>{note.body}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Notes;
