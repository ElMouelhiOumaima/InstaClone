import React ,{useState,useContext} from 'react'
import {Link , useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from "materialize-css"
const Signin  =()=>{
  const {state ,dispatch} = useContext(UserContext)
  const history = useHistory()
  const [password ,setPassword] = useState("")
  const [email ,setEmail] = useState("")
  const PostData =()=>{
    if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "invalid email", classes:"#b71c1c red darken-4" })
      return
    }
    fetch("http://localhost:3001/signin",{
      method:"post" ,
      headers : { 
        "Content-Type": "application/json"
      
       },
      body:JSON.stringify({
        email,
        password
      })
    }) .then(res=>res.json())
    .then(data=>
      {
        if(data.error){
       M.toast({html:data.error, classes:"#b71c1c red darken-4" })
      }else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user)) //
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"signed well" ,classes:"#80cbc4 teal lighten-3"})
        history.push('/')
      }
    }).catch(err =>{console.log(err)})
  
  }
  return(
      <div className="mycard">
        <div className="card auth-card input-field ">
        <h2>Instagram</h2>
        <input type="text" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
        <input type="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
  <button className="btn waves-effect waves-light #e91e63 pink"  onClick={()=>PostData()}>
    Sign in
  </button>
  <h5>
     <Link to="/signup"> Don't have an account </Link>
   </h5>
      </div>
      </div>
  )
}
export default Signin 