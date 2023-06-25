import { BrowserRouter,  Navigate,  Route, Routes} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import ProfilePage from './pages/ProfilePage'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchToken } from './store/features/userSlice'
import { getUser } from './store/features/userSlice'
import EditProfile from './pages/EditProfile'


function App() {
  const dispatch = useDispatch()
  const {user,token,auth} = useSelector(state=>state.user)

  useEffect(
    ()=>{
      dispatch(fetchToken())
      dispatch(getUser(token))
    },[dispatch,token]
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user && auth ? <Layout /> : <Navigate to={'/login'} />} >
          <Route index element={<Home />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='edit' element={<EditProfile />} />
        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={user && auth ? <Navigate to={'/'} /> : <Login/>} />
        
        <Route path='*' element={'No Route exists!'} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
