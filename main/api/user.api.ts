import { axiosInstance } from '@/main/helpers';

export const userAPI = {
    login,
    getProfile,
    updateProfile,
    getList,
    createUser,
    getOne,
    updateUser,
};

function login({ username, password }: { username: string; password: string }) {
    const url = 'auth/login';
    return axiosInstance().post(url, { username, password });
}

function getProfile() {
    const url = 'users/profile';
    return axiosInstance().get(url);
}

function updateProfile(data: any) {
    const url = 'users/update-profile';
    return axiosInstance().patch(url, data);
}

function getList(query: any) {
    const url = 'users/get-list';
    return axiosInstance().get(url, { params: query });
}

function createUser(data: any) {
    const url = 'users/create-user';
    return axiosInstance().post(url, data);
}

function getOne(userName: string) {
    const url = `users/get-one/${userName}`;
    return axiosInstance().get(url);
}

function updateUser(data: any) {
    const url = `users/update-user/${data?.id}`;
    return axiosInstance().patch(url, data);
}
