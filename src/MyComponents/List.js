
function List({ users, handleEditUser, handleDeleteUser, showDeletedUsers }) {

  const fetchUsers = () => {
    const currentUsers = [...users];
    if(showDeletedUsers) {
      let deletedUsers = currentUsers.filter((user) => {
         if(user.isDeleted) {
          return user;
         }
      })
      return deletedUsers
    } else {
      let notDeltedUsers = currentUsers.filter((user) => {
        if(!user.isDeleted) {
          return user;
        }
      })
      return notDeltedUsers;
    }
  }
  
  return (
    <ul>
      {fetchUsers().map((user, index) => {
     
          return(
          <li key={index}>
            {user.name}
            <button onClick={() => handleEditUser(user.id)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          )
       
      })}
    </ul>
  );
}
export default List;
