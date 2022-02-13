import React ,{useState,useEffect,useContext,} from 'react'
import {UserContext} from '../../App'
const Home =()=>{
   const [data,setData]= useState([])
   const {state,dispatch} = useContext(UserContext)
   useEffect(()=>{
         fetch('http://localhost:3001/allpost',{
               headers:{
                  "Authorization" :"Bearer "+localStorage.getItem("jwt")
               }
         }).then(res=>res.json())
         .then(result=>{
               
              setData(result.posts)})
   },[])  
 const likePost = (id)=>{
       fetch('http://localhost:3001/like',{
             method :"put",
             headers :{
                  "Content-Type": "application/json",
                  "Authorization" :"Bearer "+localStorage.getItem("jwt")
             },
             body: JSON.stringify({
                  postID:id
             })
       }).then(res=>res.json())
       .then(result=>{
           
             const  newData= data.map(item=>{
                   if (item._id === result._id){
                         return result
                   }else {
                         return item 
                   }
             })
             setData(newData)
      }).catch (err=>{
            console.log(err)
      })
 }
 const UnlikePost = (id)=>{
       fetch('http://localhost:3001/unlike',{
             method :"put",
             headers :{
                  "Content-Type": "application/json",
                  "Authorization" :"Bearer "+localStorage.getItem("jwt")
             },
             body: JSON.stringify({
                  postID:id
             })
       }).then(res=>res.json())
       .then(result=>{
             
             const  newData= data.map(item =>{
                  if (item._id === result._id){
                        return result
                  }else {
                        return item 
                  }
            })
            setData(newData)
     }).catch (err=>{
           console.log(err)
     })
     
 }

 const makeComment = (text,postID)=>{
      fetch('http://localhost:3001/comment',{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              postID,
              text
          })
      }).then(res=>res.json())
      .then(result=>{
          console.log(result)
          const newData = data.map(item=>{
            if(item._id===result._id){
                return result
            }else{
                return item
            }
         })
        setData(newData)
      }).catch(err=>{
          console.log(err)
      })
}
const deletePost = (postid)=>{
      fetch(`http://localhost:3001/deletepost/${postid}`,{
          method:"delete",
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          } 
      }).then(res=>res.json())
      .then(result=>{
          console.log(result) /// result feha item ili tfasekh
        
          const newData = data.filter(item=>{
              return item._id !== result._id
          })
          setData(newData)
          fetch("http://localhost:3001/allpost",{
            headers:{
                "Content-Type":"application/json" ,
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
            }).then(res=>res.json())
            .then(result=>{
                //console.log(result)
                setData(result.posts)
            })
          
      })
     
}
 

  return(
     <div className="home">
            {  data.map(item=>{
                        console.log(state)
                       return(
                            
                        <div className="card home-card" key={item._id}>
                        <h5 >{item.postedBy.name} {item.postedBy._id == state._id
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                        <div className="card-image"> 
                        <img src= {item.photo}/>
                        </div>
                        <div className="card-content">
                        <i className="material-icons"  style={{color:"red"}}>favorite</i>
                       
                        { (item.likes.includes(state._id))
                        ? <i className="material-icons" onClick={()=>{UnlikePost(item._id)}}>thumb_down</i>
                        :  <i className="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
                        
                        
                        }
                       
                  
                              <h6> {item.likes.length} Likes</h6>
                              <h6> {item.title}</h6>
                              <p> {item.title} </p>
                              {
                                    item.comments.map(record=>{
                                          return(
                                                <h6 key={record._id}> <span style={{fontWeight:"500"}}> {record.postedBy.name} </span>{record.text}</h6>
                                          )
                                    })
                              }
                              <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                    
                              }}>
                              <input type="text" placeholder="add a comment"/>
                              </form>
                        </div>
                        </div>
                       )
                 })
           }
        
      
        </div>
        
   
  )
}

export default Home