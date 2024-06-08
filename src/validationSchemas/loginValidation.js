import * as yup from 'yup';

// schema for login yup validation
const loginSchema = yup.object().shape({

    identifier: yup.string().email().required("Please enter a valid email address"),

    password: yup.string().min(6).required("Password must be at least 6 characters long"),

});



export default loginSchema