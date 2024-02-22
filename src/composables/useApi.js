import merge from 'lodash/merge'
import qs from 'qs'
import * as config from '../config'
import { useAuthStore } from '@/stores/auth'

export default async function (url, options = {}) {
  const token = useAuthStore.getState().accessToken

  if (options.query) {
    url += `?${qs.stringify(options.query, {
      arrayFormat: 'brackets',
      filter: (prefix, value) => value !== null ? value : undefined,
    })}`
    delete options.query
  }

  if (options.body) {
    options.body = JSON.stringify(options.body)
  }

  options = merge({
    headers: {
      cache: 'no-cache',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
  }, options)
  console.log(config.apiPath + url, options)
  const resp = await fetch(config.apiPath + url, options)

  if (resp.status === 401) {
    useAuthStore.getState().logout()
  }

  if (! resp.ok) {
    const err = new Error(`${resp.status} ${resp.statusText}`)
    err.response = resp
    err.response.data = await resp.json()
    throw err
  }

  return await resp.json()
}
