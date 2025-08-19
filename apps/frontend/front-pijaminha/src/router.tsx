import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Feedback from "./Pages/Feedback";
import Cadastro from "./Pages/Cadastro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "login", element: <Login /> },
      { path: "feedback", element: <Feedback /> },
      { path: "cadastro", element: <Cadastro /> },
    ],
  },
]);

export default router;
