import { createContext, useReducer, useContext } from "react";

export const WorkoutContext = createContext()

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error("useWorkoutsContext must be used inside a WorkoutsContextProvider")
    }

    return context
}

export const workoutsReducer = (state, action) => {
    // Actions
    if (action.type === "SET_WORKOUTS") {
        // Set Workouts
        return {
            workouts: action.payload,
        }
    } else if (action.type == "CREATE_WORKOUT") {
        // Add Workout
        return {
            workouts: [action.payload, ...state.workouts]
        }
    } else if (action.type == "DELETE_WORKOUT") {
        // Delete Workout by ID
        return {
            workouts: state.workouts.filter((w) => {
                if (w._id != action.payload._id) {
                    return true
                }
            })
        }
    } else {
        return state
    }
}

export const WorkoutContextsProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}