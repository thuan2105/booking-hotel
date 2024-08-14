import * as httpRequest from '~/utils/httpRequest';

export const getRoomHotel = async (idHotel) => {
    try {
        const res = await httpRequest.get(`hotels/rooms/${idHotel}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateRoom = async (roomId, dates) => {
    try {
        console.log(dates);
        const res = await httpRequest.put(`/rooms/availability/${roomId}`, dates);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
