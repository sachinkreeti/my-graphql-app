// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      title
      description
      artist {
        firstName
        lastName
        email
        createdAt
      }
    }
  }
`;

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br/>
      <DisplayItems />
    </div>
  );
}

function DisplayItems() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  console.log('data', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.items.map(({ id, title, description }) => (
    <div key={id}>
      <h3>{title}</h3>
      <br />
      <b>About this:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}
