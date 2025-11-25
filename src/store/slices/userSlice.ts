import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfo {
  id: string
  username: string
  email?: string
  avatar?: string
  roles?: string[]
  name?: string
  role?: string
  permissions?: string[]
}

interface LoginPayload {
  username: string
  token: string
  permissions?: string[]
  userInfo?: Partial<UserInfo>
}

interface UserState {
  userInfo: UserInfo | null
  token: string | null
  isLoggedIn: boolean
}

const initialState: UserState = {
  userInfo: null,
  token: null,
  isLoggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { username, token, permissions, userInfo } = action.payload
      state.userInfo = {
        id: Date.now().toString(),
        username,
        permissions,
        ...userInfo,
      }
      state.token = token
      state.isLoggedIn = true
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
      state.isLoggedIn = true
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.userInfo = null
      state.token = null
      state.isLoggedIn = false
    },
  },
})

export const { login, setUserInfo, setToken, logout } = userSlice.actions
export default userSlice.reducer
