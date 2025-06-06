import axios from 'axios';
import Store from 'electron-store';
import { API_CONFIG } from '@/main/configs';

const axiosInstance = () => {
    const ELECTRON_STORAGE = new Store();
    const instance = axios.create({
        baseURL: API_CONFIG.API_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ELECTRON_STORAGE.get('access-token')}`,
        },
    });

    instance.interceptors.response.use(
        (response) => {
            return response.data ? response.data : response;
        },
        async (error) => {
            const originalRequest: any = error.config;
            const REFRESH_URL = 'api/auth/refresh-token';
            const LOGIN_URL = 'api/auth/login';

            // refresh token
            if (
                error?.response?.status === 401 &&
                error?.config?.url !== REFRESH_URL &&
                error?.config?.url !== LOGIN_URL &&
                (!error?.config?.retryCount || error?.config?.retryCount < 2)
            ) {
                const currentUser: any = ELECTRON_STORAGE.get('current-user');
                const refreshToken = ELECTRON_STORAGE.get('refresh-token');
                if (!error.config?.retryCount) error.config.retryCount = 0;
                error.config.retryCount++;

                try {
                    const res: any = await instance.post(
                        REFRESH_URL,
                        {
                            ...currentUser,
                            refreshToken,
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        },
                    );
                    const access_token = res?.data?.access_token;
                    ELECTRON_STORAGE.set('access-token');

                    originalRequest.headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
                    };
                    originalRequest._retry = true;

                    return instance(originalRequest);
                } catch (err) {
                    originalRequest._retry = false;
                    ELECTRON_STORAGE.reset('access-token');
                    ELECTRON_STORAGE.reset('refresh-token');
                    ELECTRON_STORAGE.reset('current-user');
                }
            }
            const getMessage: any = {
                500: 'Internal Server Error',
                404: 'Sorry! the data you are looking for could not be found',
            };
            const message =
                error?.response?.data?.message || // error from data response
                error?.message || // error message
                getMessage[error?.response?.status || error?.status] || // default message with status
                error; // error
            return Promise.reject(message);
        },
    );
    return instance;
};

export { axiosInstance };
