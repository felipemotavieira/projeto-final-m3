import axios from "axios";

const InternalAPI = axios.create({
  baseURL: "https://app-checkin.herokuapp.com",
  timeout: 5000
});

export default InternalAPI;
