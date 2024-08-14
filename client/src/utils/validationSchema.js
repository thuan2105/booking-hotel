import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address!').required('Email is required!'),
    password: yup.string().required('Password is required!'),
});

// const requiredField = (fieldName) => yup.string().required(`${fieldName} is required`);

// const emailField = (fieldName) => yup.string().email(`Invalid ${fieldName}`);

// const phoneField = (fieldName) => yup.string().matches(/^\d+$/, `Invalid ${fieldName}. Must contain only digits`);

// const alphabeticField = (fieldName) => yup.string().matches(/^[A-Za-z]+$/, `Invalid ${fieldName}. Must contain only alphabetic characters`);

// export const validationSchema = yup.object().shape({
//   lastName: requiredField('Last name'),
//   firstName: requiredField('First name'),
//   email: emailField('Email'),
//   password: yup.string()
//     .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{5,})/, 'Password must contain at least 5 characters, one uppercase letter, and one special character')
//     .required('Password is required'),
//   address: requiredField('Address'),
//   country: requiredField('Country'),
//   phone: phoneField('Phone'),
// });
