import * as Yup from 'yup';

export const registerSchema = Yup.object({
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    userName: Yup.string().required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required"),
    confirmedPassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), ''], 'Passwords must match'),
    country: Yup.string().required("required"),
    dateOfBirth: Yup.date().required("required"),
})

export const loginSchema = Yup.object({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required")
})