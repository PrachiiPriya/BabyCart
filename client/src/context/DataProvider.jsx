import React, { createContext, useState, useContext } from 'react';

// Create a Context
export const DataContext = createContext(null);

// Create a provider component
export default function DataProvider({ children }) {
  const [account, setAccount] = useState('');

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {children}
    </DataContext.Provider>
  );
}

// Create a custom hook for using the context
export const useData = () => {
  return useContext(DataContext);
};
