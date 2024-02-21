import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as config from '../config'

let tokenInterceptor = null

export function addAxiosToken (token) {
  if (tokenInterceptor !== null) { axios.interceptors.request.eject(tokenInterceptor) }

  console.log('addAxiosToken', token)

  tokenInterceptor = axios.interceptors.request.use(
    function (config) {
      config.headers = {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json',
      }
      return config
    }
  )

  console.log(tokenInterceptor)
}

export const useAuthStore = create(persist((set, get) => ({
    me: null, // Logged in user
    accessToken: null,

    setAxios: () => {
      console.log('setAxios')
      console.log(get().accessToken)
      addAxiosToken(get().accessToken)
    },

    checkLogin: async () => {
      console.log('checkLogin')
      try {
        const res = await axios.get(config.apiPath + 'user/me')
        console.log(res.data)
        set({ me: res.data })
        return res.data
      } catch (e) {
        console.log(e)
        get().logout()
        return null
      }
    },

    login: async (form) => {
      const res = await axios.post(config.apiPath + 'auth/login', form)
      set({ me: res.data.user, accessToken: res.data.access_token })
      addAxiosToken(res.data.access_token)
    },

    logout: () => {
      console.log('logout')
      set({ me: null, accessToken: null })
      addAxiosToken(null)
    },

    register: async (form) => {
      const res = await axios.post(config.apiPath + 'auth/register', form)
      set({ me: res.data.user, accessToken: res.data.access_token })
      addAxiosToken(res.data.access_token)
    },

    updateProfile: async (form) => {
      const res = await axios.post(`${config.apiPath}user/${id}`, {
        _method: 'PUT',
        ...form,
      })
      set({ me: res.data.user })
    },
  }),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => AsyncStorage),
  },
))
