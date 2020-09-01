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
  return (
    <GithubContext.Provider value={"hello"}>{children}</GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
