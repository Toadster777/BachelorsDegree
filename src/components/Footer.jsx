import React from 'react'

export const Footer = () => {
    return (
        <footer className="bg-primary bg-opacity-10 flex justify-center mt-8">
            <div className="contentContainer flex flex-col gap-12 py-8 w-full">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 justify-items-center sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Cum dai de noi?</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Adresa: Splaiul Independentei nr 3</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Tel: 0731220427</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Hai pe net!</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline ">Instagram</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Facebook</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Termeni Legali</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Politica de confidentialitate</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Termeni &amp; Conditii  </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}
