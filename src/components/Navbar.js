import React from 'react'
import { Link } from "react-router-dom"
import { auth } from "../config/firebase_config"
import { signOut } from "firebase/auth"
import Logo from "../Assets/logo.png"
function Navbar({ name }) {

// Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth)

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}><img src={Logo} alt='Logo' style={{width:"20%"}}/></Link>
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
                  <Link className="nav-link active mt-2" aria-current="page" to={"/signup"}>{name}</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active mt-1" aria-current="page">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg></Link>
                  {/* <span>{totalQty}</span> */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" onClick={handleLogout}><span className='btn btn-primary'>Log Out</span></Link>
                </li>


              </>}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar