import * as httpRequest from '../utils/httpRequest';

export const feature = async (cities) => {
    try {
        const res = await httpRequest.get('hotels/countByCity', {
            params: {
                cities,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const propertiesHotel = async ({ ...query }, limit) => {
    const res = await httpRequest.get('hotels', {
        params: {
            ...query,
            limit,
        },
    });
    return res.data;
};

export const search = async ({ ...query }, limit) => {
    const res = await httpRequest.get('hotels/search', {
        params: {
            limit,
            min: query.min,
            max: query.max,
            searchTerm: query.city,
        },
    });
    return res.data;
};

export const getHotel = async ({ idHotel }) => {
    const res = await httpRequest.get(`hotels/${idHotel}`);
    return res.data;
};
