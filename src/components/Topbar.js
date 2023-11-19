import "assets/css/topbar.css"
import Dropdown, { DropdownItem, DropdownNotifications } from './Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchGetUserById, logout } from 'store/user/authSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import path from "ultils/path";
import icons from "ultils/icons";
import { useEffect } from "react";
import { fetchCountReportUnread, fetchReportUnread } from "store/report/reportSlice";
import { jwtDecode } from "jwt-decode";
import { fetchCountFeedbackUnread, fetchFeedbackUnread } from "store/feedback/feedbackSlice";
import moment from "moment";
// import { useEffect } from "react";
// import Swal from "sweetalert2";

export default function Topbar() {
  const { NotificationsNoneIcon, AccountCircleIcon, LogoutIcon } = icons
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countUnread, listUnread } = useSelector((state) => state.report);
  const { countUnreadF, listUnreadF } = useSelector((state) => state.feedback);
  const { token, current } = useSelector((state) => state.auth);
  const tokenInfo = jwtDecode(token)

  const handleLogout = () => {
    dispatch(logout());
    navigate(`${path.LOGIN}`);
    toast.success("Logout sucessful!");
  }

  useEffect(() => {
    dispatch(fetchGetUserById())
    if (tokenInfo.role === "Manager") {
      dispatch(fetchCountReportUnread())
      dispatch(fetchReportUnread())
    }
    if (tokenInfo.role === "Admin") {
      dispatch(fetchCountFeedbackUnread())
      dispatch(fetchFeedbackUnread())
    }
  }, [dispatch, tokenInfo.role]);

  // useEffect(() => {
  //   if (mess) {
  //     Swal.fire('Oops!', mess, 'info').then(() => {
  //       dispatch(logout())
  //       navigate(`${path.LOGIN}`);
  //     })
  //   }
  // }, [mess, dispatch, navigate])

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        {tokenInfo.role === "Manager" ? (
          <Dropdown trigger={
            <div className="topbarIconsContainer">
              <NotificationsNoneIcon />
              {countUnread === 0 ? '' : <span className="topIconBadge">{countUnread}</span>}
            </div>}>
            {countUnread === 0 ? '' : <h6 className='topRightNotifications'>Notifications</h6>}
            {listUnread?.map((report) => (
              <DropdownNotifications key={report.reportId} isRead="isRead" onClick={() => navigate("/dashboard/report")}>
                <img className="topRightInfoImg" src={require('../assets/images/Logo.png')} alt='' />
                <div className="topRightNotificationsContainer">
                  <p className="topRightNotificationsTitle">{report.content}</p>
                  <span className="topRightNotificationsTime">{moment(report.createDate).endOf('day').fromNow()}</span>
                </div>
              </DropdownNotifications>
            ))}
          </Dropdown>
        ) : tokenInfo.role === "Admin" ? (
          <Dropdown trigger={
            <div className="topbarIconsContainer">
              <NotificationsNoneIcon />
              {countUnreadF === 0 ? '' : <span className="topIconBadge">{countUnreadF}</span>}
            </div>}>
            {countUnreadF === 0 ? '' : <h6 className='topRightNotifications'>Notifications</h6>}
            {listUnreadF?.map((feedback) => (
              <DropdownNotifications key={feedback.feedBackId} isRead="isRead" onClick={() => navigate("/dashboard/feedback")}>
                <img className="topRightInfoImg" src={require('../assets/images/Logo.png')} alt='' />
                <div className="topRightNotificationsContainer">
                  <p className="topRightNotificationsTitle">{feedback.content === null ? 'No idea' : feedback.content}</p>
                  <span className="topRightNotificationsTime">{moment(feedback.createDate).endOf('day').fromNow()}</span>
                </div>
              </DropdownNotifications>
            ))}
          </Dropdown>
        ) : ''}
        <Dropdown trigger={<img className="topAvatar" src="https://hdwallpaperim.com/wp-content/uploads/2017/08/22/103013-blue_hair-anime-748x421.jpg" alt="avatar" />}>
          <DropdownItem>
            <img className="topRightInfoImg" src="https://hdwallpaperim.com/wp-content/uploads/2017/08/22/103013-blue_hair-anime-748x421.jpg" alt="avatar" />
            <div className="topRightInfoUser">
              <p className="topRightInfoUserName">{current?.fullName}</p>
              <span className="topRightInfoEmail">Welcome back!</span>
            </div>
          </DropdownItem>
          <hr />
          <DropdownItem><AccountCircleIcon size={20} /><Link className="DropdownItemUserProfile" to="/dashboard/userprofile">My Profile</Link></DropdownItem>
          <DropdownItem><div className="TopbarDropdownItem" onClick={() => handleLogout()}><LogoutIcon size={20} /> Logout</div></DropdownItem>
        </Dropdown>
      </div>
    </div>
  )
}
