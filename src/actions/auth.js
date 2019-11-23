import axios from 'axios'
import * as config from '../config'

export function checkLogin () {
  return async dispatch => {
    dispatch({ type: 'CHECK_LOGIN' })

    await new Promise(resolve => setTimeout(resolve, 1000))
    try {
      const res = await axios.get(config.apiPath + 'user/me')
      dispatch({ type: 'CHECK_LOGIN_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'CHECK_LOGIN_FAIL', error: e })
      throw e
    }
  }
}

export function login (form) {
  return async dispatch => {
    dispatch({ type: 'LOGIN' })
    try {
      const res = await axios.post(config.apiPath + 'auth/login', form)
      dispatch({ type: 'LOGIN_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'LOGIN_FAIL', error: e })
      throw e
    }
  }
}

export function logout () {
  return { type: 'LOGOUT_OK' }
}

export function register (form) {
  return async dispatch => {
    dispatch({ type: 'REGISTER' })
    try {
      const res = await axios.post(config.apiPath + 'auth/register', form)
      dispatch({ type: 'REGISTER_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'REGISTER_FAIL', error: e })
      throw e
    }
  }
}

export function updateProfile ({ id, form }) {
  return async dispatch => {
    dispatch({ type: 'UPDATE_PROFILE' })
    try {
      const res = await axios.post(`${config.apiPath}user/${id}`, {
        _method: 'PUT',
        ...form,
      })
      dispatch({ type: 'UPDATE_PROFILE_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'UPDATE_PROFILE_FAIL', error: e })
      throw e
    }
  }
}
