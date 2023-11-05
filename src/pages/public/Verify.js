import "assets/css/verify.css";
import { Link,useNavigate } from "react-router-dom"
import OTPInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify';
import icons from "ultils/icons";
import path from "ultils/path"

const Verify = () => {
    const {PhoneIcon,GppGoodIcon} = icons
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("");
    const [ph, setPh] = useState("");
    const [showOTP, setShowOTP] = useState(false);

    function sendOTPSMS() {
        setShowOTP(true);
        toast.success("OTP sent successfully!");
    }

    function onOTPVerify() {
        navigate("/"+path.RESETPASSWORD);
        toast.success("Successful code confirmation");
    }
    return (
        <div className="verify">
            <div className="verifyback">
                <Link to={path.LOGIN} className="verifybackLink">⇦ Back</Link>
            </div>
            <div className="verifyForm">
                {showOTP ? (
                    <>
                        <p className="verifyHeading">Enter your OTP</p>
                        <GppGoodIcon className="verifycheck" sx={{ fontSize: 60 }} />
                        <div className="verifybox">
                            <OTPInput
                                value={OTP}
                                onChange={setOTP}
                                autoFocus
                                OTPLength={6}
                                otpType="number"
                                disabled={false}
                                inputClassName="verifyinput" />
                        </div>
                        <button onClick={onOTPVerify} className="verifybtn1">Verify OTP</button>
                    </>
                ) : (
                    <>
                        <p className="verifyHeading">Verify your phone number</p>
                        <PhoneIcon className="verifycheck" sx={{ fontSize: 60 }} />
                        <div className="verifybox">
                            <PhoneInput
                                country={"vn"}
                                value={ph}
                                onChange={setPh}
                                disableDropdown={true} />
                        </div>
                        <button
                            onClick={sendOTPSMS}
                            className="verifybtn1">
                            Send code via SMS
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Verify
