import "assets/css/verify.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import icons from "ultils/icons";
import path from "ultils/path";

const VerifyPhone = () => {
    const { PhoneIcon } = icons;
    const navigate = useNavigate();
    const [ph, setPh] = useState("");


    const sendOTPSMS = async () => {
        navigate("/" + path.VERIFY);
        toast.success("OTP sent successfully!");
    }

    return (
        <>
            <div className="verify">
                <div className="verifyback">
                    <Link to={path.LOGIN} className="verifybackLink">⇦ Back</Link>
                </div>
                <div className="verifyForm">
                        <p className="verifyHeading">XÁC MINH SỐ ĐIỆN THOẠI CỦA BẠN</p>
                        <PhoneIcon className="verifycheck" sx={{ fontSize: 60 }} />
                        <div className="verifybox">
                            <PhoneInput
                                country={"vn"}
                                value={ph}
                                onChange={setPh}
                                disableDropdown={true}
                            />
                        </div>
                        <div id="recaptcha"></div>
                        <button
                            onClick={sendOTPSMS}
                            className="verifybtn1"
                        >
                            Gửi mã qua SMS
                        </button>
                </div>
            </div>
        </>
    );
}

export default VerifyPhone;