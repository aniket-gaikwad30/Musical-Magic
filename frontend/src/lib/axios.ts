import axios  from "axios";

export const axiosInstence = axios.create({
    baseURL: "http://localhost:5000/api",
})