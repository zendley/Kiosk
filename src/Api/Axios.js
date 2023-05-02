import axios from "axios";

export default axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
  // baseURL: 'http://192.168.100.14:8080/api/'
  baseURL: "http://zendleykiosk.walnuthash.com/api/",
});
