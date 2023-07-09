import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import './WorkoutDetails.css'
import { formatDistanceToNow } from 'date-fns'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {//fetch request //we have access to the workout._id because we have access to the props(see Home.js file)
      method: 'DELETE' // second argument is the method
    })
    const json = await response.json() //the const json is the workout that we have deleted

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
    <div className="workout-details">
      <h4 className="text-uppercase">{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className='material-symbols-rounded' onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails

//The symbol is from Google Icons. You have to add the link in the index.html, and the className='material-symbols-rounded' or whatever the google app tells you. You can modify it if you like adding the styles that the google app tells you, in your css if you like (like I have done here), but it's not necessary. Then, inside the div/span or whatever tag you used, you need to add a word(like in here, 'delete')