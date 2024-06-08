import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import orderValidationSchema from '../validationSchemas/orderValidationSchema';
import { useAuthContext } from "../contexts/AuthContext";
import { API, } from "../constants";
import Cookies from 'js-cookie';
import addressValidationSchema from '../validationSchemas/addressValidationSchema';
function AddressForm() {
    const { isLoggedIn, user } = useAuthContext();
    const [countyData, setCountyData] = useState([]);
    const [countyDataSubdivisions, setCountyDataSubdivisions] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState(null);
    const [userData, setUserData] = useState(user);

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




    async function addDeliveryAddressToUser(values, userData) {
        try {
            const authToken = Cookies.get('authToken');

            // Step 1: Create a new delivery address
            const response = await fetch(`${API}/delivery-addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    data: {
                        CompleteAddressName: values.completeAddressName,
                        County: values.county,
                        Locality: values.locality,
                    }
                }),
            });

            const data = await response.json();
            console.log(data)
            // Step 2: Update the user with the new delivery address
            const addressId = data.data.id;
            const userId = userData.id;
            const addressIds = user.delivery_addresses.map(address => address.id);
            const userResponse = await fetch(`${API}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    delivery_addresses: [...addressIds, addressId]

                }),
            });


            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        if (selectedCounty) {
            fetchSubdivisions(selectedCounty);
        }
    }, [selectedCounty]);

    useEffect(() => {
        fetchCountyData();
    }, [])

    useEffect(() => {
        setUserData(user);
    }, [user])

    return (
        <Formik
            initialValues={{
                completeAddressName: '',
                county: '',
                locality: '',
            }}
            validationSchema={addressValidationSchema}
            onSubmit={(values) => {
                console.log('Submitting form', values);
                addDeliveryAddressToUser(values, userData);
            }}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form className='flex flex-col justify-between p-10 w-full border-2 border-secondary rounded-lg shadow-lg gap-y-10'>
                    <div className='flex flex-col justify-start w-full'>
                        <h2 className='mb-2'>Adauga o noua adresa de livrare:</h2>
                        <hr className='mb-4' />


                        <div className="relative z-0 w-full mb-5 group">
                            <label htmlFor="county" className="block text-xs font-medium text-gray-700">Judet:</label>
                            <Field as="select" name="county" id="county" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" onChange={(e) => {
                                setSelectedCounty(e.target.options[e.target.selectedIndex].id);
                                setFieldValue('county', e.target.value);
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
                            <Field as="select" name="locality" id="locality" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm">
                                <option value="">Select...</option>
                                {generateSubcountyOptions(countyDataSubdivisions)}
                            </Field>
                            {errors.locality && touched.locality ? (
                                <div className='text-error'>{errors.locality}</div>
                            ) : null}
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label for="completeAddressName" className="block text-xs font-medium text-gray-700">Adresa:</label>
                            <Field as="textarea" name="completeAddressName" id="completeAddressName" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" placeholder=" " />
                            {errors.completeAddressName && touched.completeAddressName ? (
                                <div className='text-error'>{errors.completeAddressName}</div>
                            ) : null}
                        </div>
                    </div>

                    <button type="submit" className="text-white md:max-w-[12rem] bg-secondary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Adauga Adresa</button>
                </Form>
            )}
        </Formik>
    )
}

export default AddressForm