import axios from "axios";

export default axios.create({
    // baseURL: 'http://127.0.0.1:8000/api'
    // baseURL: 'http://192.168.0.103:8080/api/'
    baseURL: 'https://dwf.walnuthash.com/api/'
    
});
