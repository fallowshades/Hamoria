import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
} from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}
export default App
