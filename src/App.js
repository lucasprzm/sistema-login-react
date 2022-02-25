import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";
import AuthProvider from "./contexts/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Rotas />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
