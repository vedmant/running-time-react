import axios from 'axios'
import * as config from '../config'

export function loadEntries(params) {
  return async dispatch => {
    dispatch({ type: 'LOAD_ENTRIES' })

    try {
      const res = await axios.get(config.apiPath + 'entry', { params })
      dispatch({ type: 'LOAD_ENTRIES_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'LOAD_ENTRIES_FAIL', error: e })
      throw e
    }
  }
}

export function loadMoreEntries(params) {
  return async dispatch => {
    dispatch({ type: 'LOAD_MORE_ENTRIES' })

    try {
      const res = await axios.get(config.apiPath + 'entry', { params })
      dispatch({ type: 'LOAD_MORE_ENTRIES_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'LOAD_MORE_ENTRIES_FAIL', error: e })
      throw e
    }
  }
}

export function loadEntry(id) {
  return async dispatch => {
    dispatch({ type: 'LOAD_ENTRY' })

    try {
      const res = await axios.get(config.apiPath + 'entry/' + id)
      dispatch({ type: 'LOAD_ENTRY_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'LOAD_ENTRY_FAIL', error: e })
      throw e
    }
  }
}

export function storeEntry(form) {
  return async dispatch => {
    dispatch({ type: 'STORE_ENTRY' })

    try {
      const res = await axios.post(config.apiPath + 'entry', form)
      dispatch({ type: 'STORE_ENTRY_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'STORE_ENTRY_FAIL', error: e })
      throw e
    }
  }
}

export function updateEntry({ id, form }) {
  return async dispatch => {
    dispatch({ type: 'UPDATE_ENTRY' })

    try {
      const res = await axios.post(config.apiPath + 'entry/' + id, { _method: 'PUT', ...form })
      dispatch({ type: 'UPDATE_ENTRY_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'UPDATE_ENTRY_FAIL', error: e })
      throw e
    }
  }
}

export function deleteEntry(id) {
  return async dispatch => {
    dispatch({ type: 'DELETE_ENTRY' })

    try {
      const res = await axios.post(config.apiPath + 'entry/' + id, { _method: 'DELETE' })
      dispatch({ type: 'DELETE_ENTRY_OK', data: { id } })
    } catch (e) {
      dispatch({ type: 'DELETE_ENTRY_FAIL', error: e })
      throw e
    }
  }
}
