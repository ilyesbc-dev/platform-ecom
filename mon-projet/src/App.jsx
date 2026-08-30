import { UserContext } from "./UserContext";
import Dashboard from "./Dashboard";

function App() {
  const user = {
    name: "ilyes",
    age: 19,
    img : "/src/assets/hero.png"
   
  };

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

export default App;