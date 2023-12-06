import axios from "customize-axios";

export const apiSendOtpByPhone = async (destPhoneNumber) => {
    try {
        const response = await axios.post('/reset/send-otp', {destPhoneNumber: destPhoneNumber});
        return response;
    } catch (error) {
        throw error.response.data;
    }
}

export const apivalidateOtpResetPass = async (otp) => {
  const otpData = {
    otp: otp,
  };

  try {
    const response = await axios.post('/reset/validateOtp', otpData);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const apiResetPass = async (phone, confirmPassword) => {
    try {
        const response = await axios.post('/reset/resetPassword?phoneNumber='+phone, {confirmPassword: confirmPassword});
        return response;
    } catch (error) {
        throw error.response.data;
    }
}




