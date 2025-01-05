import  { createContext, useState } from 'react';

// Create the UserContext
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

// UserProvider component to provide user data to the app
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial user state is null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

