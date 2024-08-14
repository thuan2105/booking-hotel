import * as httpRequest from '~/utils/httpRequest';

export const getCart = async (userId, payment) => {
    try {
        const response = await httpRequest.get(`cart/${userId}`, {
            params: payment,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addToCart = async (userId, data) => {
    try {
        const response = await httpRequest.post(`cart/${userId}`, data);
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const deleteRoom = async (userId, roomId, hotelId) => {
    try {
        const response = await httpRequest.destroy(`cart/${userId}/${hotelId}/${roomId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteHotel = async (userId, hotelId) => {
    try {
        const response = await httpRequest.destroy(`cart/${userId}/${hotelId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
