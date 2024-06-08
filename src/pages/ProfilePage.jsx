import React, { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import AddressForm from '../components/AddressForm'
import { useAuthContext } from "../contexts/AuthContext";
import AddressCard from '../components/AddressCard';
function ProfilePage() {

    const { isLoggedIn, user } = useAuthContext();
    const [userData, setUserData] = useState(user);
    const [addressData, setAddressData] = useState([]);


    const generateAddressCards = (addressData) => {
        if (!addressData) {
            return null;
        }
        console.log(addressData)
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

            <div className='contentContainer verticalContent flex flex-col w-full gap-12'>

                <div className='flex w-full gap-x-8'>

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