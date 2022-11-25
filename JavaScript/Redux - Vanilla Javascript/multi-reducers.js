const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const bindActionCreators = redux.bindActionCreators

// redux-logger will give clean logger
// https://youtu.be/rRtM82jBQJo?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3
// Redux Toolkit Tutorial - 14 - Middleware
const applyMiddleware = redux.applyMiddleware
// if TypeError: middleware is not a function
// https://stackoverflow.com/questions/46869671/typeerror-middleware-is-not-a-function
const reduxlogger = require('redux-logger')
const logger = reduxlogger.createLogger({});


const initialIcecreamState = {
    icecream_count: 10
}

const initialCakeState = {
    cake_count: 10
}


const IcreamActionType = {
    ORDER: 'OrderIcecream',
    RESTOCK: 'RestockIcecream'
}


const CakeActionType = {
    ORDER: 'OrderCake',
    RESTOCK: 'RestockCake'
}

const icecreamReducer = (state = initialIcecreamState, action) => {
    const { type, payload } = action
    switch (type) {
        case IcreamActionType.ORDER: {
            if (state.icecream_count < payload) {
                return { icecream_count: 0 }
            }
            return {
                icecream_count: state.icecream_count - payload
            }
        }
        case IcreamActionType.RESTOCK: {
            return {
                icecream_count: state.icecream_count + payload
            }
        }
        default: {
            return state
        }
    }
}

const cakeReducer = (state = initialCakeState, action) => {
    const { type, payload } = action
    switch (type) {
        case CakeActionType.ORDER: {
            if (state.cake_count < payload) {
                return { cake_count: 0 }
            }
            return {
                cake_count: state.cake_count - payload
            }
        }
        case CakeActionType.RESTOCK: {
            return {
                cake_count: state.cake_count + payload
            }
        }
        default: {
            return state
        }
    }
}

const rootReducers = combineReducers({
    app_icecream_shop: icecreamReducer,
    app_cake_shop: cakeReducer
})

const store = createStore(rootReducers, applyMiddleware(logger))


console.log('initial state ', store.getState())

const unsubscribe = store.subscribe(() => {
    /*
    console.log('====================================')
    console.log('updated state', store.getState())
    console.log('====================================')
    */
})

function orderCake(count) {
    return {
        type: CakeActionType.ORDER,
        payload: count
    }
}

function restockCake(count) {
    return {
        type: CakeActionType.RESTOCK,
        payload: count
    }
}

function orderIcecream(count) {
    return {
        type: IcreamActionType.ORDER,
        payload: count
    }
}

function restockIcecream(count) {
    return {
        type: IcreamActionType.RESTOCK,
        payload: count
    }
}


const actions = bindActionCreators({ orderCake, restockCake, orderIcecream, restockIcecream }, store.dispatch)

actions.orderCake(3)
actions.orderCake(3)
actions.orderCake(3)
actions.restockCake(5)
actions.orderCake(3)
actions.orderIcecream(3)
actions.restockIcecream(15)
unsubscribe()