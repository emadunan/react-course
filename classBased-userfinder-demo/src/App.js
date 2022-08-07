import UserFinder from './components/UserFinder';
import UsersContext from "./context/users-context";

const DUMMY = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

function App() {
  return (
    <UsersContext.Provider value={{users: DUMMY}}>
      <UserFinder />
    </UsersContext.Provider>
  );
}

export default App;
