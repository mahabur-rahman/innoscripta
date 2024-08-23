import Error from "./components/Error";
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/preferences", element: <Preferences /> },
  { path: "/*", element: <Error /> },
];
