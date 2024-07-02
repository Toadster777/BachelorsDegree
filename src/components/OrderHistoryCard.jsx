import React from 'react'

function OrderCard({ order }) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}/;
    return (

        <div className="w-full h-fit  bg-white border border-gray-200 rounded-lg shadow max-w-[48rem]   ">

            <div className="flex flex-col items-start p-10">
                <h2 className="mb-1 text-xl font-medium text-gray-900 text-center">{`Numarul de comanda: ${order.orderNumber}`}</h2>
                <span className="text-md text-gray-500 dark:text-gray-900">{`Data plasarii comenzii: ${order.placed.match(dateRegex)[0]}`}</span>
                <span className="text-md text-gray-500 dark:text-gray-900">{`Status: ${order.status}`}</span>
                <span className="text-md text-gray-500 dark:text-gray-900">{`Total: ${order.totalAmmount} Lei`}</span>
                <div className="flex mt-4 md:mt-6">
                    <a href={`/user/order/${order?.id}`} className="text-white md:max-w-[12rem] bg-secondary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ">Vezi Comanda</a>
                </div>
            </div>
        </div>
    )
}

export default OrderCard