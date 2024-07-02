import React from 'react'

function OrderProductCard({ product }) {
    return (
        <div className='w-full p-8  max-w-[48rem] bg-white border border-gray-300 rounded-lg shadow gap-x-8  flex content-center justify-between h-fit'>

            <div className='flex justify-center items-center'>
                <a href={`/product/${product.id}`}>
                    <img className=" rounded-t-md aspect-square object-cover max-w-[8rem]" src={`http://localhost:1337${product?.cardPhoto?.url}`} alt="product image" />
                </a>
            </div>
            {/* Text DIV */}
            <div>
                <a href={`/product/${product.id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 product-name max-w-[19rem]">{product.name}</h5>
                </a>
            </div>

            <div className='flex items-end'>
                <span className="font-secondary font-semibold text-xl tracking-wider text-gray-900">{`${product.price} Lei`}</span>
                {/* <span className="text-md text-gray-500 dark:text-gray-900">{`Cantitate: ${product.units}`}</span> */}
            </div>



        </div>
    )
}

export default OrderProductCard