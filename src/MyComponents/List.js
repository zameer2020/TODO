
function List({ users, handleEditUser, handleDeleteUser }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>
          {user}
          <button onClick={() => handleEditUser(index)}>Edit</button>
          <button onClick={() => handleDeleteUser(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
export default List;