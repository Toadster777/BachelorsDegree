import React, { useState, } from 'react'
import { Formik, Field, Form } from 'formik';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { API, SALT } from "../constants";
import { setToken } from "../helpers";
import { hash } from 'bcryptjs';
import signUpSchema from '../validationSchemas/signUpValidation.js';


function SignUp() {

    const navigate = useNavigate();

    const { setUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");


    function hashPassword(value) {
        return new Promise((resolve, reject) => {
            hash(value, SALT, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
            });
        });
    }

    const onFinish = async (values) => {

        setIsLoading(true);
        try {
            values.confirmPassword = undefined;
            values.username = values.email;
            values.password = await hashPassword(values.password);
            const response = await fetch(`${API}/auth/local/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if (data?.error) {
                throw data?.error;
            } else {
                // set the token
                setToken(data.jwt);

                // set the user
                setUser(data.user);

                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error(error);
            setError(error?.message ?? "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };
    return (

        <div className='w-full flex justify-center'>
            <div className='contentContainer verticalContent w-full flex justify-center items-center '>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNo: '',
                        password: '',
                    }}
                    validationSchema={signUpSchema}
                    onSubmit={onFinish}
                >
                    {({ errors, touched }) => (
                        <Form className="max-w-xl  p-10 w-full border-2 border-secondary rounded-lg shadow-lg">
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <Field type="text" name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer " placeholder=" " />
                                    <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 focus:outline-none">Nume</label>
                                    {errors.firstName && touched.firstName ? (
                                        <div className='text-error'>{errors.firstName}</div>
                                    ) : null}
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <Field type="text" name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
                                    <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 focus:outline-none">Prenume</label>
                                    {errors.lastName && touched.lastName ? (
                                        <div className='text-error'>{errors.lastName}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Field type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
                                <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 focus:outline-none">Adresa de email</label>
                                {errors.email && touched.email ? (
                                    <div className='text-error'>{errors.email}</div>
                                ) : null}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Field type="tel" name="phoneNo" id="phoneNo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
                                <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 focus:outline-none">Numar de telefon</label>
                                {errors.phoneNo && touched.phoneNo ? (
                                    <div className='text-error'>{errors.phoneNo}</div>
                                ) : null}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Field type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
                                <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 focus:outline-none">Parola</label>
                                {errors.password && touched.password ? (
                                    <div className='text-error'>{errors.password}</div>
                                ) : null}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Field type="password" name="confirmPassword" id="confirmPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
                                <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 focus:outline-none">Confirmare parola</label>
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div className='text-error'>{errors.confirmPassword}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="text-white md:max-w-[8rem] bg-secondary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Inregistrare</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}

export default SignUp
