import Cookies from 'js-cookie';
import { AUTH_TOKEN } from "./constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
    showToastMessage("Produs adaugat in cos cu succes!", "success");
}

export const addToFavorites = (productId, buttonImg) => {
    // Get the favorites from local storage
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
        // If favorites exist, parse it to an array
        favorites = JSON.parse(favorites);

        // Find the index of the product in the array
        const index = favorites.findIndex(item => item.productId === productId);

        if (index !== -1) {
            // If the product is found, remove it from the array
            favorites.splice(index, 1);
        } else {
            // If the product is not found, add it to the array
            favorites.push({ productId });
        }
    } else {
        // If favorites don't exist, create an array with the product object
        favorites = [{ productId }];
    }
    if (buttonImg.className.includes('addBtn')) {
        buttonImg.classList.add('hidden'); // Replace 'newClassName' with the class you want to add
        buttonImg.previousElementSibling.classList.remove('hidden');
        showToastMessage("Produs adaugat la favorite cu succes!", "success");
    }
    else if (buttonImg.className.includes('removeBtn')) {
        buttonImg.classList.add('hidden'); // Replace 'newClassName' with the class you want to add
        buttonImg.nextElementSibling.classList.remove('hidden');
        showToastMessage("Produs scos de la favorite cu succes!", "success");
    }
    // Update the favorites in local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export const showToastMessage = (message, type) => {
    switch (type) {
        case 'success':
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            break;
        case 'error':
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            break;
        case 'info':
            toast.info(message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            break;
        default:
            console.log('No toast type specified');
    }
};