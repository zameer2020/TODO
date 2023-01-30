import List from './List';
import React, { useState } from 'react';

function AddUser() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddUser = () => {
    if (users.length < 10) {
      setUsers([...users, userName]);
      setUserName('');
    }
  };

  const handleEditUser = (index) => {
    setEditIndex(index);
    setUserName(users[index]);
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((user, i) => i !== index));
  };


  return (
    <div>
      <h1>Please add users to the list</h1>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {editIndex === null ? (
        <button onClick={handleAddUser} disabled={users.length >= 10}>
          Add User
        </button>
      ) : (
        <button onClick={handleAddUser}>Save Changes</button>
      )}
      <List users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
    </div>
  );
}
export default AddUser;