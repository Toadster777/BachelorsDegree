import React, { useState } from 'react'
import { showToastMessage } from '../helpers.js';
function ProductCheckoutCard({ product }) {
    const [checkout, setCheckout] = useState(JSON.parse(localStorage.getItem('checkout')));

    const matchingProduct = checkout.find(item => item.productId === product.id);

    const incrementQty = () => {
        const updatedCheckout = checkout.map(item =>
            item.productId === product.id ? { ...item, qty: item.qty + 1 } : item
        );
        setCheckout(updatedCheckout);
        localStorage.setItem('checkout', JSON.stringify(updatedCheckout));
        window.location.reload();
    };

    const decrementQty = () => {
        const updatedCheckout = checkout.map(item =>
            item.productId === product.id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
        );
        setCheckout(updatedCheckout);
        localStorage.setItem('checkout', JSON.stringify(updatedCheckout));
        window.location.reload();
    };

    const removeFromCart = () => {
        const updatedCheckout = checkout.filter(item => item.productId !== product.id);
        setCheckout(updatedCheckout);
        localStorage.setItem('checkout', JSON.stringify(updatedCheckout));
        showToastMessage("Produsul a fost eliminat din cos cu succes!", "success");
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };


    return (
        <div className='w-full p-8  max-w-[48rem] bg-white border border-gray-300 rounded-lg shadow gap-x-8  flex content-center justify-between h-fit'>

            <div className='flex justify-center items-center'>
                <img className=" rounded-t-md aspect-square object-cover max-w-[8rem]" src={`http://localhost:1337${product?.cardPhoto?.url}`} alt="product image" />
            </div>
            {/* Text DIV */}
            <div>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 product-name">{product.name}</h5>
            </div>
            {/* PRICE, QTY, REMOVE PRODUCT DIV */}

            <div className='flex flex-col gap-y-12 items-center justify-center content-center'>
                <span className="font-secondary font-semibold text-xl tracking-wider text-gray-900">{`${product.price} Lei`}</span>
                <div className="flex items-center">
                    <button onClick={decrementQty} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                    </button>
                    <div>
                        <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={matchingProduct ? matchingProduct.qty : 1} required />
                    </div>
                    <button onClick={incrementQty} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
                <button onClick={removeFromCart} className='text-error'>Sterge</button>

            </div>
        </div>
    )
}

export default ProductCheckoutCard