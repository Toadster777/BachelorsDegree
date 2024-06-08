import * as yup from 'yup';
import "yup-phone-lite";

const addressValidationSchema = yup.object().shape({
    completeAddressName: yup.string()
        .required('Adresa este obligatorie'),
    county: yup.string()
        .required('Județul este obligatoriu'),
    locality: yup.string()
        .required('Localitatea este obligatorie'),
});

export default addressValidationSchema;