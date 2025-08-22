import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Feedback from "./Pages/Feedback";
import Cadastro from "./Pages/Cadastro";
import Pijama from "./Pages/Pijama";
import Lista_Pijamas from "./Pages/Lista_Pijamas";
<<<<<<< HEAD
=======
import Carrinho from "./Pages/Carrinho";

>>>>>>> 318cb3d96e6706cc49fb5ab95c6785c099b4c214
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
<<<<<<< HEAD
      { path: "favoritos", element: <Favoritos /> },
=======
      { path: "carrinho", element: <Carrinho/> },
      {
        path: "favoritos",
        element: <Favoritos />,
      },
>>>>>>> 318cb3d96e6706cc49fb5ab95c6785c099b4c214
    ],
  },
]);

export default router;
