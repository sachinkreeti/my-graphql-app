import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button } from 'antd';
import { ADD_NOTE_MUTATION } from '../../graphql/notes/addNote';

const NoteForm = ({ onNoteAdded }) => {
  const [addNote] = useMutation(ADD_NOTE_MUTATION);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const result = await addNote({
        variables: {
          input: {
            params: {
              title: values.title,
              body: values.body
            }
          }
        }
      });

      const addedNote = result.data.addNote.note;
      onNoteAdded(addedNote);

      form.resetFields();
    } catch (error) {
      console.error('Note creation failed:', error);
    }
  };

  return (
    <div>
      <h2>Add Note</h2>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a title' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Body" name="body" rules={[{ required: true, message: 'Please enter a body' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Note
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NoteForm;
