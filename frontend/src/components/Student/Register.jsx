import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import { FaUser } from 'react-icons/fa';
import { FaPhoneAlt } from "react-icons/fa";
import { FaUserGraduate } from 'react-icons/fa';
import { FaDoorOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { MdOutlinePassword } from "react-icons/md";
import API from '../../axiosConfig';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        collegeYear: '',
        roomNo: '',
        email: '',
        password: '',
        confirmPassword: '',
        wardernName: 'noone',
        destination: 'nowhere',
        status: 'nothing'
    });
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loginPageRedirect = () => {
        navigate("/user/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMsg('Passwords do not match');
            setTimeout(() => setErrorMsg(""), 3000);
            return;
        }

        try {
            const responce = await API.post('/api/register', formData)
            // console.log('Registration successful: ', responce.data);
            if(responce.data.status === 500) {
                setErrorMsg(responce.data.message || "Registration failed");
                setTimeout(() => setErrorMsg(""), 3000);
                return;
            }
            navigate("/user/login")
        } catch (error) {
            setErrorMsg(error.response?.data?.message || error.message || "Registration failed");
            setTimeout(() => setErrorMsg(""), 3000);
        }

        setFormData({
            name: '',
            phoneNo: '',
            collegeYear: '',
            roomNo: '',
            email: '',
            password: '',
            confirmPassword: '',
            wardernName: 'noone',
            destination: 'nowhere',
            status: 'nothing'
        })
    }
    return (
        <>
            <div className='bg-gray-900 min-h-screen flex flex-col gap-2 px-4 sm:px-6 justify-center items-center relative overflow-hidden'>
                {/* Responsive background shapes */}
                <div className="right-0 top-2 absolute w-0 h-0 border-t-[40px] sm:border-t-[65px] border-t-transparent border-r-[55px] sm:border-r-[85px] border-r-lime-500 border-b-[40px] sm:border-b-[65px] border-b-transparent"></div>
                <div className="right-[-10px] sm:right-[-20px] top-16 sm:top-20 absolute w-0 h-0 border-t-[30px] sm:border-t-[50px] border-t-transparent border-r-[45px] sm:border-r-[75px] border-r-lime-600 border-b-[30px] sm:border-b-[50px] border-b-transparent"></div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-4 rounded-lg p-4 w-full max-w-xs sm:max-w-md md:max-w-lg bg-gray-950 h-fit text-white items-center text-lg relative z-10'>
                    <label htmlFor="" className='text-[25px] text-lime-200'>Register</label>
                    {/* Error message */}
                    {errorMsg && (
                        <div className="w-full text-center bg-red-500/10 border-[1px]   border-red-500/50 text-red-400 rounded py-1 mb-2 text-base animate-fade-in">
                            {errorMsg}
                        </div>
                    )}
                    <div className='flex w-full pr-3'>
                        <div className='px-2 flex items-end pb-2'><FaUser /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-none h-9 outline-none px-1 text-gray-300' placeholder='full name' type="text" name='name' value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className='flex w-full pr-3'>
                        <div className='px-2 flex items-end pb-2'><FaPhoneAlt /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-none h-9 outline-none px-1 text-gray-300' placeholder='phone No' type="text" name='phoneNo' value={formData.phoneNo} onChange={handleChange} required />
                    </div>
                    <div className='flex w-full pr-3'>
                        <div className='px-2 flex items-end pb-2'><FaUserGraduate /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-none h-9 outline-none px-1 text-gray-300' placeholder='college year' type="text" name='collegeYear' value={formData.collegeYear} onChange={handleChange} required />
                    </div>
                    <div className='flex w-full pr-3'>
                        <div className='px-2 flex items-end pb-2'><FaDoorOpen /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-none h-9 outline-none px-1 text-gray-300' placeholder='room no.' type="text" name='roomNo' value={formData.roomNo} onChange={handleChange} required />
                    </div>
                    <div className='flex w-full pr-3'>
                        <div className='px-2 flex items-end pb-2'><MdEmail /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-none h-9 outline-none px-1 text-gray-300' placeholder='email' type="text" name='email' value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='flex w-full pr-3'>
                        <div className='px-2 flex items-end pb-2'><TbPassword /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-none h-9 outline-none px-1 text-gray-300' placeholder='password' type="password" name='password' value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className='flex w-full pr-3'>
                        <div className='px-2 flex items-end pb-2'><MdOutlinePassword /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-none h-9 outline-none px-1 text-gray-300' placeholder='confirm password' type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <div className='w-full flex justify-center px-0 sm:px-14'>
                        <button className="border-2 border-black w-full py-[5px] bg-lime-400 text-black font-semibold rounded-[6px] active:scale-95" type='submit'>Register</button>
                    </div>
                    <div className='text-center text-[15px]' >
                        <p className='text-gray-500'>Already have an account? <span className='text-lime-600 hover:text-lime-400 cursor-pointer' onClick={loginPageRedirect}>Login Now</span></p>
                    </div>
                </form>
                {/* Responsive left background shapes */}
                <div className="left-0 bottom-[-10px] sm:bottom-[-15px] absolute w-0 h-0 border-t-[40px] sm:border-t-[65px] border-t-transparent border-l-[55px] sm:border-l-[85px] border-l-lime-500 border-b-[40px] sm:border-b-[65px] border-b-transparent"></div>
                <div className="left-[-3px] sm:left-[-5px] bottom-8 sm:bottom-10 absolute w-0 h-0 border-t-[30px] sm:border-t-[50px] border-t-transparent border-l-[45px] sm:border-l-[75px] border-l-lime-600 border-b-[30px] sm:border-b-[50px] border-b-transparent"></div>
            </div>
        </>
    )
}

export default Register;