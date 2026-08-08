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
import Payment from "../Pages/Payment/Payment";
import DashboardLayout from "../Layout/DashboardLayout";
import Payments from "../Pages/Dashboard/Payment/Payments";
import UserManagement from "../Pages/Dashboard/AdminDashboard/UserManagement/UserManagement.jsx";
import ManageRoomTypes from "../Pages/Dashboard/AdminDashboard/ManageRoomTypes/ManageRoomTypes.jsx";
import ManageRoomTypeDetails from "../Pages/Dashboard/AdminDashboard/ManageRoomTypes/ManageRoomTypeDetails.jsx";
import EditRoomType from "../Pages/Dashboard/AdminDashboard/ManageRoomTypes/EditRoomType.jsx";
import ManageRooms from "../Pages/Dashboard/AdminDashboard/ManageRooms/ManageRooms";
import ManageBookings from "../Pages/Dashboard/AdminDashboard/ManageBookings/ManageBookings";
import BookingPage from "../Pages/Booking/BookingPage/BookingPage";
import AdminRoute from "./AdminRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome.jsx";
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
        path: "/booking/:id",
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
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

  // ==========================================
  // Dashboard
  // ==========================================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      // Dashboard Home
      {
        index: true,
        element: <DashboardHome />,
      },

      // Profile
      {
        path: "profile",
        element: <MyProfile />,
      },

      // My Bookings
      {
        path: "my-bookings",
        element: <MyBookings />,
      },

      // Payment
      {
        path: "payments/:bookingId",
        element: (
          <AdminRoute>
            <Payments />
          </AdminRoute>
        ),
      },
      // User Management
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },

      {
        path: "manage-room-types",
        element: (
          <AdminRoute>
            <ManageRoomTypes />
          </AdminRoute>
        ),
      },
      {
        path: "manage-room-types/:id",
        element: (
          <AdminRoute>
            <ManageRoomTypeDetails />
          </AdminRoute>
        ),
      },
      {
        path: "manage-room-types/:id/edit",
        element: (
          <AdminRoute>
            <EditRoomType />
          </AdminRoute>
        ),
      },
      {
        path: "manage-rooms",
        element: (
          <AdminRoute>
            <ManageRooms />
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookings />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
