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
  AllAchievements,
  AddAchievement,
  Stats,
  Profile,
  Admin,
  EditAchievement,
} from './pages'

import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { action as addAchievementAction } from './pages/AddAchievement'
import { loader as allAchievementLoader } from './pages/AllAchievements'

import { loader as editAchievementLoader } from './pages/EditAchievement'
import { action as editAchievementAction } from './pages/EditAchievement'

import { action as deleteAchievementAction } from './pages/DeleteAchievement'
import { loader as adminLoader } from './pages/Admin'

import { action as profileAction } from './pages/Profile'

import { loader as statsLoader } from './pages/Stats'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ErrorElement } from './components'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})
const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddAchievement />,
            action: addAchievementAction,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-achievements',
            element: <AllAchievements />,
            loader: allAchievementLoader,
          },

          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-achievement/:id',
            element: <EditAchievement />,
            loader: editAchievementLoader,
            action: editAchievementAction,
          },
          { path: 'delete-achievement/:id', action: deleteAchievementAction },
        ],
      },
    ],
  },
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
