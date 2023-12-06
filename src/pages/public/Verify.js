import "assets/css/verify.css";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import { useState } from "react";
import icons from "ultils/icons";
import path from "ultils/path";
import { apivalidateOtpResetP } from "store/otp/otpSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Verify = () => {
    const { GppGoodIcon } = icons;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("");

    const onOTPVerify = (e) => {
        e.preventDefault();

        if (OTP.trim() === "") {
            toast.error("Please enter the OTP.")
            return;
        }

        dispatch(apivalidateOtpResetP(OTP))
            .then((result) => {
                if (result.payload?.statusCode === 200) {
                    navigate("/" + path.RESETPASSWORD);
                }
            })
            .catch((error) => {
                console.log(error)
            });
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