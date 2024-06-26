import * as yup from 'yup';
import "yup-phone-lite";

// schema for signUp yup validation
    const signUpSchema = yup.object().shape({
        firstName: yup.string().required("Numele este obligatoriu"),
        lastName: yup.string().required("Prenumele este obligatoriu"),
        email: yup.string().email().required("Te rog introdu o adresa de email valida"),
        phoneNo: yup.string()
            .phone("RO", true,)
            .required("Te rog introdu un numar de telefon valid pentru Romania"),
        password: yup.string()
            .min(8, "Parola trebuie sa aiba cel putin 8 caractere")
            .matches(/[a-z]/, "Parola trebuie sa contina cel putin o litera mica")
            .matches(/[A-Z]/, "Parola trebuie sa contina cel putin o litera mare")
            .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, "cel putin 1 numar sau caracter special (@,!,#, etc).")
            .required("Parola este obligatorie"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Parolele trebuie sa se potriveasca'),
    });

export default signUpSchema;