import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from '../../utils/API'

const initialState = {
    token: '',
    auth: false,
    error: false,
    message: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchToken: (state)=>{
            const token = localStorage.getItem('token')
            if(!token){
                return { ...state, auth: false, message: '', token }
            }else{
                return { ...state, auth: true, message: '', token }
            }
        },
        logout: (state)=>{
            localStorage.clear()
            return { ...state, auth: false, message: '', token:''}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state,action)=>{
            localStorage.setItem('token', action.payload.token)
            return { ...state, token:action.payload.token ,  auth: true, message:action.payload.message }
        })
        builder.addCase(loginUser.rejected, (state,action)=>{
            return { ...state, auth: false, message:action.payload.error }
        })
    }
})

export const loginUser = createAsyncThunk('user/login', async (inputForm,{ rejectWithValue })=>{
        
    try {
        const response = await API.post('/api/user/login', inputForm)
        return response.data
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
}) 

export const { logout,fetchToken } = authSlice.actions
export default authSlice.reducer