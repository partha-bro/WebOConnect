import { useEffect, useState } from 'react'
import { deleteAccount, fetchToken } from '../store/features/userSlice'
import './Profile.scss'
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Profile = ({changePassword}) => {
  const {user} = useSelector(state=>state.user)
  const [profileImage,setProfileImage] = useState('https://www.w3schools.com/howto/img_avatar.png')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteAccountHandler = (id) => {
    dispatch(deleteAccount(id))
    
  }

  useEffect(()=>{
    dispatch(fetchToken())
    setProfileImage(user.profile_pic)
  },[dispatch,user])

  
  return (
    <section className='profile-section'>
        <div className='img-box'>
            <img src={`/${profileImage}`} />
        </div>
        <div className='details'>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            <p>Phone: {user.phone}</p>
            <p>status: {user.status}</p>
        </div>
        <div className='btn-box'>
            <button className='bg-warning' onClick={()=>navigate('/edit')}>Edit Profile</button>
            <button className='bg-primary' onClick={changePassword}>Password Change</button>
            <button className='bg-danger' onClick={()=>deleteAccountHandler(user._id)}>Delete Account</button>
        </div>
    </section>
  )
}

export default Profile