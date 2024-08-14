import axios from 'axios';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
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
export default httpRequest;
