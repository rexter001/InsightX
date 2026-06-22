import axios from 'axios';

const api = axios.create({
    baseURL: 'https://insightx-3a0a.onrender.com/api',
});

api.interceptors.request.use(
    (config) => {
        const stored = localStorage.getItem('insightx_user');

        if (stored) {
            const { token } = JSON.parse(stored);
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;