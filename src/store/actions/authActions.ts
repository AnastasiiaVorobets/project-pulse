import { NavigateFunction } from "react-router-dom";
import { TSignupForm, TUser } from "../../types";

export const handleLogin = async (
  values: { email: string; password: string },
  setState: any,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  navigate: NavigateFunction
) => {
  try {
    setError(null);
    setState({ isLoading: true });
    await mockAuthService.signIn(values.email);
    navigate("/devices");
  } catch (error: any) {
    setError(error.message);
  } finally {
    setState({ isLoading: false });
  }
};

export const handleSignup = async (
  values: TSignupForm,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsSignupDone: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setError(null);
    await mockAuthService.signUp({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    });
    setIsSignupDone(true);
  } catch (error: any) {
    setError(error.message);
  }
};

export const doSignOut = () => {
  return mockAuthService.signOut();
};


export const mockAuthService = {
  currentUser: null as TUser | null,

  async signIn(email: string): Promise<TUser> {
    const user = {
      email,
      firstName: email.split('@')[0],
      lastName: 'User',
      role: 'user',
    };

    this.currentUser = user as TUser;
    localStorage.setItem('user', JSON.stringify(user));
    return user as TUser;
  },

  async signUp(userData: { email: string; password: string; firstName: string; lastName: string }): Promise<TUser> {
    const user = {
      email: userData.email,
      firstName: userData.firstName || userData.email.split('@')[0],
      lastName: userData.lastName || 'User',
      role: 'user',
    };

    this.currentUser = user as TUser;
    localStorage.setItem('user', JSON.stringify(user));
    return user as TUser;
  },

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('user');
  },

  async resetPassword(email: string): Promise<void> {
    console.log('Password reset email sent to:', email);
  },

  async confirmPasswordReset(code: string, newPassword: string): Promise<void> {
    console.log('Password reset confirmed with code:', code);
    console.log('New password set to:', newPassword);
  },

  onAuthStateChanged(callback: (user: TUser | null) => void): () => void {
    console.log('mockAuthService: onAuthStateChanged called');
    // Check localStorage for existing user
    const storedUser = localStorage.getItem('user');
    console.log('mockAuthService: storedUser', storedUser);
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        console.log('mockAuthService: parsed user', this.currentUser);
        callback(this.currentUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.currentUser = null;
        callback(null);
      }
    } else {
      console.log('mockAuthService: no stored user');
      this.currentUser = null;
      callback(null);
    }

    // Return unsubscribe function
    return () => {
      console.log('mockAuthService: cleanup');
      this.currentUser = null;
    };
  }
};