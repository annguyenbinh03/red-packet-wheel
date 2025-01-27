import axiosClient from './axiosClient'

const END_POINTS = {
    GET_TOKEN: "auth/token",
    REFRESH_TOKEN: "auth/refresh"
}
  
export const getToken = ( username, password ) => {
    return axiosClient.post(`${END_POINTS.GET_TOKEN}`, {username, password});
};

export const refreshAccessToken = ( token ) => {
    return axiosClient.post(`${END_POINTS.REFRESH_TOKEN}`, {token});
};
  