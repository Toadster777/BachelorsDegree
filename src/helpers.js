import Cookies from 'js-cookie';
import { AUTH_TOKEN } from "./constants";

export const getToken = () => {
    return Cookies.get(AUTH_TOKEN);
};

export const setToken = (token) => {
    if (token) {
        Cookies.set(AUTH_TOKEN, token, { expires: 3 });
    }
};

export const removeToken = () => {
    Cookies.remove(AUTH_TOKEN);
    location.reload();
};

export const addToCheckout = (productId) => {
    // Get the checkout from local storage
    let checkout = localStorage.getItem('checkout');

    if (checkout) {
        // If checkout exists, parse it to an array
        checkout = JSON.parse(checkout);

        // Find the product in the array
        const product = checkout.find(item => item.productId === productId);

        if (product) {
            // If the product is found, increment its qty
            product.qty += 1;
        } else {
            // If the product is not found, add it to the array with qty = 1
            checkout.push({ productId, qty: 1 });
        }
    } else {
        // If checkout doesn't exist, create an array with the product object
        checkout = [{ productId, qty: 1 }];
    }

    // Update the checkout in local storage
    localStorage.setItem('checkout', JSON.stringify(checkout));
}