import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Feedback from "./Pages/Feedback";
import Cadastro from "./Pages/Cadastro";
import Pijama from "./Pages/Pijama";
import Lista_Pijamas from "./Pages/Lista_Pijamas";
import Carrinho from "./Pages/Carrinho";

import Favoritos from "./Pages/Favoritos";

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
      { path: "pijamas/:pijamaId", element: <Pijama /> },
      { path: "lista_pijamas", element: <Lista_Pijamas /> },
      { path: "favoritos", element: <Favoritos /> },
      { path: "carrinho", element: <Carrinho /> },
    ],
  },
]);

export default router;
