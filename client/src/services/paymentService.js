import * as httpRequest from '~/utils/httpRequest';

export const getConfigPayment = async () => {
    try {
        const response = await httpRequest.get('/payment/config');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const payment = async ({ ...query }) => {
    try {
        const response = await httpRequest.patch('/payment', {
            ...query,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
