# Workouts app with MERN full stack development framework and MVC approach:

## Mongodb + Express + React + Node

In the video you can see how it looks and what it does. Notice this app is still in development stage running on a local domain. It is a learning project and you can find all my notes during the process, which helped me understand everything better, below the video. 👇👇👇

---

---

When combined Mongodb + Express + React + Node, these technologies enable developers to create end-to-end web applications using JavaScript for both the front-end and back-end. This allows for seamless data flow between the client and server and promotes code reusability and maintainability.

Let's have a look at the backend and frontend parts of this app separately:

# BACKEND

How to start:

- [x] run: `cd backend` (to go to the backend folder)
- [ ] create the main file of the server: server.js
- [ ] run: `npm init -y` (to start a package.json)
- [ ] run: `npm install express`
- [ ] start the express app (see code in server.js)

## running the server

- We can start the app by running: `node server.js`

- However, to avoid having to start the server everytime you want to make changes, you can install nodemon by running: `npm install -g nodemon` (globally)
  Then, you start the app by running: `nodemon server.js`

- You can also go to the package.json file, and add a script that says: `"dev": "nodemon server.js"`. Then, you can start the app by running: `npm run dev`

## Environment variables

You can store any constanst you consider delicate data in a `.env` file so they can be hidden when posted in a repository. Then you can add the .env file to the git ignore file so it remains private.

- [x] For this you need to run: `npm install dotenv`

This is a package that loads environment variables from an .env file into the `process.env` object available to us globally in the node.js environment. Once this package is installed we can then go ahead and use it in the server.js file to do that for us. (see code)

## Postman

