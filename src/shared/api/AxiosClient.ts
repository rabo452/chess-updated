import axios, { AxiosError } from "axios";

const baseURL = "http://localhost:8000";

const AxiosClient = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json"
    }
})

export {AxiosClient};