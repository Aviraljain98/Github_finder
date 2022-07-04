import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user:{},
    Loading: false,
    repos:[],
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);
  //search user
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
        q:text
    })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    const {items} = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //get single user
  const getUser = async (login) => {
    setLoading();
   
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `${ GITHUB_TOKEN}`,
      },
    });

    if(response.status===404){
       window.location='/notfound'
    }else{
    const data = await response.json();
    dispatch({
      type: "GET_USER",
      payload:data,
     
    });
  }
  };

  //get respos
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort:'created' ,
      per_page:10,
  })
   
    const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });

    if(response.status===404){
       window.location='/notfound'
    }else{
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload:data,
     
    });
  }
  };



  const clearUser = ()=>{
    dispatch({
        type: "CLEAR_USER",
      });
  }

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{ users: state.users,repos:state.repos,user:state.user, Loading: state.Loading,searchUsers ,clearUser,getUser,getUserRepos}}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
