import AppRouter from "./routes/AppRouter";
import { Sidebar } from "./layouts/Sidebar";
import { useStore } from "./store/store";
import { useLocation } from "react-router-dom";
import { GuestPaths } from "./routes/Routes";

const App = () => {
  const [{ user }] = useStore();
  const location = useLocation();
  const isAuthPage = Object.values(GuestPaths).includes(location.pathname);

  return (
    <div className='container'>
      {user && !isAuthPage && <Sidebar />}
      <main className={user && !isAuthPage ? 'main' : 'main-auth'}>
        {/*<button onClick={addDevice}>Add DEVICE</button>*/}
        <AppRouter/>
      </main>
    </div>
  )
}

export default App
