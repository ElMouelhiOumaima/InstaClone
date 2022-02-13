
import React ,{useContext} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const Navbar = ()=> {
    const {state ,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{
        if(state){
                return[
    
                    <li><Link to="/profile">Profile</Link></li>,
                    <li><Link to="/create">Create Post</Link></li>,
                    <li> 
                        <button className="btn waves-effect waves-light #e91e63 pink"  onClick={()=>{
                            localStorage.clear()
                            dispatch({type :"Clear"})
                            history.push('/signin')
                        }}>
                            Logout
                        </button>
                    </li>
               
                ]
                }
                else {
                    return [
                        <li><Link to="/Signin">Signin</Link></li>,
                        <li><Link to="/signup">Signup</Link></li>
                       
                    ]
                }
    }
    return (
            <nav>
                <div className="nav-wrapper white">
                    <Link to={state? "/":"/signin"}  className="brand-logo left ">Instagram</Link>
                   <ul id="nav-mobile" className="right">
                   {renderList()}
                    </ul>
                </div>
            </nav>
    )
}
export default Navbar;