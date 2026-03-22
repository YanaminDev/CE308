import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './counterSlice'
import marketReducer from './market'
import todoReducer from './to-do-list'



export const store = configureStore({
    reducer : {
        counter : counterReducer,
        market : marketReducer,
        todos : todoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

