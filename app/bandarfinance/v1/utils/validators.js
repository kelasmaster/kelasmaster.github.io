export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;
  return re.test(String(phone));
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
