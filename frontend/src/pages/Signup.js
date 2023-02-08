import React, {useState, useEffect} from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signup, isLoading, error} = useSignup()

    const buttonSignup = async (e) => {
        e.preventDefault()
        // Sign Up
        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={buttonSignup}>
            <h3>Sign Up</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign Up</button>
            {error && 
                <div className="error">
                    {error}
                </div>
            }
        </form>
    )
}

export default Signup