import DisplayItems from './components/DisplayItems';
import AddNoteForm from './components/AddNoteForm';

export default function App() {
  return (
    <div>
      <h4>My first Apollo app 🚀</h4>
      <AddNoteForm />
      <br />
      <br />
      <DisplayItems />
    </div>
  );
}
