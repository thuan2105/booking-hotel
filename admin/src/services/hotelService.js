import httpRequest from '~/utils/httpRequest/httpRequest';

export const createHotel = async (formData) => {
    try {
        const response = await httpRequest.post('/hotels', formData);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllHotels = async () => {
    try {
        const response = await httpRequest.get('/hotels');
        return response.data;
    } catch (error) {
        return error;
    }
};
