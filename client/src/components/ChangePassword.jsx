import { useState,useEffect } from 'react'
import './ChangePassword.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../store/features/userSlice'
import PropTypes from 'prop-types'

const ChangePassword = ({closePopup}) => {

    const dispatch = useDispatch()
    const {user,message} = useSelector(state=>state.user) 
    const [error,setError] = useState('')

    const [form,setForm] = useState({
        id: user._id,
        prevPassword: '',
        newPassword: '',
        cnfPassword: ''
    })

    const formHandler = (e) => {
        setForm(prev=>{
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    } 


    const changePasswordHandler = () => {
        if(!form.prevPassword && !form.newPassword && !form.cnfPassword){
            setError('Please fill the inputs')

            return
        }else{

            if(form.newPassword === form.cnfPassword){
                dispatch(changePassword(form))
            }else{
                setError('Not Match passwords!')

                return
            }
            setError(message || '')
            return
        }
    }

    useEffect(()=>{
        setError(message)
    },[message])

  return (
    <section className='change-password'>
        <div className='input-box'>
            <h1>Change Password</h1>
            <input type='password' name='prevPassword'  placeholder='Previous Password' onChange={formHandler} value={form.prevPassword} required/>
            <input type='password' name='newPassword'  placeholder='New Password' onChange={formHandler} value={form.newPassword} required/>
            <input type='password' name='cnfPassword'  placeholder='Confirm Password' onChange={formHandler} value={form.cnfPassword} required/>
            <div className='btn-box'>
                <button className='btn bg-success text-white' onClick={changePasswordHandler}>Confirm</button>
                <button className='btn bg-danger text-white' onClick={closePopup}>Close</button>
            </div>
            { error && <p style={{color:'red',textAlign:'center'}}>{error}</p>}
        </div>

    </section>
  )
}

ChangePassword.propTypes = {
    closePopup : PropTypes.func
}

export default ChangePassword