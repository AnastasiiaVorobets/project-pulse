import React, { createContext, useContext, useEffect, useState } from 'react';
import { TUser } from '../types';
import { mockAuthService } from "../store/actions/authActions.ts";

type TAuthContext = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<TAuthContext>({
  user: null,
  loading: true,
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log('AuthProvider: Initializing auth state...');
      const unsubscribe = mockAuthService.onAuthStateChanged((user) => {
        console.log('AuthProvider: Auth state changed:', user);
        setUser(user);
        setLoading(false);
      });

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing stored user:', error);
        }
      }
      setLoading(false);

      return () => {
        console.log('AuthProvider: Cleaning up auth subscription');
        unsubscribe();
      };
    } catch (err) {
      console.error('AuthProvider: Auth initialization error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setLoading(false);
    }
  }, []);

  if (error) {
    console.log('AuthProvider: Error state', error);
    return <div>Error: {error}</div>;
  }

  if (loading) {
    console.log('AuthProvider: Loading state');
    return <div>Loading...</div>;
  }

  console.log('AuthProvider: Final state', { user, loading, error });

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
