import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SPRING_BOOT_URL,
  timeout: 300000,
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { status, message } = error.response;
    if (status === 404 || status === 400) {
      console.log(message);
      return error;
    } else {
      console.log(error);
      return error;
    }
  }
);

export default instance;
