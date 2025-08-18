import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
