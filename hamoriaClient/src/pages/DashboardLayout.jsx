import { Outlet, useNavigation } from 'react-router-dom'

import Wrapper from '../assets/wrappers/Dashboard'
import { Navbar, BigSidebar, SmallSidebar } from '../components'

import {
  useState,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'

import { redirect, useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Loading } from '../components'
import { useQuery } from '@tanstack/react-query'
import { Header, WhatSidebar, WhatSidebarBig } from '../components'

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user')

    return data
  },
}
export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    console.log(error)
    return redirect('/')
  }
}
const DashboardContext = createContext()
const DashboardLayout = ({ isDarkThemeEnabled, queryClient }) => {
  const [isAuthError, setIsAuthError] = useState(false)
  const navigate = useNavigate()
  const navigation = useNavigation()

  const isPageLoading = navigation.state === 'loading'

  // temp

  const user = useQuery(userQuery)?.data || {
    email: 'test@test.com',
    lastName: 'Gigglepants',
    location: 'Laughterland',
    name: 'Chuckleberry',
    role: 'user',
  }

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  const [activeLeftSidebar, setActiveLeftSidebar] = useState(true)

  const toggleSidebar = (buttonValue) => {
    if (activeLeftSidebar == true) {
      if (buttonValue == 'leftButton') {
        setShowSidebar(!showSidebar)
      }

      if (buttonValue == 'rightButton') {
        if (showSidebar == false) {
          setShowSidebar(true)
        }

        setActiveLeftSidebar(false)
      }
    }
    if (activeLeftSidebar == false) {
      if (buttonValue == 'leftButton') {
        if (showSidebar == false) {
          setShowSidebar(true)
        }

        setActiveLeftSidebar(true)
      }

      if (buttonValue == 'rightButton') {
        setShowSidebar(!showSidebar)
      }
    }
  }

  useEffect(() => {}, [activeLeftSidebar])
  const logoutUser = async () => {
    await customFetch.get('/auth/logout')
    queryClient.invalidateQueries()
    toast.success('Logging out...')
    navigate('/')
  }
  customFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true)
      }
      return Promise.reject(error)
    }
  )
  useEffect(() => {
    if (!isAuthError) return
    logoutUser()
  }, [isAuthError])

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        activeLeftSidebar,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper
        activeLeft={activeLeftSidebar ? 'auto' : null}
        activeRight={activeLeftSidebar ? null : 'auto'}
      >
        {user.name == 'Chuckleberry' ? <Header /> : null}
        <main className="dashboard">
          {activeLeftSidebar ? (
            <div>
              <SmallSidebar />
              <BigSidebar />
            </div>
          ) : null}
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
          {activeLeftSidebar ? null : (
            <div>
              <WhatSidebar />
              <WhatSidebarBig />
            </div>
          )}
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
