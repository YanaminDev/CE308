import React from 'react'
import {Provider} from 'react-redux'
import {store} from '../redux/store'
import CounterScreen from '../screens/CounterScreen'
import MarketScreen from "../app/market"
import TodoScreen from "../app/todo"

export default function App(){
  return(
    <Provider store={store}>
      <TodoScreen/>
    </Provider>
  )
}