import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API } from '../../utils/API'

const initialState = {
    user: {},
    token: '',
    auth: false,
    status: 'idle',
    error: false,
    message: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchToken: (state)=>{
            const token = localStorage.getItem('token')
            if(!token){
                return { ...state, auth: false, message: '' }
            }else{
                return { ...state, auth: true, message: '', token }
            }
        },
        logout: (state)=>{
            localStorage.clear()
            return { ...state, auth: false, message: '', token:'', user: {}}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state,action)=>{
            return { ...state, status:'success',auth:false,  message:action.payload.message }
        })
        builder.addCase(createUser.rejected, (state,action)=>{
            return { ...state, status:'rejected',auth:false, message:action.payload.error }
        })
        builder.addCase(getUser.fulfilled, (state,action)=>{
            return { ...state, status:'success',auth:true, user:action.payload }
        })
        builder.addCase(getUser.rejected, (state,action)=>{
            return { ...state, status:'rejected',auth:false, message:action.payload.error }
        })
        builder.addCase(loginUser.fulfilled, (state,action)=>{
            localStorage.setItem('token', action.payload.token)
            return { ...state, token:action.payload.token ,status:'success',  auth: true, message:action.payload.message }
        })
        builder.addCase(loginUser.rejected, (state,action)=>{
            return { ...state, auth: false, message:action.payload.error, status:'rejected'  }
        })
        builder.addCase(deleteAccount.fulfilled, (state,action)=>{
            localStorage.clear()
            return { ...state, token:'' ,  auth: false, message:action.payload.message, user: {} }
        })
        builder.addCase(deleteAccount.rejected, (state)=>{
            return state
        })
        builder.addCase(changePassword.fulfilled, (state,action)=>{
            localStorage.clear()
            return { ...state, message:action.payload.message, status:'success' }
        })
        builder.addCase(changePassword.rejected, (state,action)=>{
            return { ...state, message:action.payload.error, status:'rejected'  }
        })
    }
})

export const createUser = createAsyncThunk('user/create', async (inputForm,{ rejectWithValue })=>{
        
        try {
            const response = await API.post('/api/user/create', inputForm)
            return response.data
          } catch (err) {
            return rejectWithValue(err.response.data);
          }
}) 
export const getUser = createAsyncThunk('user/get', async (token, { rejectWithValue })=>{
        
        
            if(!token){
                return ''
            }else{
                try {
                const response = await API.get('/api/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                return response.data
            } catch (err) {
                return rejectWithValue(err.response.data);
            }
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
export const deleteAccount = createAsyncThunk('user/delete', async (userId,{ rejectWithValue })=>{
        
    try {
        const response = await API.delete('/api/user/delete', { data: { id:userId }})
        return response.data
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
})
export const changePassword = createAsyncThunk('user/changePassword', async (form,{ dispatch, rejectWithValue })=>{
        
    try {
        const response = await API.patch('/api/user/changePassword', form )
        if(response.statusText === 'OK'){
            dispatch(logout())
            return response.data
        }
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
})
export const editUser = createAsyncThunk('user/edit', async (form,{getState, dispatch, rejectWithValue })=>{
        
    try {
        const response = await API.patch('/api/user/edit', form )
        const {user}  = getState()
        dispatch(getUser(user.token))
        return response.data
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
})

export const {logout,fetchToken} = userSlice.actions
export default userSlice.reducer