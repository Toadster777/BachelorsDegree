import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import userValidationSchema from '../validationSchemas/userDataValidationSchema';
import { API, } from "../constants";
import Cookies from 'js-cookie';


function UserCard({ user }) {

    const [isFormVisible, setFormVisible] = useState(false);

    const handleSubmit = async (values) => {
        try {
            const authToken = Cookies.get('authToken');
            const userResponse = await fetch(`${API}/users/${user?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(values),
            });

            const data = await userResponse.json();

            console.log('Success:', data);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div className="w-full flex flex-col gap-y-8">
            <div className='w-full p-8  max-w-[48rem] bg-white border border-primary rounded-lg shadow  flex items-center justify-between h-fit' id='user-me'>
                <div className='flex content-center items-center'>
                    <img className="w-24 h-24 rounded-full object-cover" src="../../public/cover11.jpg" alt="TA" />
                </div>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Nume:</td>
                                <td>{`${user?.firstName} ${user?.lastName}`}</td> {/* Replace with the actual value */}
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{user?.email}</td> {/* Replace with the actual value */}
                            </tr>
                            <tr>
                                <td>Telefon:</td>
                                <td className='pl-3'>{user?.phoneNo}</td> {/* Replace with the actual value */}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button className="text-white  md:max-w-[6rem] bg-secondary font-medium rounded-lg text-sm w-full px-2 py-2.5 text-center " onClick={() => setFormVisible(!isFormVisible)}>Editeaza</button>
            </div>


            <div className={`flex w-full animate ${isFormVisible ? 'show' : ''}`} id='addressForm'>
                <Formik
                    initialValues={{
                        firstName: user?.firstName || '',
                        lastName: user?.lastName || '',
                        email: user?.email || '',
                        phoneNo: user?.phoneNo || '',
                    }}
                    validationSchema={userValidationSchema}
                    onSubmit={values => {
                        console.log(values);
                        handleSubmit(values);
                    }}
                    enableReinitialize
                >
                    {({ errors, touched, }) => (
                        <Form className='flex flex-col justify-between p-10 w-full border-2 border-secondary rounded-lg shadow-lg gap-y-4'>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700">First Name</label>
                                <Field type="text" name="firstName" id="firstName" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.firstName && touched.firstName ? (
                                    <div className='text-error'>{errors.firstName}</div>
                                ) : null}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="lastName" className="block text-xs font-medium text-gray-700">Last Name</label>
                                <Field type="text" name="lastName" id="lastName" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.lastName && touched.lastName ? (
                                    <div className='text-error'>{errors.lastName}</div>
                                ) : null}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="email" className="block text-xs font-medium text-gray-700">Email</label>
                                <Field type="email" name="email" id="email" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.email && touched.email ? (
                                    <div className='text-error'>{errors.email}</div>
                                ) : null}
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="phoneNo" className="block text-xs font-medium text-gray-700">Phone Number</label>
                                <Field type="text" name="phoneNo" id="phoneNo" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.phoneNo && touched.phoneNo ? (
                                    <div className='text-error'>{errors.phoneNo}</div>
                                ) : null}
                            </div>

                            <button type="submit" className="text-white md:max-w-[12rem] bg-secondary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Schimba</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default UserCard