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
  // check request
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequest(remaining);
        if (remaining === 0) {
          // throw error
        }
      })
      .catch((err) => console.log(err));
  };
  // error
  useEffect(checkRequest, []);
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, request }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
