import React, { useState, useEffect } from 'react'
import SearchBar from './searchBar'
import FavoritesSvg from '../assets/svgs/FavoritesSvg'
import ShoppingCart from '../assets/svgs/ShoppingCartSvg'
import AccountSvg from '../assets/svgs/AccountSvg'
import { useAuthContext } from "../contexts/AuthContext";
import { removeToken } from '../helpers'

export const NavBar = () => {
    const { isLoggedIn, user } = useAuthContext();
    const [userData, setUserData] = useState(user);
    let path = window.location.pathname
    const navExclusions = ['/login', '/signUp',];

    useEffect(() => {
        path = window.location.pathname
        setUserData(user)
    }, [user]);

    return (


        <nav className="bg-primary flex flex-col  relative">
            <div className='flex justify-center self-center w-full'>
                <div className=" flex flex-wrap items-center justify-between mx-auto py-4 w-full contentContainer ">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap ">Flowbite</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center justify-between gap-2 md:gap-4'>
                                <FavoritesSvg />
                                <ShoppingCart />
                            </div>


                            <button type="button" className={"text-sm bg-gray-800 rounded-full md:me-0 hidden md:flex md:ml-6 " + (isLoggedIn ? '' : '!hidden')} id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-10 h-10 rounded-full object-cover" src="../../public/cover11.jpg" alt="TA" />
                            </button>

                            <AccountSvg />
                        </div>


                        {/* <!-- Dropdown menu --> */}
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow " id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 ">{`${userData?.firstName} ${userData?.lastName}`}</span>
                                <span className="block text-sm  text-gray-500 truncate ">{userData?.email}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700  ">Profil</a>
                                </li>
                                <li>
                                    <button onClick={removeToken} className="block px-4 py-2 text-sm text-gray-700  ">Sign out</button>
                                </li>
                            </ul>
                        </div>


                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center z-10 justify-between hidden w-full md:flex md:w-auto md:order-1 positionMenu " id="navbar-user">
                        <ul className="flex flex-col md:bg-transparent bg-gray-50 font-bold font-heading p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  menuUnderline">
                            <li>
                                <a href="/" className="block py-2 px-3 text-gray-900  rounded md:bg-transparent md:p-0 md:text-white " aria-current="page">Home</a>
                            </li>
                            <li className='md:hidden'>
                                <a href="/login" className="block py-2 px-3 text-gray-900  rounded md:bg-transparent md:p-0 md:text-white " aria-current="page">Account</a>
                            </li>
                            <li>
                                <a href="/categories" className="block py-2 px-3 text-gray-900 rounded  md:text-white   md:p-0  ">Categories</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded md:text-white    md:p-0  ">Contact</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-gray-900 rounded md:text-white    md:p-0  ">Locatii</a>
                            </li>
                            <li className='md:hidden flex justify-center items-center w-full mt-6'>
                                <button onClick={removeToken} className={'block py-2 px-3 text-white  rounded-lg bg-secondary w-full  ' + (isLoggedIn ? '' : '!hidden')} aria-current="page">Sign Out</button>
                                <a href='/login' className={'block py-2 px-3  text-center text-white  rounded-lg bg-secondary w-full  ' + (isLoggedIn ? '!hidden' : '')} aria-current="page">Sign In</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>


            <div className={'bg-white w-full flex self-center justify-center pb-12 ' + (navExclusions.indexOf(path) > -1 ? 'hidden' : '')}> <SearchBar /> </div>
        </nav>



    )
}
