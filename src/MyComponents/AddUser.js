import List from './List';
import React, { useState } from 'react';

function AddUser() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [showDeletedUsers, setShowDeletedUsers] = useState(false);


  const handleAddUser = () => {
    if(!isEditMode) {
      const newUser={
        name: userName,
        id: Math.floor(Math.random()* Math.pow(10,8)),
        isDeleted: false
      }
      let currentUsers = [...users];
      currentUsers.push(newUser);
      setUsers(currentUsers)
    } else {
      const currentUsers = [...users];
      const updatedUeses = currentUsers.map((user) => {
          if(user.id ==  editUserId) {
            return {...user, name: userName}
          }
          else {
            return user;
          }
      })
      setUsers(updatedUeses);     
      setIsEditMode(false);
    }
    setUserName('');
  };

  const handleEditUser = (id) => {
    let currentUsers = [...users];
    let foundUser = currentUsers.find((user) => {
        return user.id === id;
    })
    setUserName(foundUser.name);
    setIsEditMode(true);
    setEditUserId(id);
  };

  const handleDeleteUser = (id) => {
    const currentUsers = [...users];
    let updatedUsers = currentUsers.map((user) => {
        if(user.id == id) {
            return {...user, isDeleted: true}
        } else {
          return user
        }
    })
    setUsers(updatedUsers);
  };

debugger
  return (
    <div>
      <h1>Please add users to the list</h1>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {!isEditMode ? (
        <button onClick={handleAddUser} disabled={users.length >= 10}>
          Add User
        </button>
      ) : (
        <button onClick={handleAddUser}>Update User</button>
      )}
      <button onClick={() => setShowDeletedUsers(true)}>Show deleted users</button>
      <button onClick={() => setShowDeletedUsers(false)}>Show available users</button>
      <List users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} showDeletedUsers={showDeletedUsers}/>
    </div>
  );
}
export default AddUser;
