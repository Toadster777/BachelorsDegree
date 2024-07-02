import React from 'react';
import { Formik, Field, Form } from 'formik';

function SearchBar() {

    const navExclusions = ['/login', '/signUp', '/contact-us', '/profile', '/reset-password', 'user/order/:orderId', 'user/order-history', '/favorites'];
    let path = window.location.pathname
    return (
        <div className={`w-full flex justify-center ${navExclusions.indexOf(path) > -1 ? 'hidden' : ''}`}>
        <Formik
            initialValues={{
                searchParam: '',
            }}
            onSubmit={(values) => {
                window.location.href = `/products/search?searchParam=${values.searchParam}`;
            }}
        >
            <Form className="w-full flex justify-center contentContainer z-0 ">
                <label htmlFor="searchParam" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                <div className="relative w-full restrainInput">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    </div>
                    <Field name="searchParam" id="searchParam" className="block p-2  w-full pe-8 text-sm restrainInput text-gray-900 border border-secondary rounded-2xl bg-gray-50 my-8 focus:border-2 focus:border-secondary" placeholder="Cauta Produse" />
                    <button type="submit" className="text-white absolute end-2.5 bottom-[2.625rem]">
                        <svg className="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </button>
                </div>
            </Form>
        </Formik>
    </div >
    )
}

export default SearchBar