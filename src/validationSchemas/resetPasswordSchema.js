import * as yup from 'yup';

// schema for signUp yup validation
const resetPasswordSchema = yup.object().shape({
    password: yup.string()
        .min(8, "Parola trebuie sa aiba cel putin 8 caractere")
        .matches(/[a-z]/, "Parola trebuie sa contina cel putin o litera mica")
        .matches(/[A-Z]/, "Parola trebuie sa contina cel putin o litera mare")
        .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, "cel putin 1 numar sau caracter special (@,!,#, etc).")
        .required("Parola este obligatorie"),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Parolele trebuie sa se potriveasca'),
});

export default resetPasswordSchema;