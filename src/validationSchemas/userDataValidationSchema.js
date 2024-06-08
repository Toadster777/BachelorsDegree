import * as yup from 'yup';
import "yup-phone-lite";

const userDataValidationSchema = yup.object().shape({
    firstName: yup.string()
        .required('Numele este obligatoriu'),
    lastName: yup.string()
        .required('Prenumele este obligatoriu'),
    email: yup.string()
        .email('Adresa de email nu este validă')
        .required('Email-ul este obligatoriu'),
    phoneNo: yup.string()
        .phone("RO", true,)
        .required('Numărul de telefon este obligatoriu'),
});

export default userDataValidationSchema;