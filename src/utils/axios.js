import axios from "axios";

const request = axios.create({
  baseURL: "https://server-hanoistore.onrender.com",
});

// request.interceptors.response.use((response) => {
//   return response.data;
// });

export default request;
