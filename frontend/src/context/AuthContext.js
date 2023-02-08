import { createContext, useReducer, useContext, useEffect } from "react";

export const AuthContext = createContext()

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error("useAuthContext must be used inside a AuthContextProvider")
    }

    return context
}

export const authReducer = (state, action) => {
    // Actions
    if (action.type === "LOGIN") {

        return {user: action.payload}
    } else if (action.type == "LOGOUT") {
        return {user: null}
    } else {
        return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])

    useEffect(() => {
        if (state.user) {
            console.log("Auth: " + JSON.stringify(state.user.email))
        } else {
            console.log("Auth: no user")
        }
    }, [state])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}