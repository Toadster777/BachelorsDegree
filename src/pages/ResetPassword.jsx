import React from 'react';
import { Formik, Form, Field } from 'formik';
import resetPasswordSchema from '../validationSchemas/resetPasswordSchema';
import { API } from "../constants";
import { useSearchParams, } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { showToastMessage } from '../helpers.js';
function ResetPassword() {

    const [queryParameters] = useSearchParams()

    const onFinish = async (values) => {
        let body = {
            ...values,
            code: queryParameters.get('code')
        };
        try {
            const response = await fetch(`${API}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                showToastMessage("A apărut o eroare la aducerea produselor favorite", "error");
            }

            const data = await response.json();

            if (data?.error?.message) {
                showToastMessage(data?.error?.message, "error");
            } else {
                localStorage.removeItem('checkout');
                showToastMessage("Parola a fost schimbata cu succes", "success");
            }


            setTimeout(() => {
                window.location.reload();
            }, 4000);
        } catch (error) {
            showToastMessage("A apărut o eroare la schimbarea parolei", "error");
        }
    };


    return (
        <div className='w-full flex justify-center'>
            <ToastContainer />
            <div className='contentContainer verticalContent flex justify-center items-center w-full '>


                <Formik
                    initialValues={{
                        password: '',
                        passwordConfirmation: '',
                    }}
                    validationSchema={resetPasswordSchema}
                    onSubmit={onFinish}
                >
                    {({ errors, touched }) => (
                        <Form className="max-w-xl px-10 py-16 flex flex-col justify-center w-full border-2 border-secondary rounded-lg shadow-lg">
                            <div className="relative z-0 w-full mb-5 group">
                                <Field type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
                                <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 focus:outline-none">Parola</label>
                                {errors.password && touched.password ? (
                                    <div className='text-error'>{errors.password}</div>
                                ) : null}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <Field type="password" name="passwordConfirmation" id="passwordConfirmation" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " />
                                <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 focus:outline-none">Confirmare parola</label>
                                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                                    <div className='text-error'>{errors.passwordConfirmation}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="text-white md:max-w-[12rem] bg-secondary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Schimba Parola</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default ResetPassword