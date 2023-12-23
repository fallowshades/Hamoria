import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

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

import {
  FeatureHome,
  AllSigns,
  SingleSign,
  SignList,
  About,
  RegisterInterior,
  LoginInterior,
  Checkout,
  Orders,
  Cart,
} from './pages'

import {
  CookieSetting,
  Events,
  Help,
  News,
  TermsAndConditions,
} from './pages/footReference'

import {
  AllHandStatus,
  AllOrientation,
  AllReference,
  AllWord,
  AllPrefix,
} from './pages/handparts'

import {
  AllShock,
  AllDenial,
  AllAnger,
  AllBargain,
  AllDepression,
  AllTesting,
  AllAcceptance,
} from './pages/courses/so'

import {
  AllCrud,
  AllDomain,
  AllTuple,
  AllPlace,
  AllItem,
} from './pages/courses/no'

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

import { loader as featureLoader } from './pages/FeatureHome'
import { loader as allSignsLoader } from './pages/AllSigns'
import { loader as singleSignLoader } from './pages/SingleSign'
import { action as interiorRegisterAction } from './pages/RegisterInterior'

import { action as interiorLoginAction } from './pages/LoginInterior'
import { store } from './store'
import { loader as checkoutLoader } from './pages/Checkout'
import { action as checkoutAction } from './components/CheckoutForm'
import { loader as ordersLoader } from './pages/Orders'

import { action as prefixAction } from './components/courses/handparts/FooterAddPrefix'
import { loader as prefixLoader } from './pages/handparts/AllPrefix'
import { action as deletePrefixAction } from './pages/handparts/DeletePrefix'
import { action as orientationAction } from './components/courses/handparts/AddOrientation'
import { loader as orientationLoader } from './pages/handparts/AllOrientation'
import { action as deleteOrientationAction } from './pages/handparts/DeleteOrientation'

import { action as referenceAction } from './components/courses/handparts/AddReference'
import { loader as ReferenceLoader } from './pages/handparts/AllReference'
import { action as deleteReferenceAction } from './pages/handparts/DeleteReference'

import { action as wordAction } from './components/courses/handparts/AddWord'
import { loader as wordLoader } from './pages/handparts/AllWord'
import { action as deleteWordAction } from './pages/handparts/DeleteWord'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const checkDefaultSidebar = () => {
  return localStorage.getItem('isLeftSidebarActive') != 'true'
}

const isLeftSidebarActive = checkDefaultSidebar()

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
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: (
          <DashboardLayout
            queryClient={queryClient}
            isLeftSidebarEnabled={isLeftSidebarActive}
          />
        ),
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <FeatureHome />,
            loader: featureLoader(queryClient),
          },
          {
            path: 'add-achievement',
            element: <AddAchievement />,
            action: addAchievementAction(queryClient),
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-achievements',
            element: <AllAchievements />,
            loader: allAchievementLoader(queryClient),
          },

          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-achievement/:id',
            element: <EditAchievement />,
            loader: editAchievementLoader(queryClient),
            action: editAchievementAction(queryClient),
          },
          {
            path: 'delete-achievement/:id',
            action: deleteAchievementAction(queryClient),
          },
          {
            path: 'all-signs',
            element: <AllSigns />,
            loader: allSignsLoader(queryClient),
          },
          {
            path: 'signs/:id',
            element: <SingleSign />,
            loader: singleSignLoader(queryClient),
          },
          {
            path: 'cart',
            element: <Cart />,
          },
          { path: 'about', element: <About /> },
          {
            path: 'checkout',
            element: <Checkout />,
            loader: checkoutLoader(store),
            action: checkoutAction(store, queryClient),
          },
          {
            path: 'orders',
            element: <Orders />,
            loader: ordersLoader(store, queryClient),
          },
          {
            path: 'cookie-setting',
            element: <CookieSetting />,
          },
          {
            path: 'events',
            element: <Events />,
          },
          {
            path: 'help',
            element: <Help />,
          },
          {
            path: 'news',
            element: <News />,
          },
          {
            path: 'terms-and-conditions',
            element: <TermsAndConditions />,
          },
          {
            path: 'references',
            element: <AllReference />,
            action: referenceAction(queryClient),
            loader: ReferenceLoader(queryClient),
          },
          {
            path: 'delete-reference/:id',
            action: deleteReferenceAction(queryClient),
          },
          {
            path: 'word',
            element: <AllWord />,
            action: wordAction(queryClient),
            loader: wordLoader(queryClient),
          },
          { path: 'delete-word/:id', action: deleteWordAction(queryClient) },
          {
            path: 'orientation',
            element: <AllOrientation />,
            action: orientationAction(queryClient),
            loader: orientationLoader(queryClient),
          },
          {
            path: 'delete-orientation/:id',
            action: deleteOrientationAction(queryClient),
          },
          {
            path: 'hand-status',
            element: <AllHandStatus />,
          },
          {
            path: 'prefix',
            element: <AllPrefix />,
            action: prefixAction(queryClient),
            loader: prefixLoader(queryClient),
          },
          {
            path: 'delete-prefix/:id',
            action: deletePrefixAction(queryClient),
          },
          {
            path: 'crud',
            element: <AllCrud />,
          },
          {
            path: 'domain',
            element: <AllDomain />,
          },
          {
            path: 'tuple',
            element: <AllTuple />,
          },
          {
            path: 'place',
            element: <AllPlace />,
          },
          {
            path: 'item',
            element: <AllItem />,
          },
          {
            path: 'shock',
            element: <AllShock />,
          },
          {
            path: 'denial',
            element: <AllDenial />,
          },
          {
            path: 'anger',
            element: <AllAnger />,
          },
          {
            path: 'bargain',
            element: <AllBargain />,
          },
          {
            path: 'depression',
            element: <AllDepression />,
          },
          {
            path: 'testing',
            element: <AllTesting />,
          },

          {
            path: 'acceptance',
            element: <AllAcceptance />,
          },
        ],
      },
      {
        path: 'login-interior',
        element: <LoginInterior />,
        action: interiorLoginAction(store),
      },
      {
        path: 'register-interior',
        element: <RegisterInterior />,
        action: interiorRegisterAction,
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
