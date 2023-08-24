import { gql } from '@apollo/client';

export const FETCH_NOTES = gql`
  query FetchNotes {
    fetchNotes {
      id
      title
      body
    }
  }
`;
