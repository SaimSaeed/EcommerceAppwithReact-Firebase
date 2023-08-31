import React from 'react'
import {Link} from "react-router-dom"
import {auth} from "../config/firebase_config"
import {signOut} from "firebase/auth"
function Navbar({name}) {


    const handleLogout = ()=>{
signOut(auth)
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to={"/"}>Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {!name
          &&
          <>
       
           <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={"/signup"}>Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/login"}>Login</Link>
          </li>
          </>}
          {name
          &&
          <>
           <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to={"/signup"}>{name}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" onClick={handleLogout}>Log Out</Link>
          </li>
         
       
          </>}
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar