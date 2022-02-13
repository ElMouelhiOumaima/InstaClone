import React ,{useEffect,useContext,useReducer} from'react'
import Navbar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import Profile from './components/screens/Profile'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import UserProfile from './components/screens/UserProfile'

import  CreatePost from './components/screens/CreatePost'
import {initialState,reducer} from './reducers/userReducer'

export const UserContext = React.createContext();

const Routing =()=>{
  const history =useHistory()
  const {state,dispatch}= useContext(UserContext)
  useEffect (()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if (user){ 
      dispatch({type:"USER",playload:user})
    }else {
      history.push("/signin")
    }
  },[])
  return(
    <Switch>
    <Route exact path="/"> <Home/></Route>
    <Route exact path="/profile"> <Profile/></Route>
    <Route path="/signup"> <Signup/></Route>
    <Route path="/Signin"> <Signin/></Route>
    <Route path="/create"> <CreatePost/></Route>
    <Route path="/profile/:userid"> <UserProfile/></Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  )
}
export default App;
