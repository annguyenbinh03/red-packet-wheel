import axiosClient from './axiosClient'

const END_POINTS = {
    GET_ALL: "leaderboard/get-all",
}

export const getLeaderboards = (token ) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    return axiosClient.get(`${END_POINTS.GET_ALL}`, config);
};