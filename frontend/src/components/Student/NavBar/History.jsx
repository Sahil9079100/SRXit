import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { HiRefresh } from "react-icons/hi";
import { useAnimate } from "motion/react";



const History = () => {

    const navigate = useNavigate()
    const [rotation, setRotation] = useState(0)
    const [personalHis, setPersonalHis] = useState([])

    const [refreshButton, animate] = useAnimate();
    // animate(".selector-here", { x: 100, y: 100 }, { duration: 1 });

    const personalHistory = async () => {
        console.log("running")
        try {
            const responce = await axios.get("http://localhost:3000/api/profile/personalHistory", { withCredentials: true })
            const data = responce.data.personalHistory
            setPersonalHis(data)
            console.log(responce.data.personalHistory)
        } catch (error) {
            console.log("tryCatch error-> ", error)
        }
    }

    useEffect(() => {
        personalHistory()
    }, [])

    return (<>
        <div className='overflow-hidden flex flex-col absolute w-full bg-red-400'>
            <div className="nav bg-gray-950 flex justify-between">
                <div className='flex'>
                    <div onClick={() => navigate("/user/profile")} className='text-lime-300 flex  text-xl px-4 py-[15px] items-center'><IoChevronBack /></div>
                    <div className='text-lime-300 text-lg font-semibold flex items-center'>History</div>
                </div>
                <div onClick={() => {
                    const newRotation = rotation - 360
                    setRotation(newRotation)
                    animate(refreshButton.current, { rotate: newRotation }, { duration: 1 })
                    personalHistory()
                }} ref={refreshButton} className='ree text-lime-300 text-2xl flex px-4 items-center '><HiRefresh /></div>
            </div>
            <div className='bg-green-500 w-full h-fit'>
                <div className='bg-gray-900 w-full h-[93vh] flex flex-col gap-3 p-3 overflow-scroll'>
                    {personalHis ? (
                        <>
                            {personalHis.length > 1 ? (<>
                                {personalHis.map(function (elem, idx) {
                                    return <div key={elem._id} className='bg-gray-950 flex flex-col p-2 border-[1px] border-opacity-50 rounded-[7px] border-lime-300'>
                                        {/* <div className='w-fit text-white'>In t<span className='text-lime-200'>{idx}</span></div> */}
                                        <div className='w-fit text-white'>Destination: <span className='text-lime-200'>{elem.destination}</span></div>
                                        <div className='w-fit text-white'>Wardern: <span className='text-lime-200'>{elem.wardernname}</span></div>
                                        <div className='w-fit text-white'>Out time: <span className='text-lime-200'>{elem.goouttime}</span></div>
                                        <div className='w-fit text-white'>In time: <span className='text-lime-200'>{elem.comeintime}</span></div>
                                    </div>
                                })
                                }
                            </>) : <><div className='flex justify-center items-center h-screen text-gray-600'>No history yet</div></>}
                        </>
                    ) : <div className='flex justify-center items-center h-screen bg-zinc-900'>
                        <Loding />
                    </div>}

                </div>
            </div>
        </div>
    </>)
}

export default History

{/* <div className='flex justify-center items-center h-screen text-gray-600'>No history yet</div> */ }