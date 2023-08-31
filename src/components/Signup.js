import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from "../config/firebase_config"
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth"
import { setDoc,doc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'






function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errormsg, setErrorMsg] = useState("")
    const [successmsg, setSuccessMsg] = useState("")



  

const navigate = useNavigate()


    const handleSignUp = async (e) => {
        // to prevent page from submitiing
        e.preventDefault()
        try {
            // creating user through firebase 
         const user =   await createUserWithEmailAndPassword(auth, email, password)
         console.log(user)
        //  getting user name 
         updateProfile(auth.currentUser,{
            displayName:name
         })
        //  setting user data to be uploaded to firestore
            const docData = {
                Name:name,
                Email:email,
                Password:password
            }
            // Set Doc Function to push a doc to forestore
            await setDoc(doc(db, "Users",auth?.currentUser.uid),docData)
            setName("")
            setEmail("")
            setPassword("")

              // TimeOut to navigate to next page
        if(user){
            setTimeout(() => {
                setSuccessMsg("Sign Up Successful!")
                navigate("/login")
            }, 5000);
        
        }

        } catch (error) {
            console.error(error)
            setErrorMsg(error.message)

        }
      
        


    }
    return (
        <div className='register-box'>
            <h2 className='text-center'>{successmsg}</h2>
            <h2 className='text-center'>{errormsg}</h2>

            <form className='registerform' onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <div className='input-box'>
                    <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} required />
                    <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />

                    <Link to={"/login"} className='link'>Click Here to Login</Link>
                    <button className='button'> Register</button>

                </div>
            </form>





        </div>
    )
}

export default Signup