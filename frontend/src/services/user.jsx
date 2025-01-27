import axiosClient from './axiosClient'

const END_POINTS = {
    CREATE: "user/create",
    GET_ALL: "user/info/all"
}


export const createUser = (token, username, password, fullName,spinCount ,image ) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    return axiosClient.post(`${END_POINTS.CREATE}`, {username, password, fullName,spinCount, image }, config);
};

export const getUsers = (token ) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    return axiosClient.get(`${END_POINTS.GET_ALL}`, config);
};