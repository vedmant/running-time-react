import AsyncStorage from '@react-native-community/async-storage'
import devTools from 'remote-redux-devtools'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import reducer from '../reducers'
import Reactotron from '../ReactotronConfig'
import { createLogger } from 'redux-logger'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default function configureStore (onCompletion) {
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger()),
    devTools({
      name: 'RunningTime',
      realtime: true,
      hostname: 'localhost',
      port: 8000,
      suppressConnectErrors: false,
    }),
    Reactotron.createEnhancer(),
  )

  const store = createStore(persistedReducer, enhancer)
  persistStore(store, null, onCompletion)

  return store
}
