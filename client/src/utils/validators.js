export const validateRequired = (fieldName) => (value) => {
    return value ? undefined : `${fieldName} is required.`;
};

export const validateRequiredLetters = (fieldName) => (value) => {
    return validateRequired(fieldName)(value) || validateAlphabetic(fieldName)(value);
};

export const validateEmailRequired = (fieldName) => (value) => {
    return validateRequired(fieldName)(value) || validateEmail(value);
};
export const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : `Invalid email`;
};

export const validatePhoneRequired = (fieldName) => (value) => {
    return validateRequired(fieldName)(value) || validateNumber(fieldName)(value);
};
export const validateNumber = (fieldName) => (value) => {
    return /^\d+$/.test(value) ? undefined : `Invalid ${fieldName}. Must contain only digits`;
};

export const validateAlphabetic = (fieldName) => (value) => {
    return /^[A-Za-zÀ-Ỹà-ỹ]+$/.test(value.trim()) ? undefined : `${fieldName} contain only alphabetic characters`;
};

export const validateRequiredPassword = (fieldName) => (value) => {
    return validateRequired(fieldName)(value) || validatePassword(value);
};

export const validatePassword = (value) => {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{5,})/.test(value)
        ? undefined
        : 'Password must contain at least 5 characters, one uppercase letter, and one special character';
};
