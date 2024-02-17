import { create } from 'zustand'
import axios from 'axios'
import * as config from '../config'

export const useEntriesStore = create((set) => ({
  entries: {
    current_page: 1,
    data: [],
  },
  entry: {},

  loadEntries: async (params) => {
    const res = await axios.get(config.apiPath + 'entry', { params })
    set({ entries: res.data.entries })
  },

  loadMoreEntries: async (params) => {
    const res = await axios.get(config.apiPath + 'entry', { params })
    const { data, ...rest } = res.data.entries
    set(state => ({
      entries: {
        data: state.entries.data.concat(data),
        ...rest,
      },
    }))
  },

  storeEntry: async (form) => {
    const res = await axios.post(config.apiPath + 'entry', form)
  },

  updateEntry: async ({ id, form }) => {
    const res = await axios.post(config.apiPath + 'entry/' + id, {
      _method: 'PUT',
      ...form,
    })
  },

  deleteEntry: async (id) => {
    await axios.post(config.apiPath + 'entry/' + id, {
      _method: 'DELETE',
    })
  },
}))
