import React, { useState, } from 'react'
import { Formik, Field, Form } from 'formik';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { API, SALT } from "../constants";
import { setToken } from "../helpers";
import { hash } from 'bcryptjs';
import loginSchema from '../validationSchemas/loginValidation';


function Login() {

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
            values.password = await hashPassword(values.password);
            const response = await fetch(`${API}/auth/local`, {
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
                message.success(`Welcome back ${data.user.username}!`);

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
            <div className='contentContainer verticalContent flex justify-center items-center w-full '>
                <Formik
                    initialValues={{
                        identifier: '',
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={onFinish}
                >
                    {({ errors, touched }) => (
                        <Form className="max-w-xl p-10 flex flex-col  justify-center w-full border-2 border-secondary rounded-lg shadow-lg">
                            <div className="mb-5">
                                <label for="identifier" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <Field type="email" name="identifier" id="email" className="bg-gray-50 border border-accent text-gray-900 text-sm rounded-lg block w-full p-2.5  " placeholder="Email" />
                                {errors.identifier && touched.identifier ? (
                                    <div className='text-error'>{errors.identifier}</div>
                                ) : null}
                            </div>
                            <div className="mb-5">
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                                <Field type="password" name="password" id="password" className="bg-gray-50 border border-accent text-gray-900 text-sm rounded-lg block w-full p-2.5  " placeholder="Password" />
                                {errors.password && touched.password ? (
                                    <div className='text-error'>{errors.password}</div>
                                ) : null}
                            </div>
                            <div className='w-full flex flex-col gap-4'>
                                <button type="submit" className="text-white md:max-w-[8rem] bg-secondary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Submit</button>
                                <span className=''>Don't have an account? Create one <a className='text-primary underline ' href='/signUp'>Here</a></span>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}

export default Login