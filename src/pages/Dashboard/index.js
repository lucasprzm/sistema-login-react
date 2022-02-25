import { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";

function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <h1>Página do Dashboard</h1>
      <button onClick={() => signOut()}>Fazer logout</button>
    </div>
  );
}

export default Dashboard;
