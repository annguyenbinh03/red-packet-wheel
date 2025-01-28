import axiosClient from './axiosClient'

const END_POINTS = {
    CREATE: "history/spin-info",
}


export const saveHistory = (token, spin, amount) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    return axiosClient.post(`${END_POINTS.CREATE}?spin=${spin}&amount=${amount}`, null, config);
};
