import { useRoutes } from "react-router-dom";
import { routes } from "./route";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const router = useRoutes(routes);
  return (
    <>
      <Navbar />
      {router}
      <Footer />
    </>
  );
};

export default App;
