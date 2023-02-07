import React, {useState, useEffect} from 'react'
import { useWorkoutsContext } from "../context/WorkoutContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const Response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await Response.json()

        if (Response.ok) {
            // Reset Form
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            // Add Workout to Page Locally
            dispatch({type: "CREATE_WORKOUT", payload: json})
        } else {
            setError(json.error)
            // Set Empty Fields
            setEmptyFields(json.emptyFields)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes("title") ? "error" : ""}/>

            <label>Load (kg):</label>
            <input 
            type="number" 
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes("load") ? "error" : ""}/>

            <label>Reps:</label>
            <input 
            type="number" 
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes("reps") ? "error" : ""}/>

            <button>Set Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm