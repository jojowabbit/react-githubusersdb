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
  const [isLoading, setisLoading] = useState(false);
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
    // Loading = true
    setisLoading(true);
    // make search
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      // fetch repos
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
        setRepos(response.data)
      );
      // fetch followers
      axios(`${followers_url}?per_page=100`).then((response) =>
        setFollowers(response.data)
      );
    } else {
      toggleError(false, "there is no user with that username");
    }

    //check remaining request
    checkRequest();
    // Loading = false
    setisLoading(false);
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
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
