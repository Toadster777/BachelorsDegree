import React from 'react';
import { Formik, Form, Field } from 'formik';
import contactSchema from '../validationSchemas/contactFormSchema';
import { API } from "../constants";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from '../helpers.js';
import "react-toastify/dist/ReactToastify.css";
function Contact() {


    const onFinish = async (values) => {
        try {
            const response = await fetch(`${API}/contact-email/emailRequests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                showToastMessage("A apărut o eroare la trimiterea mesajului", "error");
            }

            const data = await response.json();

            if (data?.error?.message) {
                showToastMessage(data?.error?.message, "error");
            } else {
                showToastMessage("Mesaj trimis cu succes!", "success")
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }

        } catch (error) {
            showToastMessage("A apărut o eroare la trimiterea mesajului", "error");
        }
    };

    return (
        <div className='w-full flex justify-center'>
            <ToastContainer />
            <div className='contentContainer verticalContent itemContainer flex justify-between items-center w-full '>
                <div className='flex flex-col gap-8 '>
                    <h1 className='text-4xl font-semibold text-start contactText'>Contact</h1>
                    <p className='text-center text-2xl contactText'>Pentru orice nelamurire sau intrebare, nu ezitati sa ne contactati.</p>
                </div>


                <Formik
                    initialValues={{
                        lastName: '',
                        firstName: '',
                        email: '',
                        message: '',
                    }}
                    validationSchema={contactSchema}
                    onSubmit={onFinish}
                >
                    {({ errors, touched }) => (
                        <Form className="max-w-xl px-10 py-16 flex flex-col justify-center w-full border-2 border-secondary rounded-lg shadow-lg">
                            <div className="mb-5">
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">Nume</label>
                                <Field type="text" name="firstName" id="firstName" className="bg-gray-50 border border-accent text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Nume" />
                                {errors.firstName && touched.firstName ? <div className='text-error'>{errors.firstName}</div> : null}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Prenume</label>
                                <Field type="text" name="lastName" id="lastName" className="bg-gray-50 border border-accent text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Prenume" />
                                {errors.lastName && touched.lastName ? <div className='text-error'>{errors.lastName}</div> : null}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <Field type="email" name="email" id="email" className="bg-gray-50 border border-accent text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Email" />
                                {errors.email && touched.email ? <div className='text-error'>{errors.email}</div> : null}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Cu ce va putem ajuta?</label>
                                <Field as="textarea" name="message" id="message" className="bg-gray-50 border border-accent text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Mesajul dumneavoastra" />
                                {errors.message && touched.message ? <div className='text-error'>{errors.message}</div> : null}
                            </div>
                            <div className='w-full flex flex-col gap-4'>
                                <button type="submit" className="text-white md:max-w-[8rem] bg-secondary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Trimite</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Contact;