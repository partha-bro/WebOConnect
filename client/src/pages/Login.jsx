import { Link } from 'react-router-dom'
import './Login.scss'
import {  useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/features/userSlice'

const Login = () => {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    const [error,setError] = useState('')
    const [ form, setForm ] = useState({
        email: '',
        password: ''
    })

    const formHandler = (e) => {
        setForm((prev)=>{
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    const loginHandler = () => {
        if(!form.email && !form.password){
            setError('Please fill the inputs')
            return
        }else{
            dispatch(loginUser(form))
            setError(user.message)
        }
    }

    useEffect(()=>{
        setError(user.message)
    },[user.message])

  return (
    <section className='login-section'>
        <div className='login-box'>
            <h1>Login</h1>
            <div className='login-input'>
                <input type='email' name='email' placeholder='Email' value={form.email} onChange={formHandler} required/>
                <input type='password' name='password' placeholder='Password' value={form.password} onChange={formHandler} required/>
                <button className='btn' onClick={loginHandler}>Login</button>
            </div>
            <h5><Link to={'/register'} >Click here for Sign Up</Link></h5>
            { error && <p style={{color:'red'}}>{error}</p>}
        </div>
    </section>
  )
}

export default Login