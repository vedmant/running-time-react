import { create } from 'zustand'
import axios from 'axios'
import * as config from '../config'

export const useGeneralStore = create((set) => ({
  loading: true,
  dashboard: {},

  loadDashboard: async (params) => {
    const res = await axios.get(config.apiPath + 'dashboard/data')
    set({ dashboard: res.data })
  },
}))
