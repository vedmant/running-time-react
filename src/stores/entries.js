import { create } from 'zustand'
import useApi from '@/composables/useApi'

export const useEntriesStore = create((set) => ({
  entries: {
    current_page: 1,
    data: [],
  },
  entry: {},

  loadEntries: async (params) => {
    const res = await useApi('/entry', { query: params })
    set({ entries: res.entries })
  },

  loadMoreEntries: async (params) => {
    const res = await useApi('/entry', { query: params })
    const { data, ...rest } = res.entries
    set(state => ({
      entries: {
        data: state.entries.data.concat(data),
        ...rest,
      },
    }))
  },

  storeEntry: async (form) => {
    const res = await useApi('/entry', { method: 'POST', body: form })
  },

  updateEntry: async ({ id, form }) => {
    const res = await useApi('/entry/' + id, {
      method: 'PUT',
      body: form,
    })
  },

  deleteEntry: async (id) => {
    await useApi('/entry/' + id, {
      method: 'DELETE',
    })
  },
}))
