import React, {useState, useEffect, useContext} from 'react'
import {useAuthContext} from "../context/AuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = async (email, password) => {
        // Remove Token
        localStorage.removeItem("user")
        // State
        dispatch({type: "LOGOUT"})
    }

    return {logout}
}