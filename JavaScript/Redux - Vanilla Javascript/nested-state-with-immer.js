const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const produce = require('immer').produce


/*
Redux Toolkit Tutorial - 13 - Immer
https://youtu.be/kgCjXjJkZ-Y?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3&t=302

*/
const ActionType = {
    UpdateStreet: 'UpdateStreet'
}


const initialState = {
    name: 'John Doe',
    address: {
        street: 'Waterloo',
        city: 'southampton',
        state: 'Hampshire'
    }
}

const updateStreet = (new_street) => {
    return {
        type: ActionType.UpdateStreet,
        payload: new_street
    }
}

const profileReducers = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case ActionType.UpdateStreet: {

            /*
            eliminate the use of spread we use immerse immutable to mutable
            */
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: payload
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = payload
            })
        }
        default: {
            return state
        }
    }
}


const store = createStore(profileReducers)


console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('updated state', store.getState())
})

const actions = bindActionCreators({ updateStreet }, store.dispatch)

actions.updateStreet('South London')

unsubscribe()