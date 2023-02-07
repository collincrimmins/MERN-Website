// const Workout = require("../models/WorkoutModel.js")
// const mongoose = require("mongoose")

// From workouts.js
// const {
//     createWorkout,
//     //getWorkouts,
//     getWorkout,
//     deleteWorkout,
//     updateWorkout
// } =  require("../controllers/WorkoutController")

// // Get All Workouts
// const getWorkouts = async (Request, Response) => {
//     // Get Workouts by Newest
//     const workouts = await Workout.find({}).sort({createdAt: -1})
//     // Return
//     Response.status(200).json(workouts)
// }

// // Get a Workout
// const getWorkout = async (Request, Response) => {
//     const {id} = Request.params
//     // Check ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return Response.status(404).json({Error: "Does not Exist."})
//     }
//     // Get Workout
//     const workout = await Workout.findById(id)
//     // Return
//     if (!workout) {
//         return Response.status(404).json({Error: "Does not Exist."})
//     }
//     Response.status(200).json(workout)
// }

// // Create New Workout
// const createWorkout = async (Request, Response) => {
//     console.log(Request.body)
//     const {title, load, reps} = Request.body
//     // Add Document to Database
//     try {
//         const workoutDoc = await Workout.create({title, load, reps})
//         Response.status(200).json(workoutDoc)
//     } catch (error) {
//         Response.status(400).json({Error: error.message})
//     }
// }

// // Delete Workout
// const deleteWorkout = async (Request, Response) => {
//     const {id} = Request.params
//     // Check ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return Response.status(404).json({Error: "Does not Exist."})
//     }
//     // Delete Workout
//     const workout = await Workout.findOneAndDelete({_id: id}) // Returns Document after Deletion
//     // Return
//     if (!workout) {
//         return Response.status(404).json({Error: "Does not Exist."})
//     }
//     Response.status(200).json(workout)
// }

// // Update Workout
// const updateWorkout = async (Request, Response) => {
//     const {id} = Request.params
//     // Check ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return Response.status(404).json({Error: "Does not Exist."})
//     }
//     // Update Workout
//     const workout = await Workout.findOneAndUpdate({_id: id}, {
//         ...Request.body
//     })
//     // Return
//     if (!workout) {
//         return Response.status(404).json({Error: "Does not Exist."})
//     }
//     Response.status(200).json(workout)
// }

// module.exports = {
//     createWorkout,
//     getWorkouts,
//     getWorkout,
//     deleteWorkout,
//     updateWorkout
// }