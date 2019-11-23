import axios from 'axios'
import * as config from '../config'

export function stopLoading () {
  return { type: 'STOP_LOADING' }
}

export function loadDashboard () {
  return async dispatch => {
    dispatch({ type: 'LOAD_DASHBOARD' })

    try {
      const res = await axios.get(config.apiPath + 'dashboard/data')
      dispatch({ type: 'LOAD_DASHBOARD_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'LOAD_DASHBOARD_FAIL', error: e })
      throw e
    }
  }
}
