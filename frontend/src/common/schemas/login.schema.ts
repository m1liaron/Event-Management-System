import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be 8+ characters').required('Required'),
});

export { LoginSchema };