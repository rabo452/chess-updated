import axios, { AxiosError } from "axios";
import { baseURL } from "./consts";

const AxiosClient = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        "Content-Type": "application/json"
    }
})

export {AxiosClient, baseURL};