// React
import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useMatch, useResolvedPath} from "react-router-dom"
// Imports
import "./Navbar.css"
// Contexts
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../context/AuthContext'

export default function Navbar() {
    //const {User, logout} = useAuthContext()
    //const [loginComponent, setLoginComponent] = useState(<></>)
    const navigate = useNavigate()
    const {logout} = useLogout()
    const {user} = useAuthContext()

    // Update Login/Logout Button
    // useEffect(() => {
    //     if (User) {
    //         // Logout
    //         setLoginComponent(<>
    //             <button onClick={logout} className="transparent-button navItem">Logout</button>
    //         </>)
    //     } else {
    //         // Login
    //         setLoginComponent(<>
    //             <ViewPage to="/login" className="navItem">Login</ViewPage>
    //         </>)
    //     }
    // }, [User])

    const handleLogout = () => {
        logout()
    }

    return (
        <nav className="nav">
            <Link to="/" className="home navItem">
                My Javascript Website
            </Link>
            <ul>
                {user && (
                    <>
                        <span>{user.email}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
                {!user && (
                    <>
                        <Link to="/login" className="home navItem">
                        Login
                        </Link>
                        <Link to="/signup" className="home navItem">
                            Signup
                        </Link>
                    </>
                )}
                {/* {loginComponent} */}
                {/* <ViewPage to="/update-profile" className="navItem">Settings</ViewPage> */}
            </ul>
        </nav>
    )
}

function ViewPage({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path:resolvedPath.pathname, end:true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}> {children} </Link>
        </li>
    )
}