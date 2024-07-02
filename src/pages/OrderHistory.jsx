import React, { useState, useEffect } from 'react'
import OrderCard from '../components/OrderHistoryCard.jsx';
import { useAuthContext } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from '../helpers.js';
import { API, } from "../constants";
function OrderHistory() {

    const [orderHistoryData, setOrderHistoryData] = useState();
    const { isLoggedIn, user } = useAuthContext();
    const [userData, setUserData] = useState(user);
    const fetchOrdersByIds = async (userId) => {
        try {
            const response = await fetch(`${API}/orders/user/${userId}?populate=*`, {
                headers: {
                },
            });

            if (!response.ok) {
                showToastMessage("A apărut o eroare la aducerea comenzilor", "error");
            }

            const data = await response.json();
            setOrderHistoryData(data);
        } catch (error) {
            showToastMessage("A apărut o eroare la aducerea comenzilor", "error");
        }
    }



    const displayOrders = (orderHistoryData) => {
        if (!orderHistoryData) {
            return null; // or return a loading spinner or some placeholder content
        }
        let jsxElements = [];
        orderHistoryData?.forEach((element, index) => {
            jsxElements?.push(<OrderCard order={element} />);
        });

        return jsxElements;


    };



    useEffect(() => {
        if (user && user.id) {
            fetchOrdersByIds(user.id);
        }
    }, [user]);



    return (
        <div className='w-full flex justify-center'>
            <ToastContainer />
            <div className='contentContainer verticalContent flex flex-col w-full'>
                <h1 className='text-center font-heading font-bold text-[2em] my-12'>Istoric de Comenzi</h1>
                <div className='w-full flex justify-center'>
                    <div className='w-full flex flex-row flex-wrap shrink grow basis-0 gap-x-[1rem] gap-y-[2rem] justify-around  content-start '>

                        {displayOrders(orderHistoryData)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistory