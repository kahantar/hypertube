import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from './reducers/indexReducers'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['warningReducers', 'allMovies', 'mailSent', 'errLogin', 'infoProfil', 'filterMovies']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default () => {
  let store = createStoreWithMiddleware(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}