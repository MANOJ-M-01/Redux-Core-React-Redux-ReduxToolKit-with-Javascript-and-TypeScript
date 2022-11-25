import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Todo() {
    return (
        <>
            <Header />
            <AddTodo />
            <TodoList />
        </>
    )
}

export default Todo


export const Header = () => {
    console.log('todo header rendered')
    return (
        <h1 className='todo-title'>Todo</h1>
    )
}


export const AddTodo = () => {
    const [inputVal, setInputVal] = useState('')
    const dispatch = useDispatch()
    console.log('AddTodo rendered')
    const handleAdd = () => {
        if (!inputVal) return
        const newTodo = {
            title: inputVal,
            completed: false
        }
        dispatch({ type: 'ADD', payload: newTodo })
        setInputVal('')
    }
    return (
        <div className='todo-add'>
            <input type='text' value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            <button onClick={handleAdd}>ADD</button>
        </div>
    )
}


export const TodoList = () => {
    const todo = useSelector((state) => state.app_todo.todo)
    const dispatch = useDispatch()
    console.log('TodoList rendered')

    const handleRemove = (id) => {
        dispatch({ type: 'REMOVE', payload: { id: id } })
    }

    const handleComplete = (id) => {
        dispatch({ type: 'COMPLETE', payload: { id: id } })
    }
    return (
        <div className='container todo-container'>
            {todo.length == 0 ? <h1>Empty</h1> :
                <div className='todo-count'>{todo.length}
                </div>
            }
            {todo.map((item, index) => (
                <div key={index} className='todo-item'>
                    <input type='checkbox' checked={item.completed ? true : false} onChange={(e) => handleComplete(index)} />
                    <label className={item.completed ? 'completed' : ''}>{item.title}</label>
                    <button onClick={(e) => handleRemove(index)}>X</button>
                </div>
            ))}
        </div>
    )
}
