import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

////UseReducer hook

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(w => w._id !== action.payload._id) 
      } //The 'filter' method is called on the 'workouts' array in the state object. It creates a new array by iterating over each element in the 'workouts' array including all the workouts whose ID  do not match with the one we have deleted. The arrow function checks if the _id property of the workout 'w' is not equal to the _id property of the action payload (which is the json, see WorkoutDetails.js file) 
    default:
      return state
  }
}


///CreateContext function

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { //here we have the function workoutsReducer with the actions, and the initial state or workouts set to null.
    workouts: null
  })

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}> 
      {children}
    </WorkoutsContext.Provider>
  )
}

// 1 // We make a new context (WorkoutsContext) and store it in a constant so we can invoke that function.

// 2 // We make a context provider component <WorkoutsContext.Provider /> to provide the context to our application component tree so that our components can access it. It wraps the rest of our application (notice it's exported too, and that it is imported in the index.js file so it can wrap the component <App />)

// 3 // In the WorkoutContext.js file, the context provider component wraps the children property taken into the component from the props. The children property represents whatever components this custom provider component wraps and since it wraps the roots app component in index.js file it means that the children prop is the root <App/> component.

// 4 // The `value props` in the context provider component are: {{ ...state, dispatch }}, which we get from the useReducer hook. So these states, actions and payloads(the info needed to carry out the action), will be able to be used anywhere in our App using a useContext hook. e.g.: 
 
      // const {{ ...state, dispatch }} = useContext(WorkoutsContext);

// The'...state', initially is null (workouts = null). The spread operator that preceds the state value, is used to create a new object by spreading the properties of the state object. So that instead of just providing the whole object what we're doing is spreading out the different properties inside the object. If you have multiple properties in your state object and you want to selectively use or update specific properties in different components, spreading the properties separately can provide more flexibility. It allows you to access and update individual properties directly without needing to destructure the entire state object. 



// 5 // However, there's another step in between. A `custom hook` that we find in the useWorkoutsContext.js file in the hooks folder.  