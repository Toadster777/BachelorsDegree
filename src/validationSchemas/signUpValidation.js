import * as yup from 'yup';
import "yup-phone-lite";


// schema for signUp yup validation
const signUpSchema = yup.object().shape({
    firstName: yup.string().required("First Name Is Required"),
    lastName: yup.string().required("Last Name Is Required"),
    email: yup.string().email().required("Please enter a valid email address"),
    phoneNo: yup.string()
        .phone("RO", true,)
        .required("Please enter a valid phone number for Romania"),
    password: yup.string().min(6).required("Password must be at least 6 characters long"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});



export default signUpSchema