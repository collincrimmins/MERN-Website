import React, {useState, useEffect} from 'react'
import {useNavigate, Navigate, Link} from "react-router-dom"
import { useWorkoutsContext } from "../context/WorkoutContext"
import { useAuthContext } from '../context/AuthContext'

import "./Home.css"
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from '../components/WorkoutForm'

export default function Home() {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    // Get Workouts on Start
    useEffect(() => {
        const fetchWorkouts = async () => {
            const Response = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
            const json = await Response.json()

            if (Response.ok) {
                dispatch({type: "SET_WORKOUTS", payload: json})
            }
        }

        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workoutList">
                {workouts && workouts.map((v) => (
                    <WorkoutDetails key={v._id} workout={v}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}