import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik';
import orderValidationSchema from '../validationSchemas/orderValidationSchema';
import { useAuthContext } from "../contexts/AuthContext";
import { API, } from "../constants";
import uniqid from 'uniqid';
import Cookies from 'js-cookie';

function OrderForm({ total, productsIds }) {

    const [countyData, setCountyData] = useState([]);
    const [countyDataSubdivisions, setCountyDataSubdivisions] = useState([]);
    const { isLoggedIn, user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isAddressFieldsDisabled, setIsAddressFieldsDisabled] = useState(false);
    const [isAddressFilledByCheckbox, setIsAddressFilledByCheckbox] = useState(false);
    const [userData, setUserData] = useState(user);
    const [addressData, setAddressData] = useState(user?.delivery_addresses);

    const username = 'kode';

    const fetchCountyData = async () => {
        try {
            const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=798549&username=${username}`);
            const data = await response.json();
            setCountyData(data.geonames);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchSubdivisions = async (countyId) => {
        try {
            const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${countyId}&username=${username}`);
            const data = await response.json();
            setCountyDataSubdivisions(data.geonames);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const postOrder = async (orderData) => {
        setIsLoading(true);
        const authToken = Cookies.get('authToken');
        let headers = {};
        if (Cookies.get('authToken') !== undefined) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        }
        else {
            headers = {
                'Content-Type': 'application/json',
            }
        }

        try {

            const response = await fetch(`${API}/orders`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            localStorage.removeItem('checkout');
            setIsLoading(false);
            return data;
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
        }
    };



    const generateCountyOptions = () => {
        if (!countyData) {
            return null;
        }
        let jsxElements = [];
        countyData?.forEach(county => {
            jsxElements.push(<option id={county.geonameId} value={county.toponymName}>{county.toponymName}</option>);
        })
        return jsxElements;
    }


    const generateSubcountyOptions = (countyDataSubdivisions) => {
        if (!countyDataSubdivisions) {
            return null;
        }

        let jsxElements = [];
        countyDataSubdivisions?.forEach(subdivision => {
            jsxElements.push(<option value={subdivision.toponymName}>{subdivision.toponymName}</option>);
        })

        return jsxElements;
    }

    const displayExistingAddress = (addressData, setFieldValue, setIsAddressFieldsDisabled) => {
        if (!addressData) {
            return null;
        }

        let jsxElements = [];
        addressData.forEach((address, index) => {
            const fieldName = `address-${index}`;
            jsxElements.push(
                <div key={index} className='flex gap-x-4 justify-start  items-start'>
                    <input
                        type="checkbox"
                        className="mt-1"
                        id={fieldName}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setFieldValue('completeAddressName', address.CompleteAddressName);
                                setFieldValue('county', address.County);
                                const countyId = countyData.find((county) => {
                                    return county?.toponymName === address.County
                                }).geonameId;
                                fetchSubdivisions(countyId);
                                setFieldValue('locality', address.Locality)
                                setIsAddressFieldsDisabled(true);
                                setIsAddressFilledByCheckbox(true);
                            } else {
                                setIsAddressFieldsDisabled(false);
                                setIsAddressFilledByCheckbox(false);
                            }
                            e.preventDefault(); // Prevent the default action
                        }}
                    />
                    <label htmlFor={fieldName}>{`${address.CompleteAddressName}, ${address.County}, ${address.Locality}  `}</label>
                </div>
            );
        });

        return jsxElements;
    };


    function addOrderDetails(formikValues, user, total) {
        // Generate a random order number
        const orderNumber = uniqid.time('ORD-');

        // Get the current date and time
        const placed = new Date().toISOString();

        const totalAmmount = total;

        const products = productsIds?.map(id => ({ id }));

        let body = {};

        if (Cookies.get('authToken') !== undefined) {
            const users_permissions_user = user.id;
            body = {
                data: {
                    ...formikValues,
                    orderNumber,
                    placed,
                    totalAmmount,
                    products,
                    users_permissions_user,
                }
            };

        }

        else {
            body = {
                data: {
                    ...formikValues,
                    orderNumber,
                    placed,
                    totalAmmount,
                    products,
                }
            };
        }

        postOrder(body);
    }


    useEffect(() => {
        fetchCountyData();
    }, [])

    useEffect(() => {
        setUserData(user);
        if (user) {
            setAddressData(user.delivery_addresses);
        }
    }, [user]);

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phoneNo: '',
                completeAddressName: '',
                county: '',
                locality: '',
                paymentMethod: '',
            }}
            validationSchema={orderValidationSchema}
            onSubmit={(values) => {

                addOrderDetails(values, user, total);
            }
            }
        >
            {({ setFieldValue, errors, touched, setValues, values }) => {
                useEffect(() => {
                    if (userData && addressData) {
                        setValues({
                            firstName: userData.firstName || '',
                            lastName: userData.lastName || '',
                            email: userData.email || '',
                            phoneNo: userData.phoneNo || '',
                            completeAddressName: '',
                            county: '',
                            locality: '',
                            paymentMethod: '',
                        });
                    }
                }, [userData, addressData]);

                return (
                    <Form className=" flex flex-col justify-between p-10 w-full border-2 border-secondary rounded-lg shadow-lg gap-y-10 ">
                        <div className='flex flex-col justify-start w-full'>
                            <h2 className='mb-2'>DETALII LIVRARE COMANDA:</h2>
                            <hr className='mb-4' />

                            <div className="relative z-0 w-full mb-5 group">
                                <label for="firstName" className="block text-xs font-medium text-gray-700">Nume</label>
                                <Field type="text" name="firstName" id="firstName" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.firstName && touched.firstName ? (
                                    <div className='text-error'>{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label for="lastName" className="block text-xs font-medium text-gray-700">Prenume</label>
                                <Field type="text" name="lastName" id="lastName" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.lastName && touched.lastName ? (
                                    <div className='text-error'>{errors.lastName}</div>
                                ) : null}

                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label for="email" className="block text-xs font-medium text-gray-700">Email:</label>
                                <Field type="email" name="email" id="email" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.email && touched.email ? (
                                    <div className='text-error'>{errors.email}</div>
                                ) : null}

                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label for="phoneNo" className="block text-xs font-medium text-gray-700">Telefon:</label>
                                <Field type="tel" name="phoneNo" id="phoneNo" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.phoneNo && touched.phoneNo ? (
                                    <div className='text-error'>{errors.phoneNo}</div>
                                ) : null}

                            </div>
                        </div>

                        <div className='flex flex-col justify-start w-full'>
                            <h2 className='mb-2'>DORESC LIVRARE LA:</h2>
                            <hr className='mb-4' />

                            <div className='flex flex-col justify-start mb-4'>
                                {displayExistingAddress(addressData, setFieldValue, setIsAddressFieldsDisabled)}
                            </div>


                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="county" className="block text-xs font-medium text-gray-700">Judet:</label>
                                <Field as="select" disabled={isAddressFieldsDisabled} name="county" id="county" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" onChange={(e) => {
                                    setFieldValue('county', e.target.value);
                                    if (e.target.value) {
                                        fetchSubdivisions(e.target.options[e.target.selectedIndex].id);
                                    }
                                }}>
                                    <option value="">Select...</option>
                                    {generateCountyOptions()}

                                </Field>
                                {errors.county && touched.county ? (
                                    <div className='text-error'>{errors.county}</div>
                                ) : null}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label htmlFor="locality" className="block text-xs font-medium text-gray-700">Localitate/Oras</label>
                                <Field as="select" disabled={isAddressFieldsDisabled} name="locality" id="locality" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm">
                                    <option value="">Select...</option>
                                    {generateSubcountyOptions(countyDataSubdivisions)}
                                </Field>
                                {errors.locality && touched.locality ? (
                                    <div className='text-error'>{errors.locality}</div>
                                ) : null}
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label for="completeAddressName" className="block text-xs font-medium text-gray-700">Adresa:</label>
                                <Field as="textarea" disabled={isAddressFieldsDisabled} name="completeAddressName" id="completeAddressName" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                                {errors.completeAddressName && touched.completeAddressName ? (
                                    <div className='text-error'>{errors.completeAddressName}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='flex flex-col justify-start w-full'>
                            <span className={`font-secondary font-semibold text-xl tracking-wider mb-4 text-gray-900 ${total ? '' : 'hidden'}`}>{`Total: ${total} Lei`}</span>
                            <h2 className='mb-2'>DORESC SA PLATESC:</h2>
                            <hr className='mb-4' />
                            <div className="flex items-center relative z-0 w-full mb-5 group">
                                <Field type="radio" name="paymentMethod" id="cardOnline" value="Card Online" className="mr-2" />
                                <label htmlFor="cardOnline" className="block text-xs font-medium text-gray-700">Card Online</label>
                                {errors.paymentMethod && touched.paymentMethod ? (
                                    <div className='text-error'>{errors.paymentMethod}</div>
                                ) : null}
                            </div>
                            <div className="flex items-center relative z-0 w-full mb-5 group">
                                <Field type="radio" name="paymentMethod" id="rambursCurier" value="Ramburs Curier" className="mr-2" />
                                <label htmlFor="rambursCurier" className="block text-xs font-medium text-gray-700">Ramburs Curier</label>
                                {errors.paymentMethod && touched.paymentMethod ? (
                                    <div className='text-error'>{errors.paymentMethod}</div>
                                ) : null}
                            </div>
                        </div>

                        <button type="submit" className="text-white md:max-w-[12rem] bg-secondary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Trimite Comanda</button>
                    </Form>
                );
            }}
        </Formik>

    )
}

export default OrderForm