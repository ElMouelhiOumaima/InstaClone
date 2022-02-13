import React ,{useEffect ,useState,useContext} from 'react'
import {UserContext} from '../../App'
const Profile  =()=>{
  const [mypics,setpics]= useState([])
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:3001/mypost',{
          headers:{
             "Authorization" :"Bearer "+localStorage.getItem("jwt")
          }
    }).then(res=>res.json())
    .then(result=>{
      setpics(result.mypost)})
},[])  
  return(
      <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div style={{ display:"flex",justifyContent:"space-around",margin:"18px 0px",borderBottom:"1px solid grey"}}>
          <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}} src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>
          </div>
          <div>
            <h4>{state? state.name :"loading"} </h4>
            <div style={{display:"flex" ,justifyContent:"space-between",width:"100%"}}>
              <h6> 40    posts        </h6>
              <h6> 40    followers     </h6>
              <h6> 40    following     </h6>
            </div>
          </div>
        </div>
      <div className="gallery">
        { mypics.map((item)=>{
            return (
            <img key={item._id} className="item" src={item.photo} alt={item.title} />
             )
          })
        }
   
       
      </div>
      </div>
  )
}
export default Profile 