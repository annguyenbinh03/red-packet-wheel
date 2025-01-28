import axiosClient from './axiosClient'

const END_POINTS = {
    CREATE: "user/create",
    GET_ALL: "user/info/all",
    SPIN_COUNT: "user/info/spin-count",
    FULL_NAME: "user/info/full-name",
    SET_BANKING_INFO: "user/save-bank"
}


export const createUser = (token, username, password, fullName,spinCount ,image ) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    return axiosClient.post(`${END_POINTS.CREATE}`, {username, password, fullName,spinCount, image }, config);
};


export const saveBankInfo = (token, paymentMethod, bank, accountNumber) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    return axiosClient.post(`${END_POINTS.SET_BANKING_INFO}`, {paymentMethod, bank, accountNumber}, config);
};

export const getUsers = (token ) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    return axiosClient.get(`${END_POINTS.GET_ALL}`, config);
};

export const getFullName = (token ) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  return axiosClient.get(`${END_POINTS.FULL_NAME}`, config);
};

export const getSpinCount = (token ) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  return axiosClient.get(`${END_POINTS.SPIN_COUNT}`, config);
};