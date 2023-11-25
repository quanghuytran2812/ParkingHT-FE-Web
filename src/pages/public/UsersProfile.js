import { useCallback, useEffect, useState } from "react";
import "assets/css/userProfile.css"
import { ModalChangePass } from "components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import { apiUpdateUser } from "apis";
import { toast } from "react-toastify";
import { fetchGetUserById } from "store/user/userSlide";

const UsersProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.user.current);
    const { token } = useSelector((state) => state.auth)
    const userInfo = jwtDecode(token);


    const fetchData = useCallback(() => {
        try {
            dispatch(fetchGetUserById())
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
      
        const birthdayValue = e.target.elements.birthday.value;
        const formattedBirthday = moment(birthdayValue, "DD/MM/YYYY").format("YYYY-MM-DD");
      
        if (!moment(formattedBirthday, "YYYY-MM-DD", true).isValid()) {
          toast.error("Invalid date format for birthday");
          return;
        }
      
        const updatedUser = {
          userId: userinfo.userId,
          fullName: e.target.elements.fullName.value,
          birthday: formattedBirthday,
          email: e.target.elements.email.value,
        };
      
        try {
          const res = await apiUpdateUser(userinfo.userId, updatedUser);
          if (res.statusCode === 200) {
            fetchData();
            toast.success("Update user successfully!");
          } else {
            toast.error(`${res.message}`);
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while updating the user.");
        }
      };

    return (
        <>
            <div className="userProfile">
                <h2 className="editUserTitle">My Profile</h2>
                <div className="userProfileContainer">
                    <div className="userProfileCard">
                        <div className="userProfileBox">
                            <div className="userProfileContent">
                                <h2>{userinfo?.fullName} <br /><span>Manager Parking</span></h2>
                                <div className="userProfileInfo">
                                    <ul className="userProfileContact">
                                        <li><span>P</span> {userinfo?.phoneNumber}</li>
                                        <li><span>E</span> {userinfo?.email}</li>
                                        <li><span>B</span> {moment(userinfo?.birthday).format("DD/MM/YYYY")}</li>
                                    </ul>
                                </div>
                                {userInfo.role !== "Admin" ? (
                                    <button onClick={() => setOpenModal(true)}>Change Password</button>
                                ) : ''}
                            </div>
                        </div>
                        <div className="userProfileCircle">
                            <div className="userProfileImgBx">
                                <img src="https://demoda.vn/wp-content/uploads/2022/09/hinh-anh-avatar-anime-nam-dep.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="userProfileUpdate">
                        <span className="userProfileUpdateTitle">Edit</span>
                        <form onSubmit={handleUpdateUser} className="userProfileUpdateForm">
                            <div className="userProfileUpdateLeft">
                                <div className="userProfileUpdateItem">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        defaultValue={userinfo?.fullName}
                                        className="userProfileUpdateInput"
                                        name="fullName"
                                    />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Phone</label>
                                    <input
                                        type="number"
                                        defaultValue={userinfo?.phoneNumber}
                                        className="userProfileUpdateInput"
                                        name="phoneNumber"
                                    />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        defaultValue={userinfo?.email}
                                        className="userProfileUpdateInput"
                                        name="email"
                                    />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Birth of day</label>
                                    <input
                                        type="text"
                                        defaultValue={moment(userinfo?.birthday).format("DD/MM/YYYY")}
                                        className="userProfileUpdateInput"
                                        name="birthday"
                                    />
                                </div>
                            </div>
                            <div className="userProfileUpdateRight">
                                <div className="userProfileUpdateUpload">
                                    <img
                                        className="userProfileUpdateImg"
                                        src="https://demoda.vn/wp-content/uploads/2022/09/hinh-anh-avatar-anime-nam-dep.jpg"
                                        alt=""
                                    />
                                    <input type="file" id="file" className="userProfileUpdateInputFile" />
                                </div>
                                {userInfo.role !== "Admin" && (
                                    <button type="submit" className="userProfileUpdateButton">
                                        Update
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ModalChangePass
                open={openModal}
                onClose={() => setOpenModal(false)} />
        </>
    )
}

export default UsersProfile
