import { createStore, combineReducers } from 'redux'

const initialCounterState = {
    counter: 0
}

const counterReducer = (state = initialCounterState, action) => {
    if (action.type == 'INCREMENT') {
        return { counter: state.counter + 1 }
    }
    if (action.type == 'DECREMENT') {
        return { counter: state.counter - 1 }
    }
    if (action.type == 'ADDPAYLOAD') {
        return { counter: state.counter + action.payload }
    }
    return state
}

const initialTodoState = {
    todo: [
        {
            title: 'Research a topic interested in',
            completed: true
        },
        {
            title: 'combine reducers in react redux',
            completed: true
        },
        {
            title: 'Watch a classic movie',
            completed: false
        }
    ]
}

const todoReducer = (state = initialTodoState, action) => {
    if (action.type == 'ADD') {
        return { todo: [action.payload, ...state.todo] }
    }
    if (action.type == 'REMOVE') {
        const RemoveID = action.payload.id
        const newState = state.todo.filter((el, index) => RemoveID != index)
        return { todo: newState }
    }
    if (action.type == 'COMPLETE') {
        const UpdateID = action.payload.id
        const newState = state.todo.map((item, index) => {
            if (UpdateID == index) {
                item.completed = !item.completed
                return item
            }
            return item
        })
        return { todo: newState }
    }
    return state
}


const storeReducer = combineReducers({
    app_counter: counterReducer,
    app_todo: todoReducer
})

const store = createStore(storeReducer)

export default store
