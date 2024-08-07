import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import AddressForm from '../components/AddressForm'
import { useAuthContext } from "../contexts/AuthContext";
import AddressCard from '../components/AddressCard';
import { ToastContainer } from "react-toastify";
function ProfilePage() {

    const { isLoggedIn, user } = useAuthContext();
    const [userData, setUserData] = useState(user);
    const [addressData, setAddressData] = useState([]);


    const generateAddressCards = (addressData) => {
        if (!addressData) {
            return null;
        }
        let jsxElements = [];
        addressData?.forEach(address => {
            jsxElements.push(<AddressCard addressData={address} />);
        })

        return jsxElements;
    }

    useEffect(() => {
        setUserData(user)
        setAddressData(user?.delivery_addresses)
    }, [user]);

    return (
        <div className='w-full flex justify-center'>
            <ToastContainer />
            <div className='contentContainer verticalContentflex justify-between items-center w-full pb-12 '>

                <div className='flex w-full gap-x-8 mb-12 itemContainer'>

                    <UserCard user={userData} />
                    <div className='flex w-full flex-wrap h-fit gap-6'>
                        {generateAddressCards(addressData)}
                    </div>

                </div>

                <AddressForm />
            </div>
        </div>
    )
}

export default ProfilePage