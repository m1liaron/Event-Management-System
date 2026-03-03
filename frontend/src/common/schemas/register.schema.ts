import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be 8+ characters').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
});

export { RegisterSchema };