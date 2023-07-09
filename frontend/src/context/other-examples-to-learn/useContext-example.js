import React, { createContext, useContext } from 'react';

////////////////////////////////////////////Creation and setting of context

// Create a context
const ThemeContext = createContext();

// Parent component
const ParentComponent = () => {
  const theme = 'dark';

  return (
    <ThemeContext.Provider value={theme}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
};

////////////////////////////////////////////////Aplication of context

// Child component
const ChildComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <p>Current theme: {theme}</p>
    </div>
  );
};

export default ParentComponent;