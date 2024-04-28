import axios from "axios";

const AUTH_TOKEN_PREFIX = 'Bearer';
const LOCAL_STORAGE_NAME = 'auth_token';
const USER_ID = 'user_id';
const LOCAL_BEARER_TOKEN = 'fb250092-974c-44a7-b4ed-4e71b5875886';

const authToken = window.localStorage.getItem(LOCAL_STORAGE_NAME);
const userId = window.localStorage.getItem(USER_ID);

const api = axios.create({
    baseURL: 'https://pets.dev-incubator.kz',
    headers: {
        'Content-Type': 'application/json',
        'access': authToken,
        'id': userId
    },
    transformRequest: [
        (data) => {
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        (data) => {
            return JSON.parse(data);
        },
    ],
});

api.defaults.headers.common.Authorization = `${AUTH_TOKEN_PREFIX} ${LOCAL_BEARER_TOKEN}`;

export default api
