import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import About from "../components/About/About";
import ErrorElement from "../pages/ErrorElement/ErrorElement";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Rider from "../pages/Rider/Rider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component : RootLayout,
    errorElement:<ErrorElement></ErrorElement>,
    children :[
        {
            index: true,
            Component:Home
        },
        {
          path: '/coverage',
          Component: Coverage,
          loader: () => fetch('/serviceCenters.json').then(res => res.json())
        },

        {
          path: '/about',
          Component: About,
          // loader: () => fetch('/serviceCenters.json').then(res => res.json())
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/rider',
        element: <PrivateRoute><Rider></Rider></PrivateRoute>
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  }
]);