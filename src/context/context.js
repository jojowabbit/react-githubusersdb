import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

// Setup Context
const GithubContext = React.createContext();
// Then we have access to Context.Provider & Context.Consumer

// Create a component that return Context.Provider & wrap App @ index.js, components will have the access to context by useContext api
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request & loading
  const [request, setRequest] = useState(0);
  const [loading, setLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: "" });

  // show defaulted to false & empty msg if no params set
  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };
  // search github user
  const searchGithubUser = async (user) => {
    // toggleError : reset
    toggleError();
    // setLoading true
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(false, "there is no user with that username");
    }
  };
  // check request rate
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequest(remaining);
        if (remaining === 0) {
          // throw error
          toggleError(true, "sorry you have extended your hourly limit");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(checkRequest, []);
  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, request, error, searchGithubUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
