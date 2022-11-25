import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Counter() {
    const dispatch = useDispatch()
    const handleIncrement = () => {
        dispatch({ type: 'INCREMENT' })
    }
    const handleDecrement = () => {
        dispatch({ type: 'DECREMENT' })
    }
    const AddByVal = () => {
        dispatch({ type: 'ADDPAYLOAD', payload: 10 })
    }
    return (
        <div className='counter-container'>
            <Header />
            <div className='container'>
                <CounterViewer />
                <div className='counter-btns'>
                    <button onClick={handleDecrement}>-</button>
                    <button onClick={handleIncrement}>+</button>
                    <button onClick={AddByVal}>10</button>
                </div>
            </div>

        </div>
    )
}

export default Counter


export const Header = () => {
    console.log('header rendered')
    return (
        <h1>Counter</h1>
    )
}


export const CounterViewer = () => {
    const counter = useSelector((state) => state.app_counter.counter)
    console.log('CounterViewer rendered')
    return (
        <label className='counter-label'>{counter}</label>
    )
}