import axios from "axios";

const api = axios.create({
  baseURL: "https://open-reviews.onrender.com/api",
});

export default api;