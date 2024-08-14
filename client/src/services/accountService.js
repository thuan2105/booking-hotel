import * as httpRequest from '../utils/httpRequest';

export const login = async (account) => {
    try {
        const res = await httpRequest.post('auth/login', account);
        return res.data;
    } catch (error) {
        return error.response;
    }
};

export const register = async (formData) => {
    try {
        const res = await httpRequest.post('auth/register', formData);
        return res.data;
    } catch (error) {
        return error.response;
    }
};
