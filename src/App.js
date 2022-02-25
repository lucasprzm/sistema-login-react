import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes";
import AuthProvider from "./contexts/auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
