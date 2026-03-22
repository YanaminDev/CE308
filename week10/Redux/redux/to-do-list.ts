import {createSlice , PayloadAction} from '@reduxjs/toolkit'

interface TodoItem {
    id: string,
    title: string,
    completed: boolean
}

interface TodoState {
    todos: TodoItem[]
}

const initialState: TodoState = {
    todos: []
}

const TodoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{title: string}>) => {
            const newTodo: TodoItem = {
                id: Date.now().toString(),
                title: action.payload.title,
                completed: false
            }
            state.todos.push(newTodo)
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(item => item.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(item => item.id !== action.payload)
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter(item => !item.completed)
        }
    }
})

export const {addTodo, toggleTodo, removeTodo, clearCompleted} = TodoSlice.actions
export default TodoSlice.reducer
