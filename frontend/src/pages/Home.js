import '../index.css';
import './Home.css';
import { useEffect } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts') //we don't put the whole path, since the root is in the "proxy" details in the package.json file. 
      const json = await response.json() //The response is then converted to JSON format using the "response.json()" method. Again, the "await" keyword is used to wait for the JSON conversion to complete. 

      if (response.ok) { // If the request was successful, the fetched workouts (the data) are set in the state variable using the "setWorkouts" function. 
        dispatch({ type: 'SET_WORKOUTS', payload: json }) //the json data is the full array of workouts. We go from null, to whatever the payload is. 
      }
    }

    fetchWorkouts() //the "fetchWorkouts" function is called to initiate the fetch request and update the state variable "workouts". 
  }, [dispatch])
  //since inside this use effect hook we use the dispatch function and it is kind of an external function that's not defined anywhere inside use effect, when we use those external functions or dependencies, then we have to declare them in the dependency array.

  //Before continuing, take into account that your fetched data is now called 'workouts'
  return (
    <div className="home">
      <WorkoutForm />
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>

    </div>
  )
}

export default Home