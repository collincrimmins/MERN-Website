const express = require("express")
const mongoose = require("mongoose")
const WorkoutModel = require("../models/workoutModel.js")
const requireAuth = require("../middleware/requireAuth")

// Enable Authentication Middleware
const router = express.Router()
router.use(requireAuth)

// GET All Workouts
router.get("/", async (Request, Response) => {
    // Get Workouts by Newest
    const workouts = await WorkoutModel.find({}).sort({createdAt: -1})
    // Return
    Response.status(200).json(workouts)
})

// GET Workout by ID
router.get("/:id/", async (Request, Response) => {
    const {id} = Request.params
    // Check ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Response.status(404).json({error: "Does not Exist."})
    }
    // Get Workout
    const workout = await WorkoutModel.findById(id)
    // Return
    if (!workout) {
        return Response.status(404).json({error: "Does not Exist."})
    }
    Response.status(200).json(workout)
})

// POST New Workout
router.post("/", async (Request, Response) => {
    const {title, load, reps} = Request.body
    // Validate Input
    let emptyFields = []
    if (!title) {
        emptyFields.push("title")
    }
    if (!load) {
        emptyFields.push("load")
    }
    if (!reps) {
        emptyFields.push("reps")
    }
    if (emptyFields.length > 0) {
        return Response.status(400).json({error: "Please include all fields.", emptyFields: emptyFields})
    }
    // Add Document to Database
    try {
        const workoutDoc = await WorkoutModel.create({title, load, reps})
        Response.status(200).json(workoutDoc)
    } catch (error) {
        Response.status(400).json({error: error.message})
    }
})

// DELETE Workout by ID
router.delete("/:id/", async (Request, Response) => {
    const {id} = Request.params
    // Check ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Response.status(404).json({error: "Does not Exist."})
    }
    // Delete Workout
    const workout = await WorkoutModel.findOneAndDelete({_id: id}) // Returns Document after Deletion
    // Return
    if (!workout) {
        return Response.status(404).json({error: "Does not Exist."})
    }
    Response.status(200).json(workout)
})

// UPDATE Workout by ID
router.patch("/:id/", async (Request, Response) => {
    const {id} = Request.params
    // Check ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return Response.status(404).json({error: "Does not Exist."})
    }
    // Update Workout
    const workout = await WorkoutModel.findOneAndUpdate({_id: id}, {
        ...Request.body
    })
    // Return
    if (!workout) {
        return Response.status(404).json({error: "Does not Exist."})
    }
    Response.status(200).json(workout)
})

module.exports = router