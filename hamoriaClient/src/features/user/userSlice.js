import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const themes = {
  darkTheme: 'darkTheme',
  default: 'dark-theme',
}

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

// const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)
const initialState = {
  user: { username: 'Chucklebery' },
  isDarkTheme: checkDefaultTheme(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log('login')
    },
    logoutUser: (state) => {
      console.log('logout')
    },
    toggleTheme: (state) => {
      const newDarkTheme = !state.isDarkTheme
      state.isDarkTheme = newDarkTheme
      document.body.classList.toggle('dark-theme', newDarkTheme)
      localStorage.setItem('darkTheme', newDarkTheme)
    },
  },
})

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions

export default userSlice.reducer
