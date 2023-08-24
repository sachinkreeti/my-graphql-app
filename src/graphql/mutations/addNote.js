import { gql } from '@apollo/client';

export const ADD_NOTE_MUTATION = gql`
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
