// import { createStore } from 'redux' 
const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

console.log('app Loaded')
/*
Redux Toolkit Tutorial - 6 - Reducers
https://youtu.be/fy2FHo-iXDE?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3
*/


const counterReducer = (state = { counter: 0 }, action) => {
    const { type, payload } = action
    switch (type) {
        case 'INC': {
            return { counter: state.counter + 1 }
        }
        case 'DEC': {
            return { counter: state.counter - 1 }
        }
        case 'ADDBY': {
            return { counter: state.counter + payload }
        }
        default: {
            return state
        }
    }
}

const store = createStore(counterReducer)

// Action Creator
function IncreamentCounter() {
    return {
        type: 'INC'
    }
}

function DecreamentCounter() {
    return {
        type: 'DEC'
    }
}

function AddByCounter(num) {
    return {
        type: 'ADDBY',
        payload: num
    }
}


console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('Update state', store.getState())
})


/*
// method 1
store.dispatch(IncreamentCounter()) //1
store.dispatch(DecreamentCounter()) //0
store.dispatch(IncreamentCounter()) //1
store.dispatch(AddByCounter(10)) //11 //action creator (will help code correction in one place)
store.dispatch({ type: 'DEC' }) //10 // action object directly
*/

/*
Redux Toolkit Tutorial - 9 - Bind Action Creators
https://youtu.be/1Hp8ATFL_fc?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&t=96
*/
// method 2
const actions = bindActionCreators({ IncreamentCounter, DecreamentCounter, AddByCounter }, store.dispatch)
actions.IncreamentCounter()
actions.DecreamentCounter()
actions.IncreamentCounter()
actions.AddByCounter(10)
actions.DecreamentCounter() //10


unsubscribe()