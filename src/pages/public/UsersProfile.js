import { useState } from "react";
import "assets/css/userProfile.css"
import { ModalChangePass } from "components";
import icons from "ultils/icons"

const UsersProfile = () => {
    const {PublishIcon} = icons;
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <div className="userProfile">
                <h2 className="editUserTitle">My Profile</h2>
                <div className="userProfileContainer">
                    <div className="userProfileCard">
                        <div className="userProfileBox">
                            <div className="userProfileContent">
                                <h2>Lila Simons <br /><span>Manager Parking</span></h2>
                                <div className="userProfileInfo">
                                    <ul className="userProfileContact">
                                        <li><span>P</span> +841234512312</li>
                                        <li><span>E</span> lilia@gmail.com</li>
                                        <li><span>B</span> March, 12 2023</li>
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
                                    <input type="text" placeholder="Anna Becker" className="userProfileUpdateInput" />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Phone</label>
                                    <input type="text" placeholder="065 4785 4848" className="userProfileUpdateInput" />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Email</label>
                                    <input type="text" placeholder="annabeck99@gmail.com" className="userProfileUpdateInput" />
                                </div>
                                <div className="userProfileUpdateItem">
                                    <label>Birth of day</label>
                                    <input type="text" placeholder="12/09/2023" className="userProfileUpdateInput" />
                                </div>
                            </div>
                            <div className="userProfileUpdateRight">
                                <div className="userProfileUpdateUpload">
                                    <img className="userProfileUpdateImg" src="https://demoda.vn/wp-content/uploads/2022/09/hinh-anh-avatar-anime-nam-dep.jpg" alt="" />
                                    <label htmlFor="file"><PublishIcon className="userProfileUpdateIcon" /></label>
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
                onClose={() => setOpenModal(false)}/>
        </>
    )
}

export default UsersProfile
