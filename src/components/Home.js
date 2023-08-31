import React , {useState,useEffect}from 'react'
import Navbar from "./Navbar"
import Products from './Products'
import {auth} from "../config/firebase_config"




function Home() {

    const [userName,setUserName] = useState("")
  useEffect(() => {
   
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUserName(user.displayName)
      }else {
        setUserName("")
      }
      console.log(user)
    })
   
  }, []);

  return (
    <div>
         <Navbar name={userName}/>
         <Products/>
    </div>
  )
}

export default Home