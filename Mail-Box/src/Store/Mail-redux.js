import { createSlice,configureStore } from '@reduxjs/toolkit'

const AuthState={
    isLoggedin: localStorage.getItem('token'), 
    idToken: '', UID: '', 
    FromMail: localStorage.getItem('FromMail'),
    toMail: localStorage.getItem('toMail'),
}

const AuthSlice= createSlice({
    name: 'Auth',
    initialState: AuthState,
    reducers: {
        login(state,action){
            localStorage.setItem('token', action.payload);
            state.isLoggedin=true
            state.idToken=action.payload.idToken
            state.UID=action.payload.UID
            localStorage.setItem('FromMail',action.payload.mail)
            state.FromMail=action.payload.mail
            
        },
        logout(state){
            localStorage.removeItem('token');
            localStorage.removeItem('FromMail')
            state.isLoggedin=false;
            state.idToken=undefined;
            state.UID=undefined
            state.FromMail=undefined
            state.toMail=undefined
        },
        MailDetails(state,action){
            localStorage.setItem('toMail', action.payload)
            state.toMail=action.payload
        },
    
    }
})

const store=configureStore({
    reducer: {Auth: AuthSlice.reducer}
})

export const AuthActions= AuthSlice.actions
export default store