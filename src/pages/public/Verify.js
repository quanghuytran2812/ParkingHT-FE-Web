import "assets/css/verify.css";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import { useState } from "react";
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import icons from "ultils/icons";
import path from "ultils/path";

const Verify = () => {
    const { GppGoodIcon } = icons;
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("");

    const onOTPVerify = (e) => {
        e.preventDefault();
        navigate("/" + path.RESETPASSWORD);
        toast.success("OTP verification successful. Reset password.");
    }

    return (
        <>
            <div className="verify">
                <div className="verifyback">
                    <Link to="/verifyphone" className="verifybackLink">⇦ Back</Link>
                </div>
                <div className="verifyForm">
                    <form onSubmit={onOTPVerify}>
                        <p className="verifyHeading">Nhập OTP của bạn</p>
                        <GppGoodIcon className="verifycheck" sx={{ fontSize: 60 }} />
                        <div className="verifybox">
                            <OTPInput
                                value={OTP}
                                onChange={setOTP}
                                autoFocus
                                OTPLength={6}
                                otpType="number"
                                disabled={false}
                                inputClassName="verifyinput"
                            />
                        </div>
                        <button type="submit" className="verifybtn1">Xác minh OTP</button>
                    </form>

                </div>
            </div>
        </>
    );
}

export default Verify;