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
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import ManageRoomTypes from "../Pages/Dashboard/ManageRoomTypes/ManageRoomTypes";
import ManageRoomTypeDetails from "../Pages/Dashboard/ManageRoomTypes/ManageRoomTypeDetails";
import EditRoomType from "../Pages/Dashboard/ManageRoomTypes/EditRoomType";
import ManageRooms from "../Pages/Dashboard/ManageRooms/ManageRooms";
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
        element: <MyProfile />,
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
        element: <Payments />,
      },
      // User Management
      {
        path: "/dashboard/manage-users",
        element: <UserManagement />,
      },

      {
        path: "/dashboard/manage-room-types",
        element: <ManageRoomTypes />,
      },
      {
        path: "/dashboard/manage-room-types/:id",
        element: <ManageRoomTypeDetails />,
      },
      {
        path: "/dashboard/manage-room-types/:id/edit",
        element: <EditRoomType />,
      },
      {
        path: "/dashboard/manage-rooms",
        element: <ManageRooms />,
      },

      // =============================
      // Future Routes
      // =============================

      // {
      //   path: "reviews",
      //   element: <MyReviews />
      // },

      // {
      //   path: "settings",
      //   element: <Settings />
      // },

      // =============================
      // Admin Routes
      // =============================

      // {
      //   path: "admin/users",
      //   element: (
      //     <AdminRoute>
      //       <ManageUsers />
      //     </AdminRoute>
      //   ),
      // },

      // {
      //   path: "admin/rooms",
      //   element: (
      //     <AdminRoute>
      //       <ManageRooms />
      //     </AdminRoute>
      //   ),
      // },

      // {
      //   path: "admin/bookings",
      //   element: (
      //     <AdminRoute>
      //       <ManageBookings />
      //     </AdminRoute>
      //   ),
      // },

      // {
      //   path: "admin/payments",
      //   element: (
      //     <AdminRoute>
      //       <ManagePayments />
      //     </AdminRoute>
      //   ),
      // },

      // {
      //   path: "admin/reviews",
      //   element: (
      //     <AdminRoute>
      //       <ManageReviews />
      //     </AdminRoute>
      //   ),
      // },
    ],
  },
]);

export default router;
