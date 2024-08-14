import httpRequest from '~/utils/httpRequest/httpRequest';

export const getAllRooms = async () => {
    try {
        const response = await httpRequest.get('/rooms');
        return response.data;
    } catch (error) {
        return error;
    }
};

export const createRoom = async (idHotel, formData) => {
    try {
        const response = await httpRequest.post(`/rooms/${idHotel}`, formData);
        return response.data;
    } catch (error) {
        return error;
    }
};
