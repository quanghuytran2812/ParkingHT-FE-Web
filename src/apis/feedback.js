import axios from "customize-axios";

export const apigetFeedback = async () => {
  return await axios.get('/feedback/get-all');
}

export const apiCountFeedbackUnread = async () => {
  return await axios.get('/feedback/get-count-unread/0');
}

export const apiListFeedbackUnread = async () => {
  return await axios.get('/feedback/get-unread/0');
}