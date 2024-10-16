import axios from "axios";
const API_KEY =  process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json`,
  headers: {
    Accept: "application/json",
  },
});

export default api;
