import { create } from 'zustand'
import axios from 'axios'
import * as config from '../config'

export const useAuthStore = create((set) => ({
  me: null, // Logged in user
  accessToken: null,
  authChecked: false,

  checkLogin: async () => {
    const res = await axios.get(config.apiPath + 'user/me')
    set({ user: res.data })
  },

  login: async (form) => {
    const res = await axios.post(config.apiPath + 'auth/login', form)
    set({ user: res.data.user, accessToken: res.data.access_token })
  },
}))
