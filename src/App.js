import AddUser from "./MyComponents/AddUser";
import List from "./MyComponents/List"
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <AddUser users={users} setUsers={setUsers} />
      <List users={users} />
    </div>
  );
}

export default App;