import React, { useState, createContext } from 'react';

// 1. Create the context with a default value.
const CursorContext = createContext({
  cursorVariant: 'default',
  setCursorVariant: () => {}, // Default empty function
});

// 2. Create the Provider component that will wrap your application.
export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState("default");

  const value = { cursorVariant, setCursorVariant };

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
};

// 3. Export the context itself.
export default CursorContext;
