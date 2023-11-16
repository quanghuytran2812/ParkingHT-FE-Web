import axios from "customize-axios";

export const apigetFeedback = async () => {
  return await axios.get('/feedback/get-all');
}