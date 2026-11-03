import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
  const navigate=useNavigate()
  let auth=localStorage.getItem("user");
  let logout=()=>{
    localStorage.clear();
    navigate("/signup");
  }
  return (
    <nav>
      {auth?<ul className="list">
        
            <li><Link to="/">Product</Link></li>
            <li><Link to="/add">Add Product</Link></li>
            <li><Link to="/Signup" onClick={logout}>Logout</Link></li>
            </ul>:<ul className="list">
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/signin">SignIn</Link></li>
        </ul>
      }

    </nav>
  )
}

export default Navbar
