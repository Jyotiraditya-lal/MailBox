import {configureStore, createSlice} from '@reduxjs/toolkit'


const initialState= localStorage.getItem('token')
const AuthState={isLoggedin: initialState, idToken: '', UID: ''}
const ExpenseState={description: '', price: 0, category: '', activatePremium: false}
let x=0

const AuthSlice=createSlice({

    name: 'Auth',
    initialState: AuthState,
    reducers: {
        

        login (state,action){

            localStorage.setItem('token', action.payload);
            state.isLoggedin=true;
            state.idToken=action.payload.idToken;
            state.UID=action.payload.UID
            
            
            
        },
        logout(state){
            localStorage.removeItem('token');
            state.isLoggedin=false;
            state.idToken=undefined;
            state.UID=undefined
        }
    }
})

const ExpenseSlice=createSlice({
    name: 'Expense',
    initialState: ExpenseState,
    reducers: {
        description (state,action){
            state.description=action.payload
        },
        price(state,action){
            state.price=action.payload
            x+=state.price
            if(x>10000){
                state.activatePremium=true
            }else{
                state.activatePremium=false
            }
        },
        category(state,action){
            state.category=action.payload
        }
    }
})

const store= configureStore({
    reducer: {Auth: AuthSlice.reducer, Expense: ExpenseSlice.reducer}
})

export const AuthActions=AuthSlice.actions
export const ExpenseActions=ExpenseSlice.actions

export default store