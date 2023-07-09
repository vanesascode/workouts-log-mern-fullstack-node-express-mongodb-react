require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workoutRoutes')


// express app
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(express.json())


// routes ( all the Api endpoints are now defined in the constant workoutRoutes, that receives the workoutRoutes.js file from the routes folder)
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 