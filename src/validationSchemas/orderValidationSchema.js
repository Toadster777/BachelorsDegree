import * as yup from 'yup';
import "yup-phone-lite";

const orderValidationSchema = yup.object().shape({
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
    completeAddressName: yup.string()
        .required('Adresa este obligatorie'),
    county: yup.string()
        .required('Județul este obligatoriu'),
    locality: yup.string()
        .required('Localitatea este obligatorie'),
    paymentMethod: yup.string()
        .required('Metoda de plată este obligatorie'),
});

export default orderValidationSchema;