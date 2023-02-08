
import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

const URL = "https://api.github.com/users";

const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
  const [showFollowers, setShowFollowers] = useState({});
//
const [showData, setShowData] = useState(false);



//
  
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

  const showFollowersHandler = async (index, followers_url) => {
    try {
      const followersResponse = await axios.get(followers_url);
      setShowFollowers({
        ...showFollowers,
        [index]: followersResponse.data.slice(0,3),
      });
    } catch (error) {
      console.error(error);
    }
  };

//
const handleChange = () => {
  setShowData(!showData);
};
//

  return (
    <div className="page-content">
      {/* <h1 style={{ position: "fixed", margin: "0px 500px" }}>Assignment</h1> */}
      <ul>
        {usersData.map((eachUser, index) => {
          const { login, avatar_url, followers_url } = eachUser;

          return (
            <div className="card-style">
              <li>Login: {login}</li><br />
              <img
                src={avatar_url}
                alt={`${login} avatar`}
              /><br />
              <div>
      <button onClick={handleChange}>{showData ? "hide" : "show"}</button>
     
      {showData ? (
        
           
           <button onClick={() => showFollowersHandler(index, followers_url)}>
                Show Followers
              </button>
        
      ) 
      : 
      (
        <h6>`</h6>
      )
      }
    </div> 
    <ul>{showFollowers[index] &&
                  showFollowers[index].map((eachFollower) => {
                    return <li>{eachFollower.login}</li>;
                  })}
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
