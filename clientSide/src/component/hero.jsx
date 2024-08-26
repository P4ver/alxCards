import React from 'react';
import Login from './Login';

function Hero() {
    return (
        <div>
            
            <div class=" ">
            <nav className="fixed top-0 border-solid border-gray-200 w-full border-b py-3 bg-white z-50">
            <div className="container mx-auto ">
                <div className="w-full flex  flex-col lg:flex-row">

                    <div className=" flex justify-between lg:flex-row">
                        <a href="#" className="flex items-center">
                            ALXCARDS
                        </a>
                    </div>
                    <div className="hidden w-full lg:flex lg:pl-11" id="navbar-default-example">
                        <ul className="flex items-center flex-col mt-4 lg:mt-0 lg:ml-auto lg:flex-row gap-4">
                            <li className='text-center'>
                                <a href="/login" className="border px-4 py-2 rounded-md text-gray-700 hover:text-gray-900">
                                    Login
                                </a>
                            </li>
                            <li className='text-center'>
                                <a href="/register" className="border bg-sky-500  px-4 py-2 rounded-md text-white hover:text-gray-900">
                                    Register
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>  
        <div>
            
        </div>
            <div class="mx-auto  border px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 home">
                <div class="flex flex-col items-center justify-between lg:flex-row">
                <div class="lg:max-w-lg lg:pr-5">
                    <div class="max-w-xl">
                    <h2 class="mb-6 max-w-lg text-3xl leading-snug tracking-tight text-blue-600 sm:text-5xl sm:leading-snug">
                        <span class="my-1 inline-block font-serif font-bold text-5xl text-blue-600">AlxCards</span>
                        
                    </h2>
                    <p class="text-base text-gray-700">Personalized Flashcards for Effortless Learning</p>

                    <div>
                        <a href="https://github.com/P4ver/alxCards" target="_blank" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl m-4">
                        Explore AlxCards
                        </a>
                    </div>

                    </div>
                </div>
                <div class="relative text-blue-600 lg:ml-32 lg:w-1/2 hidden lg:block">
                    <div class="border-b-8 border-b-blue-600 max-w-lg mx-auto mb-10 bg-slate-500 bg-opacity-5 rounded-3xl">
                    <img class="w-full h-full object-contain" src="https://tech.alxafrica.com/hs-fs/hubfs/ALX%20Logo-08.png?width=1512&height=926&name=ALX%20Logo-08.png" alt="" />
                    {/* <img class="w-full h-full object-contain" src="/images/sisa0dVB-OE35qZ9CRvF2.png" alt="" /> */}
                    </div>
                </div>
                </div>
            </div>

            </div> 
        </div>
    );


}

export default Hero;
