import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="fixed top-0 border-solid border-gray-200 w-full border-b py-3 bg-white z-50  bg-white ">
            <div className="container mx-auto ">
                <div className="w-full flex  flex-col lg:flex-row">
                    <div className=" flex justify-between  lg:flex-row">
                        <a href="https://pagedone.io/" className="flex items-center">
                            ALXCARDS
                        </a>
                    </div>
                    <div className="hidden w-full lg:flex lg:pl-11 " id="navbar-default-example">
                        <ul className="flex items-center flex-col mt-4 lg:mt-0 lg:ml-auto lg:flex-row gap-4">
                            <li>
                                <a className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">
                                    About us
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">
                                    product
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center justify-between text-gray-500 text-sm lg:text-base font-medium hover:text-indigo-700 transition-all duration-500 mb-2 lg:mr-6 md:mb-0 md:mr-3">
                                    Features
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>                                                
    </div>
  )
}

export default Navbar