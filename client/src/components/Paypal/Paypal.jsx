import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import * as paymentService from '~/services/paymentService';
import classNames from 'classnames/bind';
import styles from './Paypal.module.scss';
import { useNavigate } from 'react-router-dom';

// This value is from the props in the UI
const style = { layout: 'vertical' };
const cx = classNames.bind(styles);
const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
    const navigate = useNavigate();
    const [{ isPending }] = usePayPalScriptReducer();

    // useEffect(() => {
    //     dispatch({
    //         type: 'resetOptions',
    //         value: {
    //             ...options,
    //             currency,
    //         },
    //     });
    // }, [currency, showSpinner]);
    const handleSaveOrder = () => {
        paymentService
            .payment(payload)
            .then((res) => res.success && navigate('/'))
            .catch((err) => console.log(err));
    };
    return (
        <>
            {showSpinner && isPending && <div className={cx('spinner')} />}

            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount, showSpinner]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => orderId)
                }
                onApprove={(data, actions) =>
                    actions.order.capture().then(async (response) => {
                        console.log(response);
                        if (response.status === 'COMPLETED') {
                            handleSaveOrder();
                        }
                    })
                }
                onError={(err) => console.error('PayPal error:', err)}
            />
        </>
    );
};

const Paypal = ({ amount, showSpinner, payload }) => (
    <div>
        <PayPalScriptProvider
            options={{
                clientId: 'Aa8uiDBhsB18su3zdZSP-PTi4KyychG23vfK9LxvbLp6WCHEVGmk3qsDDI8K0filBuSDC0hnh3T4jkAN',
                components: 'buttons',
                currency: 'USD',
            }}
        >
            <ButtonWrapper payload={payload} showSpinner={showSpinner} currency={'USD'} amount={amount} />
        </PayPalScriptProvider>
    </div>
);

export default Paypal;
