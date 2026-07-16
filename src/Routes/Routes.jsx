import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import Rooms from "../Pages/Rooms/Rooms";
import Contact from "../Pages/Contacts/Contacts";

import MyBookings from "../Pages/Booking/MyBookings/MyBookings";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Payment from "../Pages/Payment/Paymnet";

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
        path: "/myProfile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:bookingId",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "roomDetails/:id",
        element: <RoomDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/roomTypes/${params.id}`),
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
