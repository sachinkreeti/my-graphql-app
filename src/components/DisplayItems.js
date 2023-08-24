import { useQuery } from '@apollo/client';
import { GET_ITEMS } from 'graphql/items/getItems';

function DisplayItems() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  console.log('data', data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.items.map(({ id, title, description }) => (
    <div key={id}>
      <h4>{title}</h4>
      <h5>About this:</h5>
      <p>{description}</p>
    </div>
  ));
}

export default DisplayItems;
