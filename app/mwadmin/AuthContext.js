import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/app/firebase/config'; // Adjust this path to your Firebase config file
import { useAuthState } from 'react-firebase-hooks/auth';

// Create a context
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  // Here, you can implement additional logic to determine if the user is an admin
  useEffect(() => {
    if (user) {
      console.log(user);
      // Check if the user is an admin
      // setIsAdmin(...);
    }
  }, [user]);

  const logout = async (callback) => {
    try {
      await auth.signOut();
      if (callback) {
        callback(); // Call the callback function after logout
      }
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAdmin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
