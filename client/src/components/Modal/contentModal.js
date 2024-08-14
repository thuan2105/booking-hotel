import { faCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const btnCancel = {
    name: 'Cancel',
    styles: 'btn-info',
};
const btnDelete = {
    name: 'Delete',
    styles: 'btn-danger',
};
const btnAgree = {
    name: 'OK',
    styles: 'btn-green',
};

const deleteRoomContent = {
    type: 'DELETE',
    icon: { name: faCircleXmark, iconColor: 'icon-color_red' },
    title: 'Are you sure you want to delete the booked room?',
    description: 'This process cannot be undone.',
    buttons: [btnDelete, btnCancel],
};

const successfullyPaypalContent = {
    type: 'SUCCESS_PAYPAL',
    icon: { name: faCheck, iconColor: 'icon-color_green' },
    title: 'You have successfully paid by Paypal.',
    description: 'Click ok to exit.',
    buttons: [btnAgree],
};

const confirmPaymentMethod = {
    type: 'CONFIRM_PAYMENT_METHOD',
    icon: { name: faCheck, iconColor: 'icon-color_green' },
    title: 'You have chosen the cash payment method.',
    description: 'Click ok to exit.',
    buttons: [btnAgree],
};

export { deleteRoomContent, successfullyPaypalContent, confirmPaymentMethod };
