import axios from "axios";

const APP_URL = "http://localhost:8000/api";

export const getUsers = () => {
  return axios.get(`${APP_URL}/users`);
};

export const createUser = (data) => {
  return axios.post(`${APP_URL}/users` ,data);
};

