import React, { useState, useEffect } from 'react'
import { API, } from "../constants";
import OrderProductCard from '../components/OrderProductCard.jsx';
function OrderPage() {

  const [orderData, setOrderData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [productIds, setProductIds] = useState([]);
  const [productData, setProductData] = useState();


  const fetchProductsByIds = async (cartIds) => {
    try {
      const response = await fetch(`${API}/products/find-by-ids?publicationState=preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: cartIds }),
      });

      if (!response.ok) {
        showToastMessage("A apărut o eroare la aducerea produselor favorite", "error");
      }

      const data = await response.json();
      setProductData(data);
   
    } catch (error) {
      showToastMessage("A apărut o eroare la aducerea produselor favorite", "error");
    }
  }


  const getProductIds = (products) => {
    let ids = [];

    products?.forEach((element, index) => {
      ids.push(element.id);
    });
    return ids;
  }

  const fetchOrder = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/orders/${orderId}?populate=*`, {
        headers: {},
      });
      const data = await response.json();
      setOrderData(data.data.attributes);

    } catch (error) {
      console.error(error);
      //error messaage
    } finally {
      setIsLoading(false);
    }
  };

  const displayOrderProducts = (productData) => {
    if (!productData) {
      return null; // or return a loading spinner or some placeholder content
    }
    let jsxElements = [];
    productData?.forEach((element, index) => {
      jsxElements?.push(<OrderProductCard product={element} />);
    });

    return jsxElements;
  };

  useEffect(() => {
    let path = window.location.pathname;
    let segments = path.split('/');
    let lastValue = segments.pop() || segments.pop();
    fetchOrder(lastValue);
  }, []);

  useEffect(() => {
    setProductIds(getProductIds(orderData?.products.data));
  }, [orderData]);

  useEffect(() => {
    fetchProductsByIds(productIds);
  }, [productIds]);



  return (
    <div className='w-full flex justify-center'>
      <div className='contentContainer verticalContent flex flex-col w-full'>
        <h1 className='text-center font-heading font-bold text-[2em] my-12'>{`Produse Comanda: ${orderData?.orderNumber}`}</h1>
        <div className='w-full flex justify-center'>
          <div className='w-full flex flex-row flex-wrap shrink grow basis-0 gap-x-[1rem] gap-y-[2rem] justify-around  content-start '>

            {displayOrderProducts(productData)}

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPage