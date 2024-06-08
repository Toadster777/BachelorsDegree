import React from 'react'
import Cookies from 'js-cookie';
import { API, } from "../constants";

function AddressCard({ addressData }) {


    const authToken = Cookies.get('authToken');

    const deleteAddress = async () => {
        console.log(addressData)
        try {
            const response = await fetch(`${API}/delivery-addresses/${addressData.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting address');
            }

            // Refresh the page or update state here
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (


        <div className="w-full h-fit  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <div className="flex flex-col items-center p-10">
                <h2 className="mb-1 text-xl font-medium text-gray-900 text-center">{addressData?.CompleteAddressName}</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{`${addressData?.County}, ${addressData?.Locality}`}</span>
                <div className="flex mt-4 md:mt-6">
                    <button onClick={deleteAddress} className="inline-flex items-center p-4 text-sm font-medium text-center text-error  rounded-lg ">Remove</button>
                </div>
            </div>
        </div>

    )
}

export default AddressCard