import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from "../config/firebase_config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom'


function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errormsg, setErrorMsg] = useState("")
    const [successmsg, setSuccessMsg] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const navigate = useNavigate()
    const handleSubmission = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            setSuccessMsg(true)
            await signInWithEmailAndPassword(auth, email, password)
            setButtonDisabled(false)
            setSuccessMsg(false)
            setEmail("")
            setPassword("")
            setSuccessMsg("Login Successful!")
            navigate("/")





        } catch (error) {
            console.error(error)
            setErrorMsg(error.message)
        }
    }

    return (
        <div className='register-box'>
    { successmsg && <h2 className='text-center'> Login Successful!</h2>}
            <h2 className='text-center'>{errormsg}</h2>

            <form className='registerform' style={{ height: "60vh" }} onSubmit={handleSubmission}>
                <h2>Login</h2>
                <div className='input-box'>
                    <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
                    <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} required />

                    <Link to={"/signup"} className='link'>Click Here to Sign Up</Link>

                    <button className='button' disabled={buttonDisabled} > Login</button>
                    <Link to={"/login"} className='link'>Forgot Password?</Link>



                </div>
            </form>





        </div>
    )
}

export default Login