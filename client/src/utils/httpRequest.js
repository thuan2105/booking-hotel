import axios from 'axios';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response;
};

export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response;
};

export const put = async (path, options = {}) => {
    const response = await httpRequest.put(path, options);
    return response;
};
export const patch = async (path, options = {}) => {
    const response = await httpRequest.patch(path, options);
    return response;
};
export const destroy = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response;
};
export default httpRequest;
