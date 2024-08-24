import { applyMiddleware, createStore } from "redux"
import { rootreducers } from "./Reduce"
import { thunk } from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const configStore = () => {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: ['facilities']
    }

    const persistedReducer = persistReducer(persistConfig, rootreducers)
    const store = createStore(persistedReducer, applyMiddleware(thunk))

    let persistor = persistStore(store)
    return { store, persistor }
}