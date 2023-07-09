import React, { createContext, useReducer } from 'react';

// Create a context
const UserContext = createContext();

// Reducer function
const userReducerSwitch = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...state, name: action.payload };
    case 'UPDATE_AGE':
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

// Parent component
const ParentComponent = () => {
  const [user, dispatch] = useReducer(userReducerSwitch, { name: '', age: 0 });

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <ChildComponent />
    </UserContext.Provider>
  );
};

// Child component
const ChildComponent = () => {
  const { user, dispatch } = useContext(UserContext);

  const handleNameChange = (e) => {
    dispatch({ type: 'UPDATE_NAME', payload: e.target.value });
  };

  const handleAgeChange = (e) => {
    dispatch({ type: 'UPDATE_AGE', payload: parseInt(e.target.value) });
  };

  return (
    <div>
      <input type="text" value={user.name} onChange={handleNameChange} />
      <input type="number" value={user.age} onChange={handleAgeChange} />
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};

export default ParentComponent;