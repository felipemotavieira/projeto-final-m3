import axios from "axios";

const InternalAPI = axios.create({
  baseURL: "https://app-checkin.herokuapp.com/",
});

export default InternalAPI;
