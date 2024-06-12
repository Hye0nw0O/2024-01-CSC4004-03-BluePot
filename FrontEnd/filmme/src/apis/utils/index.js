import axios from 'axios';

export const API = axios.create({
    baseURL: "https://filmme-drf-deploy-932ced3808f2.herokuapp.com",

    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
});