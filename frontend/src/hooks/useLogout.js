import React, {useState, useEffect, useContext} from 'react'
import {useAuthContext} from "../context/AuthContext"
import {useWorkoutsContext} from "../context/WorkoutContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: workoutsDispatch} = useWorkoutsContext()

    const logout = async (email, password) => {
        // Remove Token
        localStorage.removeItem("user")
        // State
        dispatch({type: "LOGOUT"})
        workoutsDispatch({type: "SET_WORKOUTS", payload: null})
    }

    return {logout}
}