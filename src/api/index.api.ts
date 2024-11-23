import axios, { AxiosResponse } from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API;

const getApiUrl = () => {
  if (apiUrl === undefined) {
    throw new Error("You have not provided VITE_REACT_APP_API enviroment variable");
  }

  return `${apiUrl}/v1/api/`;
};

const client = axios.create({
  baseURL: getApiUrl(),
});

// Interceptors
client.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data; // Simply return the response
  },
  async (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      return Promise.reject(error);
    }

    if (status === 403 && error.response.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

// save token in request's header
const setAuthorizationHeader = (token: string) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const configureClient = (token: string) => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

export default client;
