import httpRequestUploadFile from '~/utils/httpRequest/httpRequestUploadFile';

export const uploadFile = async (file) => {
    try {
        const response = await httpRequestUploadFile.post('image/upload', file);
        return response.data;
    } catch (error) {
        return error;
    }
};
