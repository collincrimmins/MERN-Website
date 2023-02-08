import React, {useState, useEffect, useContext} from 'react'
import {useAuthContext} from "../context/AuthContext"

export const useLogin = () => {
    const [error, setError] =  useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const Response = await fetch("/api/users/login", {
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

    return {login, isLoading, error}
}