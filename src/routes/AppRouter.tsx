import { Route, Routes, Navigate } from "react-router-dom";
import { useStore } from "../store/store";
import { AdminPaths, AdminRoutes, EAdminRoutes, EGuestRoutes, GuestPaths, GuestRoutes } from "./Routes";


const AppRouter = () => {
  const [{ user }] = useStore()

  return (
    <Routes>
      {
        Object.entries(AdminRoutes).map(([, route], index) => (
          <Route
            key={`route-${index}`}
            path={route.path}
            element={route.component}
          />
        ))}
      {
        Object.entries(GuestRoutes).map(([, route], index) => (
          <Route
            key={`route-${index}`}
            path={route.path}
            element={route.component}
          />
        ))
      }
      <Route path="/"
             element={
               <Navigate to={user ? AdminPaths[EAdminRoutes.DASHBOARD] : GuestPaths[EGuestRoutes.LOGIN]} replace/>
             }
      />
    </Routes>
  );
};

export default AppRouter;
