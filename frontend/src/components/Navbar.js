// React
import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useMatch, useResolvedPath} from "react-router-dom"
// Imports
import "./Navbar.css"
// Contexts
//import {useAuthContext} from "../Contexts/AuthContext"

export default function Navbar() {
    //const {User, logout} = useAuthContext()
    //const [loginComponent, setLoginComponent] = useState(<></>)
    const navigate = useNavigate()

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

    return (
        <nav className="nav">
            <Link to="/" className="home navItem">
                My Javascript Website
            </Link>
            <ul>
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