import axios from 'axios';

const httpRequestUploadFile = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_CLOUDINARY,
});

export const post = (path, option = {}) => {
    const response = httpRequestUploadFile.post(path, option);
    return response;
};

export default httpRequestUploadFile;
