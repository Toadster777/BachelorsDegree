import React, { useState, useEffect } from 'react';
import { API, } from "../constants";
import ProductCheckoutCard from '../components/ProductCheckoutCard';
import OrderForm from '../components/OrderForm';
import { ToastContainer } from "react-toastify";

function Checkout() {

  const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('checkout')));
  const [productData, setProductData] = useState();




  const fetchProductsByIds = async (cartIds) => {
    try {
      const response = await fetch(`${API}/products/find-by-ids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: cartIds }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const displayCartProducts = (productData) => {
    if (!productData) {
      return null; // or return a loading spinner or some placeholder content
    }
    let jsxElements = [];
    productData?.forEach((element, index) => {
      jsxElements?.push(<ProductCheckoutCard product={element} key={index} />);
    });

    return jsxElements;


  };

  const calculateTotal = (productData, cartData) => {
    if (cartData !== undefined && localStorage.getItem('checkout')) {
      const checkout = cartData
      const total = checkout.reduce((total = 0, item) => {
        const product = productData?.find(p => p.id === item.productId);
        const price = product?.price;
        return total + (price * item?.qty);
      }, 0);
      return total.toFixed(2);
    }
  };

  useEffect(() => {
    const checkout = localStorage.getItem('checkout');
    if (checkout) {
      const cartData = JSON.parse(checkout);
      setCartData(cartData);
      const idArray = cartData.map(item => item.productId);
      fetchProductsByIds(idArray);
    }
  }, []);




  return (
    <div className='w-full flex justify-center'>
      <ToastContainer />
      <div className='contentContainer verticalContent itemContainer flex justify-between content-start w-full gap-x-8 '>
        <div className='flex flex-col gap-y-10'>
          {productData ? displayCartProducts(productData) : <h1 className='text-2xl font-heading font-bold'>Nu exista produse in cos!</h1>}
        </div>

        <div className='flex w-full max-w-[700px]'>
          <OrderForm total={calculateTotal(productData, cartData)} productsIds={cartData?.map(item => item?.productId)} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;