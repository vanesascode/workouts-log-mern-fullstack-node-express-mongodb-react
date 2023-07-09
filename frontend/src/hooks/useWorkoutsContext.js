import { WorkoutsContext } from "../context/WorkoutsContext"
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}

//Instead of directly using a useContext hook (which allows you to access the value of a context provider from within our functional component in the WorkoutContext.js file, we create a custom hook for the context we made and then whenever we need to use this context we'll just invoke this custom hook

//so this hook returns to us the value of the context (the object 'WorkoutsContext'), stored in the constant 'context', which is the value we passed into the provider component: {{ ...state, dispatch }}


//another thing we can do inside this hook is check that we're within the scope of the context we're using or trying to use. A context provider wraps a component tree that it wants to provide that context value to. In our case that's the root app component but it could have just been the home component or some other sub tree of components, and if that's the case, it means you'd only ever be able to use this context within that tree of components. And if it's being used outside that component tree then the context will be null. So in that case, instead of returning the context, which would be pointless when it's null, we can throw an error. So we do a simple 'if check' to say, 'if not context' (so if we don't have a value for it), then we want to throw an error. Inside the error we can have a message (see above)

// So, The custom hook  useWorkoutsContext  has these benefits over using the  useContext  hook directly: 
 
// 1. Encapsulation: By creating a custom hook, you encapsulate the logic for accessing the WorkoutsContext within a single function. This promotes code organization and reusability. It allows you to abstract away the implementation details of how the context is accessed. 
 
// 2. Error Handling: The custom hook includes error handling logic. If the context is not found (i.e., not wrapped by a WorkoutsContextProvider), it throws an error. This helps catch and handle potential mistakes during development, providing clearer error messages. 
 
// 3. Readability and Simplicity: Using the custom hook  useWorkoutsContext  provides a cleaner and more readable code structure. Instead of calling  useContext(WorkoutsContext)  directly in multiple components, you can simply import and use  useWorkoutsContext . This makes the code more concise and easier to understand. 
 
// 4. Potential for Future Enhancements: The custom hook can be extended in the future to include additional functionality or logic specific to the WorkoutsContext. It provides a centralized place to make changes and updates, making it easier to maintain and evolve the codebase.