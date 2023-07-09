const Workout = require('../models/workoutModel')//This is the model/schema we are going to follow to structure the data we work with in here. 
const mongoose = require('mongoose') //we need the Mongoose library to interact with the MongoDB database


// GET ALL WORKOUTS:

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }) // Until "Workout.find({}).sort({ createdAt: -1 })" is not finished, it is not assigned to workouts 

  res.status(200).json(workouts)
}

// GET A SINGLE PARAMETER: 

const getWorkout = async (req, res) => {
  const { id } = req.params //The function extracts the value of the "id" parameter from the "req" object using destructuring assignment. The 'req.params' object is a property of the 'req'(request) object in Node.js and Express.js. It contains route parameters that are extracted from the URL.   

  if (!mongoose.Types.ObjectId.isValid(id)) { //The "isValid" function is being called on the "Types.ObjectId" property of the "mongoose" library. 
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// CREATE A NEW WORKOUT:

const createWorkout = async (req, res) => { // you don't need /:id, it's automatically created.
  const { title, load, reps } = req.body // This code snippet is using object destructuring to extract the values of title, load, and reps from the req.body object. We can do this thanks to app.use(express.json()) in server.js.

  //we're going to detect which fields are empty when they send the post request, and then we can send that info back to the clients: 
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields }) //emptyFields will be an array with all of the fields that still need filling in. 
  }

  // add doc to db:
  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE A WORKOUT: 

const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndDelete({ _id: id }) //The argument takes an object with the property _id (it has an initial underscore symbol, as they do in the MongoDB databases) set to the value of the id variable. 

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, {
    ...req.body
  })// The second parameter  { ...req.body }  is used to provide the new data to update the document. The spread operator ( ... ) is used to extract the properties from the 'req.body'  object and pass them as individual properties to the object being created. This allows you to update multiple properties of the document in a concise way, without having to manually assign each property. The spread operator simplifies the process of merging the properties from  req.body  into the update object. 

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}