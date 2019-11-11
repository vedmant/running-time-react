import axios from 'axios'
import * as config from '../config'

export function checkLogin() {
  return async dispatch => {
    dispatch({ type: 'CHECK_LOGIN' })
    try {
      const res = await axios.get(config.apiPath + 'user/me')
      dispatch({ type: 'CHECK_LOGIN_OK', data: res.data })
    } catch (e) {
      dispatch({ type: 'CHECK_LOGIN_FAIL', error: e })
      throw e
    }
  }
}

export function login(form) {
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

export function logout({ commit }) {
  commit('LOGOUT_OK')

  localStorage.removeItem('access_token')
}

export function register({ commit, dispatch }, form) {
  commit('REGISTER')

  return new Promise((resolve, reject) => {
    axios.post(Config.apiPath + 'auth/register', form)
      .then(
        response => {
          const accessToken = response.data.access_token
          localStorage.setItem('access_token', accessToken)

          commit('REGISTER_OK', { user: response.data.user, accessToken })
          resolve()
        })
      .catch(error => {
        commit('REGISTER_FAIL')
        reject(error.response.data)
      })
  })
}

export function updateProfile({ commit, dispatch }, { id, form }) {
  commit('UPDATE_PROFILE')

  return new Promise((resolve, reject) => {
    axios.post(Config.apiPath + 'user/' + id, { _method: 'PUT', ...form })
      .then(
        response => {
          commit('UPDATE_PROFILE_OK', response.data.user)
          resolve()
        })
      .catch(error => {
        commit('UPDATE_PROFILE_FAIL')
        reject(error.response.data)
      })
  })
}
