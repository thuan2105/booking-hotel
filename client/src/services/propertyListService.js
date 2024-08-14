import * as httpRequest from '../utils/httpRequest';

export const propertyList = async () => {
    try {
        const res = await httpRequest.get('hotels/countByType');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
