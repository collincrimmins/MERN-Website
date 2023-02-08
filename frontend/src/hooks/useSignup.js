import React, {useState, useEffect, useContext} from 'react'
import {useAuthContext} from "../context/AuthContext"

export const useSignup = () => {
    const [error, setError] =  useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const Response = await fetch("/api/users/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        })
        const json = await Response.json()

        if (Response.ok) {
            // Set JWT into LocalStorage
            localStorage.setItem("user", JSON.stringify(json))
            // Update Auth Context
            setIsLoading(false)
            dispatch({type: "LOGIN", payload: json})
        } else {
            setIsLoading(false)
            setError(json.error)
        }
    }

    return {signup, isLoading, error}
}