import "../assets/css/topbar.css"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Dropdown, { DropdownItem, DropdownNotifications } from './Dropdown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../store/user/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import path from "../ultils/path";

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () =>{
    dispatch(logout());
    navigate(`${path.LOGIN}`);
    toast.success("Logout sucessful!");
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
          <Dropdown trigger={
            <div className="topbarIconsContainer">
              <NotificationsNoneIcon/>
              <span className="topIconBadge">2</span>
            </div>}>
            <h6 className='topRightNotifications'>Notifications</h6>
            <DropdownNotifications isRead="isRead">
              <img className="topRightInfoImg" src={require('../assets/images/Logo.png')} alt='' />
              <div className="topRightNotificationsContainer">
                <p className="topRightNotificationsTitle">Khắc phục lỗi cài đặt Page Ruler Redux</p>
                <span className="topRightNotificationsTime">8 months</span>
              </div>
            </DropdownNotifications>
            <DropdownNotifications>
              <img className="topRightInfoImg" src={require('../assets/images/Logo.png')} alt='' />
              <div className="topRightNotificationsContainer">
                <p className="topRightNotificationsTitle">Khắc phục lỗi cài đặt Page Ruler Redux</p>
                <span className="topRightNotificationsTime">8 months</span>
              </div>
            </DropdownNotifications>
          </Dropdown>
          <Dropdown trigger={<img className="topAvatar" src="https://hdwallpaperim.com/wp-content/uploads/2017/08/22/103013-blue_hair-anime-748x421.jpg" alt="avatar" />}>
            <DropdownItem>
              <img className="topRightInfoImg" src="https://hdwallpaperim.com/wp-content/uploads/2017/08/22/103013-blue_hair-anime-748x421.jpg" alt="avatar" />
              <div className="topRightInfoUser">
                <p className="topRightInfoUserName">{user?.fullName}</p>
                <span className="topRightInfoEmail">Welcome back!</span>
              </div>
            </DropdownItem>
            <hr />
            <DropdownItem><AccountCircleIcon size={20} /><Link className="DropdownItemUserProfile" to="/dashboard/userprofile">My Profile</Link></DropdownItem>
            <DropdownItem><div className="TopbarDropdownItem" onClick={() => handleLogout()}><LogoutIcon size={20}/> Logout</div></DropdownItem>
          </Dropdown>
      </div>
    </div>
  )
}
