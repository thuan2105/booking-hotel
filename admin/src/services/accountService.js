import httpRequest from '~/utils/httpRequest/httpRequest';

export const login = async (account) => {
    try {
        const res = await httpRequest.post('auth/login', account);
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response;
    }
};

export const newUser = async (formData) => {
    try {
        const res = await httpRequest.post('auth/register', formData);
        return res.data;
    } catch (error) {
        return error.response;
    }
};

export const getData = async (path) => {
    try {
        const res = await httpRequest.get(`${path}`);
        return res.data;
    } catch (error) {
        return error.response;
    }
};

export const deleteUser = async (id, path) => {
    try {
        const res = await httpRequest.delete(`${path}/${id}`);
        return res.data;
    } catch (error) {
        return error.response;
    }
};
