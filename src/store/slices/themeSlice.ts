import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  theme: ThemeMode
  primaryColor: string
  collapsed: boolean
}

const initialState: ThemeState = {
  theme: 'light',
  primaryColor: '#1890ff',
  collapsed: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload
    },
    toggleSidebar: (state) => {
      state.collapsed = !state.collapsed
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload
    },
  },
})

export const { toggleTheme, setTheme, setPrimaryColor, toggleSidebar, setSidebarCollapsed } = themeSlice.actions
export default themeSlice.reducer
