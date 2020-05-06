import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import userReducer from './user.reducer'
import orgReducer from './org.reducer'
import goodsReducer from './goods.reducer'
import supplierReducer from './supplier.reducer'

let $store = null

const createReducer = (asyncReducers = {}) => combineReducers({
    user: userReducer,
    org: orgReducer,
    good: goodsReducer,
    supplier: supplierReducer,
    ...asyncReducers,
})

const loggerMiddleware = ({ getState }) => (next) => (action) => {
    // if (action.type === 'FETCH_START' || action.type === 'FETCH_STOP') return next(action)
    console.group(action.type)
        console.log(action)
        console.log(getState())
    console.groupEnd(action.type)
    return next(action)
}


/**
 * 初始化store，添加注入reducer方法
 * @param {object} initialState 
 * @return createStore()
 */
const initStore = (initialState) => {

    const isDev = process.env.NODE_ENV === 'development'

    // const composeEnhancers = isDev ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
    const store = createStore(
        createReducer(),
        initialState,
        applyMiddleware(loggerMiddleware)
    )
    store.asyncReducers = {}

    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer
        store.replaceReducer(createReducer(store.asyncReducers))
    }
    $store = store
    return store
}

const getStore = () => {
    const store = $store || {}

    try {
        store.getState()
    } catch (e) {
        alert('请先调用initStore函数初始化')
    }

    return store
}

export {
    initStore,
    getStore,
}
