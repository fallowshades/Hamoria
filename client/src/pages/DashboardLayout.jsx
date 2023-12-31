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

import { Loading, Footer } from '../components'
import { useQuery } from '@tanstack/react-query'
import { Header, WhatSidebar, WhatSidebarBig } from '../components'

import { useDispatch } from 'react-redux'
import { toggleTheme } from '../features/user/userSlice'

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    //const { data } = await customFetch.get('/users/current-user')

    return null
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
const DashboardLayout = ({
  isDarkThemeEnabled,
  queryClient,
  isLeftSidebarEnabled,
}) => {
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
  const dispatch = useDispatch()
  const toggleDarkTheme = () => {
    dispatch(toggleTheme())
  }

  const [activeLeftSidebar, setActiveLeftSidebar] =
    useState(isLeftSidebarEnabled)

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
        localStorage.setItem('isLeftSidebarActive', 'false')
      }
    }
    if (activeLeftSidebar == false) {
      if (buttonValue == 'leftButton') {
        if (showSidebar == false) {
          setShowSidebar(true)
        }

        setActiveLeftSidebar(true)
        localStorage.setItem('isLeftSidebarActive', 'true')
      }

      if (buttonValue == 'rightButton') {
        setShowSidebar(!showSidebar)
      }
    }
  }

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

  const [showCurriculum, setShowCurriculum] = useState(false)
  const [showCourses, setShowCourses] = useState({ no: false, so: false })
  const [showParts, setShowPart] = useState(false)
  const toggleCourses = (course) => {
    setShowCourses((prevState) => ({
      ...prevState,
      [course]: !showCourses[course],
    }))
    console.log(showCourses[course])
  }
  const resetCourses = () => {
    setShowCourses((prevState) => {
      // Create a new object with the same keys as showCourses
      const resetState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false
        return acc
      }, {})
      return resetState
    })
  }

  const toggleCurriculum = () => {
    setShowCurriculum(!showCurriculum)

    if (showCurriculum) resetCourses()
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        activeLeftSidebar,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
        toggleCourses,
        showCourses,
        toggleCurriculum,
        showCurriculum,
        showParts,
        setShowPart,
      }}
    >
      <Wrapper
        activeLeft={activeLeftSidebar ? 'auto' : null}
        activeRight={activeLeftSidebar ? null : 'auto'}
      >
        {user.name == 'Chuckleberry' ? <Header /> : null}
        <main className="dashboard">
          {activeLeftSidebar ? (
            <>
              <SmallSidebar />
              <BigSidebar />
            </>
          ) : null}
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
          {activeLeftSidebar ? null : (
            <>
              <WhatSidebar />
              <WhatSidebarBig />
            </>
          )}
        </main>
        <Footer />
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
