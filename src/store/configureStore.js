import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import reducer from '../reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default function configureStore (onCompletion) {
  const enhancer = compose(applyMiddleware(thunk))

  const store = createStore(persistedReducer, enhancer)
  persistStore(store, null, onCompletion)

  return store
}
