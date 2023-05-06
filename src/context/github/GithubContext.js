import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
   const initialState = {
        users: [],
        user: {},
        loading: false,
        repos: [],
   }

   const [state, dispatch] = useReducer(githubReducer, initialState)
   //Get initial users (testing purposes)
   /* const fetchUsers = async () => {
        setLoading()
        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                //This will send the token along with a request
                Authorization: `token ${GITHUB_TOKEN}`

            }
        })

        const data = await response.json()

       dispatch({
        type: 'GET_USERS',
        payload: data,
       })
    }
 */
   //Get search results
    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                //This will send the token along with a request
                Authorization: `token ${GITHUB_TOKEN}`

            }
        })

        const {items} = await response.json()

       dispatch({
        type: 'GET_USERS',
        payload: items,
       })
    }
    //get single user
    const getUser = async (login) => {
        setLoading()
       
        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                //This will send the token along with a request
                Authorization: `token ${GITHUB_TOKEN}`

            }
        })

        if(response.status === 404){
            window.location = '/notfound'
        }
        else{
            const data = await response.json()

            dispatch({
             type: 'GET_USER',
             payload: data,
            })
        }
       
    }
    //Get user repos
    const getUserRepos = async (login) => {
        setLoading()

        const params = new URLSearchParams({
           sort: 'created',
           per_page: 10,
        })
    
        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                //This will send the token along with a request
                Authorization: `token ${GITHUB_TOKEN}`

            }
        })

        const data = await response.json()

       dispatch({
        type: 'GET_REPOS',
        payload: data,
       })
    }

    //Clear users from state
    const clearUsers = () => dispatch({
        type: 'CLEAR_USERS'
    })
    //Set loading
    const setLoading = () => dispatch({type: 
    'SET_LOADING'})
    return <GithubContext.Provider value={{
        /*
        users: state.users,
        loading: state.loading,
        user: state.user,
        */
       //The code above is an equivalent to the spread operaator below
       ...state,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        repos: state.repos
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext