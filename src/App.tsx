
import { useRoutes } from "react-router-dom";
import { routes } from "./route";
import Navbar from "./components/Navbar";

function App() {
  const router = useRoutes(routes);
  return (
    <>
      <Navbar />
      {router}     
    </>
  );
}

export default App;
