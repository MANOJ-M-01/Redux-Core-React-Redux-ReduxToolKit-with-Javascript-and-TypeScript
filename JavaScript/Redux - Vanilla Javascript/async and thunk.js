const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunk = require('redux-thunk').default
const axios = require('axios')

/*
Redux Toolkit Tutorial - 15 - Async Actions
https://youtu.be/uN-gpihDQRE?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3
Redux Toolkit Tutorial - 16 - Redux Thunk Middleware
https://youtu.be/SA47gYlL2oQ?list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3
*/
const initialState = {
    loading: false,
    data: [],
    error: false,
    error_message: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'


function fetchUserRequested() {
    return {
        type: FETCH_USERS_REQUESTED
    }

}

function fetchUserSucceeded(user_data) {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: user_data
    }

}

function fetchUserfailed(error) {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const fetchuserReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case FETCH_USERS_REQUESTED: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_USERS_SUCCEEDED: {
            return {
                ...state,
                loading: false,
                data: payload
            }
        }
        case FETCH_USERS_FAILED: {
            return {
                ...state,
                loading: false,
                error: true,
                error_message: payload
            }
        }
    }
}

const fetchUser = () => {
    return (dispatch) => {
        dispatch(fetchUserRequested())
        axios.get('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => {
                dispatch(fetchUserSucceeded(res.data))
            }).catch((err) => {
                dispatch(fetchUserfailed(err.message))
            })
    }
}


const store = createStore(fetchuserReducer, applyMiddleware(thunk))



store.subscribe(() => {
    console.log("fetch Data", store.getState());
})


store.dispatch(fetchUser())