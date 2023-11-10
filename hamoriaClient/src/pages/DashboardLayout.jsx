import { Outlet, useNavigation } from 'react-router-dom'

import Wrapper from '../assets/wrappers/Dashboard'
import { Navbar, BigSidebar, SmallSidebar } from '../components'

import { useState, createContext, useContext, useEffect } from 'react'

import { redirect, useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Loading } from '../components'
import { useQuery } from '@tanstack/react-query'

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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
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

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
