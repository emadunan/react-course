import { useState } from 'react';
import './App.css';
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [users, setUsers] = useState([]);

  const addUserHandler = (user) => {
    setUsers(prevUsers => [user, ...prevUsers]);
  }
  
  return (
    <div className="App">
      <AddUser onaddUser={addUserHandler}/>
      <UsersList users={users}/>
    </div>
  );
}

export default App;
