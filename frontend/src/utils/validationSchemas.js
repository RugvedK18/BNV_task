import * as yup from 'yup';

export const userSchema = yup.object({
  firstName: yup.string().required('First name is required').min(2),
  lastName: yup.string().required('Last name is required').min(2),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().positive().integer().nullable().transform((value, originalValue) => originalValue === '' ? null : value),
  gender: yup.string().oneOf(['Male', 'Female', 'Other']).nullable(),
  phone: yup.string().matches(/^[0-9]+$/, 'Phone must be digits').min(10).max(15).nullable(),
  address: yup.string().nullable(),
});