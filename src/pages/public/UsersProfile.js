import { useEffect, useState } from "react";
import "assets/css/userProfile.css"
import { ModalChangePass } from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUserById } from "store/user/authSlice";
import moment from "moment";

const UsersProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const userinfo = useSelector((state) => state.auth.current);

    useEffect(() => {
        dispatch(fetchGetUserById())
    }, [dispatch]);

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
                                <button onClick={() => setOpenModal(true)}>Change Password</button>
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
                        <form className="userProfileUpdateForm">
                            <div className="userProfileUpdateLeft">
                                <div className="userProfileUpdateItem">
                                    <label>Full Name</label>
                                    <input type="text" defaultValue={userinfo?.fullName} className="userProfileUpdateInput" />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Phone</label>
                                    <input type="number" defaultValue={userinfo?.phoneNumber}  className="userProfileUpdateInput" />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Email</label>
                                    <input type="text" defaultValue={userinfo?.email} className="userProfileUpdateInput" />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Birth of day</label>
                                    <input type="text" defaultValue={moment(userinfo?.birthday).format("DD/MM/YYYY")} className="userProfileUpdateInput" />
                                </div>
                            </div>
                            <div className="userProfileUpdateRight">
                                <div className="userProfileUpdateUpload">
                                    <img className="userProfileUpdateImg" src="https://demoda.vn/wp-content/uploads/2022/09/hinh-anh-avatar-anime-nam-dep.jpg" alt="" />
                                    <input type="file" id="file" className="userProfileUpdateInputFile" />
                                </div>

                                <button className="userProfileUpdateButton">Update</button>
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
