import axiosClient from './axiosClient'

const END_POINTS = {
    CREATE: "user/create",
    GET_ALL: "user/info/all",
    PAYMENT_INFO: "user/info/payment",
    SPIN_COUNT: "user/info/spin-count",
    FULL_NAME: "user/info/full-name",
    SET_BANKING_INFO: "user/save-bank",
    SET_RECEIVED: "user/set-received"
}


export const createUser = (token, username, password, fullName,spinCount ,image ) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    return axiosClient.post(`${END_POINTS.CREATE}`, {username, password, fullName,spinCount, image }, config);
};


export const setReceived = (token, username) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    return axiosClient.post(`${END_POINTS.SET_RECEIVED}?username=${username}`,null , config);
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

export const getPaymentInfo = (token ) => {
  const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  return axiosClient.get(`${END_POINTS.PAYMENT_INFO}`, config);
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