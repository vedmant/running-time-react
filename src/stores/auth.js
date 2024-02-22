import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist, createJSONStorage } from 'zustand/middleware'
import useApi from '@/composables/useApi'

export const useAuthStore = create(persist((set, get) => ({
    me: null, // Logged in user
    accessToken: null,

    checkLogin: async () => {
      console.log('checkLogin')
      try {
        const res = await useApi('/user/me')
        console.log(res)
        set({ me: res })
        return res
      } catch (e) {
        console.log(e)
        get().logout()
        return null
      }
    },

    login: async (form) => {
      const res = await useApi('/auth/login', { method: 'POST', body: form })
      set({ me: res.user, accessToken: res.access_token })
    },

    logout: () => {
      console.log('logout')
      set({ me: null, accessToken: null })
    },

    register: async (form) => {
      const res = await useApi('auth/register', { body: form })
      set({ me: res.user, accessToken: res.access_token })
    },

    updateProfile: async ({ id, form }) => {
      const res = await useApi(`/user/${id}`, { method: 'PUT', body: form })
      set({ me: res.user })
    },
  }),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => AsyncStorage),
  },
))
