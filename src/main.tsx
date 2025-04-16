import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.scss";
import { StoreProvider } from "./store/store";
import { AuthProvider } from "./context/authContext.tsx";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <AuthProvider>
      <StoreProvider>
        <App/>
      </StoreProvider>
    </AuthProvider>
  </Router>
)