[Postman](https://www.postman.com/) is a platform that enables and makes it easier to create and use APIs. This tool is very useful for programming because it gives the possibility to test and verify the correct functioning of the projects carried out by web developers. In this proyect it was used to test different routes and types of requests in the server.

> You'll probably have to install it in your computer too, in order to test localhost addesses.

## Express router

I set up the different routes or api endpoints for the express api since what I want is to
interact with the database using such api, to do things like getting workouts from the database, sending them back to the clients, adding new workouts, deleting them or updating them. They are in the routes folder, in the workoutRoutes.js file, and their functions are in the controllers folder, in the workoutController.js file.

## Middleware

The 'use method' is used to set middleware. The middleware code fires its function for every request to the server. It's made before the rest of code, so the function'next()'(when available) is important for the code to continue running below.

## app.use(express.json())

This is a piece of middleware in the server.js file that, for any request that comes in, looks if it has some body to the request (some data that we're sending to the server, using POST or PATCH) and if it does, then it passes it and attaches it to the request object so that we can access it in the request handler. So, it analizes the JSON data in the request body and makes it available in the `req.body` property for further processing in the application's route handlers.

## MongoDB & Mongoose

MongoDB is a noSQL database, which means that instead of using tables with rows and columns inside the database like a SQL database would, instead it uses documents which resemble JSON objects. It makes it really simple to work with from a node application that uses javascript.

In this app I am using MongoDB Atlas (DBaas). A Cluster is several MongoDB servers working together. I am using a Shared one for learning purposes.

Once the project and cluster is set, you can connect the database to server.js file with Mongoose.

- [x] run `npm install mongoose`

Mongoose is what's known as an ODM (Object-Document Mapping) library, which is a tool or framework that allows developers to interact with databases in an object-oriented manner. It wraps MongoDB with an extra layer that allows us to use methods to read and write database documents and it also gives us a way to declare models and schemas to ensure a more strict data structure.

For example, a schema for a blog document which says every blog must have a title a body and an author property and it must all be strings as well. If we try to save a blog document to the database without any of those properties, Mongoose wouldn't let us: it tells you to add that extra layer of structure that MongoDB alone doesn't give us.

👉👉👉 If the server gives an error such as not being able to connect to the database, that means that you have to add your current IP address in MongoDB again.

## Models & Schemas

Now the server is connected to the database and we want to start interacting with it to add documents, then retrieve them, update them, etc. (all from inside our route handler functions), a model and a schema must be created for our data so that every document that we have and we save to the database collection follows the same predictable structure.

A model is a representation of data and business logic within an application, while a schema defines the structure and organization of data in a database. The "model" represents the overall data management object, while the "schema" represents the specific structure and validation rules for the data within that model.

In this case you can find it as the workoutModel.js file inside the folder called "models". Remember it's Mongoose that allows us to create these models and schemas for our data in the database, since MongoDB alone is schema-less:

`module.exports = mongoose.model('Workout', workoutSchema)`

1. The code uses the "module.exports" statement to export the mongoose model. This allows other files or modules to import and use the "Workout" model (it's a singular name because then MongoDB is going to pluralize this to create a workout collection for us automatically).
2. The "mongoose.model()" function is used to create a new mongoose model named "Workout" with the provided schema "workoutSchema".
3. The "workoutSchema" is defined up in the code. It specifies the structure and properties of the "Workout" model, such as the fields it should have and any validation rules.
4. The exported "Workout" model can then be used to perform database operations related to workouts, such as creating new workout documents, querying existing ones, updating, or deleting.

## Different ways of expressing routes functions:

Notice this code below:

```
router.post('/', async (req, res) => {
  const { title, load, reps } = req.body

  try {
    const workout = await Workout.create({ title, load, reps })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
```

The following approach achieves the same result as the code above, but with a different syntax using promises and chaining .then() and .catch() methods instead of using async and await .

```
router.post('/', (req, res) => {
  const { title, load, reps } = req.body;

  Workout.create({ title, load, reps })
    .then(workout => {
      res.status(200).json(workout);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});
```

However, in this project, the `async` and `await` keywords to define an asynchronous function are prefered because they simplifiy the handling of asynchronous operations and allows for a more readable and sequential code structure, making it easier to work with promises and avoid callback hell.

## MVC approach:

The Model-View-Controller (MVC) approach is a software design pattern that separates an application into three interconnected components: the model, the view, and the controller.

- The model represents the data and business logic of the application.
- The view displays the visual representation of the data to the user.
- The controller handles user input, updates the model, and controls the flow between the model and the view.

By separating the concerns of data, presentation, and user interaction, the MVC approach promotes modularity, reusability, and maintainability in software development.

We have mentioned the model/schema and the routes of this project before. The view part will be handled with React. Now let's have a look at our controller component:

## Controller:

The controller component in this project is set in the workoutController.js file, inside the controllers folder. It is a module that exports several functions for handling CRUD operations on workout data. We then export these functions to the workoutRoutes.js file so it can use them. This way, we keep a workoutRoutes.js file clean without a lot of logic in the code that can make it more difficult to read.

## So, in order to understand better all the components in the server...

To better understand the connection between the server, the routes, the controller and the model/schema in this project:

1. Start by thinking of the workoutModel.js file. It has the structure we want for each piece of data we want to work with.
2. This structure is then exported to the workoutController.js file. Here we create the functions we are going to need to apply to our routes so they work. They are:
   getWorkouts,
   getWorkout,
   createWorkout,
   deleteWorkout,
   updateWorkout.
3. We export these functions to the workoutRoutes.js file, where we have a router object initialized using the express.Router() method. We also have all the route handlers, with their root path ("/") and their proper function from the workoutRoutes.js file.
4. Finally we export these endpoints from the workoutRoutes into our server.js file, our main file of the Express application. We use the app.use method to register a middleware function for handling the requests with a specific main route. The route specified is '/api/workouts', which will follow with the endpoints from the workoutRoutes.js. E.g.: `localhost:4000/api/workouts/64a591a24cdba079efe9fbac`

# FRONTEND

How to start:

- [x] run: `cd..` (to go back to the root folder, if you are not there already)
- [ ] run: `npx create-react-app frontend` (to create the React app)
- [ ] run: `cd frontend` (to get into the React folder)
- [ ] run: `npm install react-router-dom` (so we can have different pages in the application)
- [ ] run: `npm start` (to run the application on the browser)

## React Router:

React Router is a library used in React applications to handle navigation and rendering of different components based on the URL. It is particularly useful for building single-page applications where content changes without refreshing the entire page (it is not sending requests to the server everytime a url is changed)

To have more than one page in our app, then, I imported the necessary components from the 'react-router-dom' library in the app.js file, including BrowserRouter, Routes, and Route.

- `BrowserRouter` is the component placed at the root of the application to wrap all the routes.
- `Routes` is used to define the different routes and their corresponding components. Inside the Routes component, you can define multiple Route components to handle different URLs.
- `Route` is the component that represents a specific route in the application.

> The components placed outside the Routes component will appear in all the different roots, such as the Navbar component.

React Router also has a `Link` component to create links to the different routes we have created in the app.js file, and to handle navigation between the different pages. For example, in the Navbar component, we have added a link to go back to the Home page, which is a defined route in the app.js file. A Link becomes an anchor tag then in CSS: it's useful to know when styling the app.

## Fetching the database:

We want to fetch all the workouts of our app and put them in the Home page. In order to do so, we use the `useEffect hook` in react. It is used to perform 'side effects', and so it fires a function only when the component is rendered. And since we want to fire it once (not everytime the component is rendered), we specify it with a second argument which is an empty array, the so called `dependency array`.

Within this hook, we set a `fetch()` function to send a GET request to the /api/workouts endpoint. The response is then converted to JSON format using the `response.json()` method. Finally the fetched workouts (the data) are set in the state variable of our `useState hook`.

## Rendering the data:

When returning our data to see it in the browser we doublecheck the data is actually fetched. We do so, because we've fetched it in a useEffect hook, and as we mentioned, it fetches it when the rest of the code has already been rendered... So, we solve this using the following code:

```
{workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
```

1. The code uses the logical AND operator ( && ) to check if the "workouts" variable is truthy or not.
2. If the "workouts" variable is truthy (i.e., it exists and is not null, undefined, or false), the code proceeds to the next step.
3. Inside the curly braces following the && operator, the code maps over each workout in the "workouts" array and renders the "WorkoutDetails" component for each workout.
4. If the "workouts" variable is falsy (i.e., it does not exist or is null, undefined, or false), the code does not execute the mapping and rendering part.
5. This conditional check ensures that the mapping and rendering of workout details only occur if the "workouts" variable exists, preventing any potential errors when trying to access or iterate over an undefined or null value.

## CORS error

CORS stands for Cross-Origin Resource Sharing. It is a security mechanism implemented in web browsers that restricts cross-origin HTTP requests made from scripts running in a web page. The CORS policy is enforced by the browser to protect users from potentially malicious requests.

Since we are running our frontend on port 3000 and our server on port 4000, we get this conflict.
To avoid the problem in the development stage of the application, we can install and use this [CORS package](https://www.npmjs.com/package/cors#simple-usage-enable-all-cors-requests) for that, or we can set a proxy server address so the application can route its requests through it. We are then adding this line to our "package.json" file: { "proxy": "http://localhost:4000" }

A `proxy server` acts as an intermediary between a client and a server, facilitating communication between them. When a client makes a request to access a resource, instead of directly connecting to the server that hosts the resource, the request is first sent to the proxy server. The proxy server then forwards the request to the server on behalf of the client. The main purpose of a proxy server is to provide various functionalities such as caching, filtering, load balancing, and security.

## React Context

React Context is a feature introduced in React version 16.3 that allows you to share data between components without having to pass props through every level of the component tree. It provides a way to create a global state that can be accessed by any component in your application.

React Context is particularly useful when you have data that needs to be accessed by multiple components at different levels of the component tree, avoiding the need to pass props down through intermediate components. It simplifies state management and helps in building more maintainable and scalable applications.

### keeping the frontend data or state in sync with the database using React Context

Everytime a workout is added to the app, the workout is not updated in the Home page automatically, and so I created a context action that adds the new workouts to the beginning of the workouts array.

The context provider component is given to us by the context created:

`export const WorkoutsContext = createContext()`

I want to wrap the whole app with this context provider component, but since I cannot wrap it in the WorkoutContext.js file, I go to the index.js file and I do it there.

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </React.StrictMode>
);
```

Then, in the WorkoutContext.js file, the children props will represent the app component.

```
export const WorkoutsContextProvider = ({ children }) => {
  return (
    <WorkoutsContext.Provider>
      ~~<App />~~ {children}
    </WorkoutsContext.Provider>
  )
}
```

At this moment, the context actually has no state value so it's not providing anything to the rest of the application. A `value prop` must be set onto this provider.

So, I use a `useReducer hook` to manage the states using a function (workoutsReducer). It takes in the current state and an action, and based on the action type, it updates the state accordingly. In this case, there are three action types: 'SET_WORKOUTS', 'CREATE_WORKOUT' and 'DELETE_WORKOUT.

- When the action type is 'SET_WORKOUTS', it sets the workouts in the state to the payload of the action.
- When the action type is 'CREATE_WORKOUT', it adds the new workout (payload) to the beginning of the workouts array in the state.

So, the `value props` in the context provider component are: {{ ...state, dispatch }}, which we get from the `useReducer hook`. So these states, actions and payloads(the info needed to carry out the action), will be able to be used anywhere in our App using a `useContext hook`. e.g.:

```
      // const {{ ...state, dispatch }} = useContext(WorkoutsContext);
```

However, there's another step in between. A `custom hook` that we find in the useWorkoutsContext.js file in the hooks folder. So this hook returns to us the value of the context (WorkoutsContext), which is the value we passed into the provider component: {{ ...state, dispatch }}. Then, whenever we need to use this context in the App, we just invoke this custom hook.

The custom hook adds an additional layer of abstraction, error handling, and improves code readability, making it a beneficial approach compared to using the useContext hook directly.

### Consuming the Context

So now that we have our Workouts Context set, we can use it in our application. In the Home.js file, for example, -we don't need a use State anymore, we use our custom useContext hook: useWorkoutsContext hook. Instead of using local states we're using a global context.

So we import our useWorkoutsContext hook in our Home.js file, we invoke it, and we destructure the 'workouts' and the 'dispatch' function that the hook provides us. The 'workouts' is initially set as null in our Context (see WorkoutContext.js file), but we want to update the entire array of workouts in the browser. So, after we fetch the data from the server, and if the response is ok, we dispatch the action of 'SET_WORKOUTS', using the value of the action payload (The payload is the full array of workouts we get back from the server). This way, workouts goes from being null to being whatever the payload is.

### Finally tackling the problem

So, as I had mentioned before, the main problem is that everytime a workout is added to the app, the workout is not updated in the Home page automatically.

No that the global context is set, we can tackle the problem. So we go to the workoutForm.js file, and when we've successfully added a new document to the database we need to dispatch an action which updates our context state as well to add that new workout to our global context state. That way we're keeping our User Interface (UI) in sync with the database.

So, we import and invoke our useWorkoutsContext hook in the workoutForm.js file. And in the part the component tells us that the response of posting a new workout is ok, we're dispatching the action 'CREATE_WORKOUT'. The payload is going to be the single workout we've added (json). We'll have all the workouts on our User Interface though, since when we activate the action 'CREATE_WORKOUT', workouts is going to be an array with the the current workout we've created (action.payload) + the existing state workouts (...state.workouts). See workoutsContext.js:

```
case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
```

So now when we dispatch this action and it updates the Context State( the workouts ),
that's going to update the value, re-render the Home component output and update the UI accordingly.

## Date format

I installed a date library, [Date-fns](https://date-fns.org/), to edit the `timestamps` created by MongoDB with every workout (see workoutModel.js file).

- [x] Run: npm install date-fns
- [ ] Import the tools you need:

```
import { formatDistanceToNow } from 'date-fns'
```

- [ ] Edit your timestamp(workout.createdAt):

```
<p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
```

This will result in messages such as: about 17 hours ago, 4 days ago, etc
