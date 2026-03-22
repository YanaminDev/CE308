import {createSlice , PayloadAction} from '@reduxjs/toolkit'

interface CartItem{
    id : string,
    name : string ,
    quantity : number,
    price : number
}

interface CartState{
    items : CartItem[],
    totalAmount : number
}

const initialState : CartState = {
    items : [],
    totalAmount : 0
}



const  MarketSlice = createSlice({
    name : 'market',
    initialState ,
    reducers:{
        addItem : (state , action : PayloadAction<CartItem>)=>{
            state.items.push(action.payload)
            state.totalAmount += action.payload.price * action.payload.quantity
        },
        removeItem : (state,action : PayloadAction<string>) => {
            const item = state.items.find(item => item.id === action.payload)
            if (item) {
                state.totalAmount -= item.price * item.quantity
            }
            state.items = state.items.filter(item => item.id !== action.payload)
        },

        clearCart : (state) => {
            state.items = []
            state.totalAmount = 0
        }
    }
})

export const {addItem , removeItem , clearCart} = MarketSlice.actions;
export default MarketSlice.reducer;