import { createSlice, createAction  } from '@reduxjs/toolkit'

const addTodo = createAction('todo/addTodo')


const initialState = [
    { id: 1, name: "do st", completed: false, priority: 'low' },
    { id: 1, name: "do st", completed: false, priority: 'low' },
    { id: 1, name: "do st", completed: false, priority: 'low' },
    { id: 1, name: "do st", completed: false, priority: 'low' },
]
export const todoListReducer = createSlice({
    name: 'todoListReducer',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(addTodo, (state, action) => {
            return state + action.payload
        })
    },
})