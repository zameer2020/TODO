import React, { useState, useEffect } from "react";

const URL = "https://api.github.com/users";


const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });

  const fetchUsersData = async (apiURL) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setUsersData(data);
      setLoading(false);
      setIsError({ status: false, msg: "" });
      if (response.status === 404) {
        throw new Error("data not found");
      }
    } catch (error) {
      setLoading(false);
      setIsError({
        status: true,
        msg: error.message || "something went wrong, pls try again!",
      });
    }
  };

  useEffect(() => {
    fetchUsersData(URL);
  }, []);

  if (loading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (isError?.status) {
    return (
      <div>
        <h3 style={{ color: "red" }}>{isError?.msg}</h3>
      </div>
    );
  }

  return (
    <div>
      <h1>Assignment</h1>
      <ul>
        {usersData.map((eachUser,index) => {
          const { login,avatar_url,followers_url
        } = eachUser;

        const showFollowers=(followers_url)=>{

          return  {followers_url}
        };

      
          return (
            <div>
                <li>{login}</li>
              <li>{avatar_url}</li>
              <button onClick={() => showFollowers(followers_url)}> show followers</button>
             
              
              </div>
        


            
          );
        })}
      </ul>
    </div>
  );
};

export default App;
