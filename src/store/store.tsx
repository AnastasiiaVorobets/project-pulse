import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TState, SetState } from "../types";
import { defaultStoreState } from "../utils/constants";
import { useAuth } from "../context/authContext.tsx";
import { mockDevices, mockProjects, mockUsers, mockNotifications } from "../utils/mockData";

const StoreContext = createContext<[TState, SetState] | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TState>(defaultStoreState)
  const { user: authUser } = useAuth()

  useEffect(() => {
    if (!authUser?.id) {
      // If no user, reset state
      setState(defaultStoreState);
      return;
    }

    const initializeData = async () => {
      try {
        setState(prev => ({
          ...prev,
          user: authUser,
          devices: { ...prev.devices, isLoading: true },
          users: { ...prev.users, isLoading: true },
          projects: { ...prev.projects, isLoading: true },
          notifications: { ...prev.notifications, isLoading: true }
        }));


        setState((prev) => ({
          ...prev,
          devices: {
            items: mockDevices,
            filteredItems: mockDevices,
            isLoading: false,
          },
          users: {
            items: mockUsers,
            filteredItems: mockUsers,
            isLoading: false,
          },
          projects: {
            items: mockProjects,
            filteredItems: mockProjects,
            isLoading: false,
          },
          notifications: {
            items: mockNotifications,
            filteredItems: mockNotifications,
            isLoading: false,
          },
        }));

      } catch (error) {
        console.error("Error initializing data:", error);
        setState(prev => ({
          ...prev,
          devices: { ...prev.devices, isLoading: false },
          users: { ...prev.users, isLoading: false },
          projects: { ...prev.projects, isLoading: false },
          notifications: { ...prev.notifications, isLoading: false }
        }));
      }
    };

    initializeData();
  }, [authUser]);

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}