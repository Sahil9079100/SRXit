import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loding from './Loding/Loding.jsx'
import axios from 'axios';
import API from '../axiosConfig.js';

const Home = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        ckeckIfCookie()
    }, [])

    const ckeckIfCookie = async () => {

        try {
            // const coo = await axios.get("https://srxitbackend-production.up.railway.app/api/checkCookie", { withCredentials: true })
            const coo = await API.get("/api/checkCookie")
            // console.log(coo.data.status)
            if (coo.data.status === 201) navigate("/user/profile")
            else if (coo.data.status === 202) navigate("/wardern/profile")
            else if (coo.data.status === 203) navigate("/gatekeeper/profile")
            else(setLoading(true))
            console.log(coo.data.status)
        } catch (error) {
            console.log("Error checking cookie:", coo.data.message);
        }
    }

    return (
        <>
            {loading ? (<>
                <section className="min-h-screen w-full bg-gray-950 flex flex-col items-center justify-center px-4">
                    <div className='w-full  bg-gray-950 borderr border-gray-800 rounded-md py-3 mt-[-40px]'>
                        {/* <h3 className='px-3 text-xl md:text-5xl text-lime-300 mb-1'>
                        Welcome to
                    </h3> */}
                        <h1 className=" bg--300 text-center tracking-[20px] text-4xl md:text-5xl font-extrabold text-lime-300 ">
                            <span className='font-normal pl-4'>-</span>SRXit<span className='font-normal'>-</span>
                        </h1>
                    </div>

                    <hr className='border-1 my-3 opacity-35 border-lime-300 w-[100vw]' />

                    <div className="bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-16 flex flex-col items-center max-w-xl w-full mb-36 mt-20">
                        {/* <h1 className="text-3xl md:text-5xl font-extrabold text-lime-300 text-center mb-">
                        Welcome to the Outpass Management System
                    </h1> */}
                        {/* <p className="text-xl  md:text-xl text-lime-300 text-center mb-2">
                        Your one-stop solution for managing outpasses
                    </p> */}
                        <p className="text-base md:text-lg text-purple-300 text-center mb-10 font-mono">
                            Please select your role to proceed:
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <button
                                onClick={() => { navigate("/user/login") }}
                                type="button"
                                className="flex-1 bg-[#26d4ff27] hover:bg-cyan-700 border-2 hover:text-white border-cyan-600 text-cyan-200 font-semibold py-3 rounded-lg transition-colors text-center shadow-md focus:outline-none focus:bg-cyan-700 focus:text-white"
                            >
                                Student
                            </button>
                            <button
                                onClick={() => { navigate("/wardern/login") }}
                                type="button"
                                className="flex-1 bg-[#2564eb1f] hover:bg-blue-700 border-2 hover:text-white border-blue-600 text-blue-200 font-semibold py-3 rounded-lg transition-colors text-center shadow-md focus:outline-none focus:bg-blue-700 focus:text-white"
                            >
                                Warden
                            </button>
                            <button
                                onClick={() => { navigate("/gatekeeper/login") }}
                                type="button"
                                className="flex-1 bg-[#0d948923] hover:bg-teal-700 border-2 hover:text-white border-teal-600 text-teal-200 font-semibold py-3 rounded-lg transition-colors text-center shadow-md focus:outline-none focus:bg-teal-700 focus:text-white"
                            >
                                Gatekeeper
                            </button>
                            <button
                                onClick={() => { navigate("/visitor") }}
                                type="button"
                                className="flex-1 bg-[#570d9423] hover:bg-purple-500 border-2 hover:text-white border-purple-600 text-purple-200 font-semibold py-3 rounded-lg transition-colors text-center shadow-md focus:outline-none focus:bg-purple-700 focus:text-white"
                            >
                                Visitor
                            </button>
                        </div>
                    </div>
                </section>
            </>) : (<>
                <div className='flex justify-center items-center h-screen bg-zinc-900'>
                    <Loding />
                </div>
            </>)}
        </>
    );
};
export default Home