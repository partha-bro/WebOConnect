import { useState } from "react"
import ChangePassword from "../components/ChangePassword"
import Profile from "../components/Profile"


const ProfilePage = () => {
  const [isVisible,setIsVisible] = useState(false)

  const changePassword = () => {
    setIsVisible(true)
  }
  const closePopup = () => {
    setIsVisible(false)
  }

  return (
    <>
      <Profile changePassword={changePassword}/>
      { isVisible && <ChangePassword closePopup={closePopup}/> }
    </>
  )
}

export default ProfilePage