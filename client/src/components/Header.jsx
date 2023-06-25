import { NavLink, useNavigate } from "react-router-dom";
import './Header.scss'
import { useDispatch } from "react-redux";
import { logout } from "../store/features/userSlice";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header>
        <div className="nav-bar">
            <div className="logo">
                <h1>LOGO</h1>
            </div>
            <ul className="nav-links">
                <li><NavLink to='/' >Home</NavLink></li>
                <li><NavLink to='/profile' >Profile</NavLink></li>
                <li><button onClick={logoutHandler}>Logout</button></li>
            </ul>
        </div>
    </header>
        
  )
}

export default Header;
