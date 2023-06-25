import { Link } from 'react-router-dom'
import './Login.scss'
import {  useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../store/features/userSlice'

const Register = () => {
    const dispatch = useDispatch()
    const [error,setError] = useState('')
    const user = useSelector(state=>state.user)
    const [ form, setForm ] = useState({
        name: '',
        email: '',
        gender: '',
        phone: '',
        password: '',
        status: 'pending',
        profile_pic: ''
    })

    const formHandler = (e) => {
        setForm((prev)=>{
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    const registerHandler = () => {
        if(!form.name && !form.email && !form.password){
            setError('Please fill the inputs')
            return
        }else{
            if(form.name.length < 3){
                setError('Name must be more than 2 chars!')
                return
            }else if(form.password.length < 6){
                setError('Password must be more than 5 length!')
                return
            }else if(form.phone.length < 10){
                setError('Phone must be more than 10 number!')
                return
            }else{
                const formData = new FormData()
                formData.append('name', form.name)
                formData.append('email', form.email)
                formData.append('gender', form.gender)
                formData.append('phone', form.phone)
                formData.append('password', form.password)
                formData.append('status', form.status)
                formData.append('profile_pic', form.profile_pic)
                dispatch(createUser(formData))
                setError(user.message)
            }

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useEffect(()=>{
        setError(user.message)
    },[user.message])

  return (
    <section className='login-section'>
        <div className='login-box'>
            <h1>Sign Up</h1>
            <form className='login-input' onSubmit={submitHandler} encType='form-data'>
                <input type='text' name='name' placeholder='Name' value={form.name} onChange={formHandler} required/>
                <input type='email' name='email' placeholder='Email' value={form.email} onChange={formHandler} required/>
                <select name='gender' value={form.gender} onChange={formHandler}>
                    <option>Select your gender</option>
                    <option value={'male'}>Male</option>
                    <option value={'female'}>Female</option>
                    <option value={'other'}>Other</option>
                </select>
                <input type='number' name='phone' placeholder='Phone' value={form.phone} pattern='/[0-9]{10}/' max={10} min={10} onChange={formHandler} />
                <input type='password' name='password' placeholder='Password' value={form.password} onChange={formHandler} required/>
                <select name='status' value={form.status} onChange={formHandler}>
                    <option value={'pending'}>pending</option>
                    <option value={'active'}>active</option>
                    <option value={'deActive'}>de-active</option>
                </select>
                <input type='file' name='profile_pic' onChange={(e)=>setForm(prev=>{return{...prev, profile_pic:e.target.files[0]}})}/>
                <button className='btn' onClick={registerHandler}>Register</button>
            </form>
            <h5><Link to={'/login'} >Click here for Login</Link></h5>
            { error && <p style={{color:'red',textAlign:'center'}}>{error}</p>}
        </div>
    </section>
  )
}

export default Register