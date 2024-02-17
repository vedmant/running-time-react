import { create } from 'zustand'
import axios from 'axios'
import * as config from '../config'

function addAxiosToken (token) {
  // Authorization header
  axios.interceptors.request.use(
    function (config) {
      config.headers = {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      }
      return config
    },
    error => Promise.reject(error),
  )
}

export const useAuthStore = create((set) => ({
  me: null, // Logged in user
  accessToken: null,
  authChecked: false,

  checkLogin: async () => {
    const res = await axios.get(config.apiPath + 'user/me')
    set({ me: res.data })
  },

  login: async (form) => {
    const res = await axios.post(config.apiPath + 'auth/login', form)
    set({ me: res.data.user, accessToken: res.data.access_token })
    addAxiosToken(res.data.access_token)
  },

  logout: () => {
    set({ me: null })
  },

  register: async (form) => {
    const res = await axios.post(config.apiPath + 'auth/register', form)
    set({ me: res.data.user, accessToken: res.data.access_token })
  },

  updateProfile: async (form) => {
    const res = await axios.post(`${config.apiPath}user/${id}`, {
      _method: 'PUT',
      ...form,
    })
    set({ me: res.data.user })
  },
}))
