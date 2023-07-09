import './WorkoutForm.css'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = { title, load, reps } // the workout object structure that we're going to send as the body of the request 

    //SERVER RECEIVES OUR REQUEST AND WE SAVE THE ANSWER INTO THE CONST 'RESPONSE'

    const response = await fetch('/api/workouts', { // If you have a look at the server.js file from the server, you'll see this is the path. - Until data is not fetched, it's not assigned to 'response' 
      method: 'POST',
      body: JSON.stringify(workout), //we cannot send the data as an object, it has to be JSON
      headers: { //a headers property to say that the content type is going to be JSON
        'Content-Type': 'application/json'
      }
    })

    // When we send our request to the server, if everything is ok, remember that its response is: "res.status(200).json(workout)" (from workoutController.js file). We convert the response from the server into JSON again anyway: 

    const json = await response.json()

    if (!response.ok) {
      setError(json.error) // we have an error property, remember: "res.status(400).json({ error: error.message })" (from workoutController.js file).
      setEmptyFields(json.emptyFields) // this comes from the emptyFields array in workoutController.js file in the backend.
    }
    if (response.ok) {
      setError(null) //null clears any previous error message. 
      setTitle('') //The variables (setTitle , setLoad , setReps) are reset to empty values. 
      setLoad('')
      setReps('')
      setEmptyFields([]) //we want it empty again if response ok.
      console.log('new workout added:', json) //The "json" variable contains the data of the newly added workout, which is logged along with the message.
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='mb-4'>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''} //The "includes()" method is used to check if the array contains the specified element.
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm