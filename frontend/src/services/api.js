import axios from "axios";

const API = axios.create({
    baseurl: "http://localhost:5000/api"
})

export default API; 