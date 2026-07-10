import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import Rooms from "../Pages/Rooms/Rooms";
import Contact from "../Pages/Contacts/Contacts";

import MyBookings from "../Pages/MyBookings/MyBookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/rooms",
        element: <Rooms />,
      },

      {
        path: "/myBookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },

      {
        path: "roomDetails/:id",
        element: <RoomDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/roomTypes/${params.id}`),
      },

      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },

      {
        path: "/signUp",
        Component: SignUp,
      },
    ],
  },
]);

export default router;
