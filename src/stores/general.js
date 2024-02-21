import { create } from 'zustand'
import useApi from '@/composables/useApi'

export const useGeneralStore = create((set) => ({
  loading: true,
  dashboard: {},

  loadDashboard: async (params) => {
    const res = await useApi('/dashboard/data')
    set({ dashboard: res.data })
  },
}))
