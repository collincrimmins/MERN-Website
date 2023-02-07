import { useWorkoutsContext } from "../context/WorkoutContext"
// Date
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext()

    const deleteWorkout = async () => {
        const Response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE"
        })
        const json = await Response.json()
        if (Response.ok) {
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }

    return (
        <div key={workout._id} className="workoutBox">
            <p><u><strong>{workout.title}</strong></u></p>
            <p><strong># Reps:</strong> {workout.reps}</p>
            <p><strong>Load:</strong> {workout.load}</p>
            <p><i>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</i></p>
            <span onClick={deleteWorkout} className="material-symbols-outlined">Delete</span>
        </div>
    )
}

export default WorkoutDetails