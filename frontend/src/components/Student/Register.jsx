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


// import RoomIcon from '@mui/icons-material/Room';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const navigate = useNavigate()
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
    })

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
            alert('Password do not match');
            return
        }

        try {
            // console.log(formData)
            const responce = await axios.post('http://localhost:3000/api/register', formData, { withCredentials: true })
            console.log('Registration successful: ', responce.data);
            // alert("Regiatration successful")
            navigate("/user/login")
        } catch (error) {
            console.log(`Error:::> ${error.responce?.data || error.message}`)
            alert("Registration failed:::>" + (error.responce?.data?.message || error.message))
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
            <div className='bg-gray-900 flex h-screen flex-col gap-2 px-6 justify-center items-center absolute overflow-hidden'>
                <div className="right-0 top-2 absolute w-0 h-0 border-t-[65px] border-t-transparent border-r-[85px] border-r-lime-500 border-b-[65px] border-b-transparent"></div>
                <div className="right-[-20px] top-20 absolute w-0 h-0 border-t-[50px] border-t-transparent border-r-[75px] border-r-lime-600 border-b-[50px] border-b-transparent"></div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-4 rounded-lg p-4 w-full bg-gray-950 max-w-[60vh] h-fit text-white items-center text-lg '>
                    <label htmlFor="" className='text-[25px] text-lime-200'>Register</label>
                    <div className='flex w-full bg--400 pr-3'>
                        <div className='px-2 flex items-end pb-2'><FaUser /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-[0px] h-9 outline-none px-1 place text-gray-300' placeholder='full name' type="text" name='name' value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className='flex w-full bg--400 pr-3'>
                        {/* <label>Phone No: </label> */}
                        <div className='px-2 flex items-end pb-2'><FaPhoneAlt /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-[0px] h-9 outline-none px-1 place text-gray-300' placeholder='phone No' type="text" name='phoneNo' value={formData.phoneNo} onChange={handleChange} required />
                    </div>

                    <div className='flex w-full bg--400 pr-3'>
                        <div className='px-2 flex items-end pb-2'><FaUserGraduate /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-[0px] h-9 outline-none px-1 place text-gray-300' placeholder='college year' type="text" name='collegeYear' value={formData.collegeYear} onChange={handleChange} required />
                    </div>

                    <div className='flex w-full bg--400 pr-3'>
                        <div className='px-2 flex items-end pb-2'><FaDoorOpen /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-[0px] h-9 outline-none px-1 place text-gray-300' placeholder='room no.' type="text" name='roomNo' value={formData.roomNo} onChange={handleChange} required />
                    </div>

                    <div className='flex w-full bg--400 pr-3'>
                        <div className='px-2 flex items-end pb-2'><MdEmail /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-[0px] h-9 outline-none px-1 place text-gray-300' placeholder='email' type="text" name='email' value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className='flex w-full bg--400 pr-3'>
                        <div className='px-2 flex items-end pb-2'><TbPassword /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-[0px] h-9 outline-none px-1 place text-gray-300' placeholder='password' type="password" name='password' value={formData.password} onChange={handleChange} required />
                    </div>

                    <div className='flex w-full bg--400 pr-3'>
                        <div className='px-2 flex items-end pb-2'><MdOutlinePassword /></div>
                        <input className='bg-gray-950 border-b-2 ml-1 border-gray-500 w-full rounded-[0px] h-9 outline-none px-1 place text-gray-300' placeholder='confirm password' type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
                    </div>

                    <div className='bg-pink- w-full flex justify-center px-14'>
                        <button className="border-2 border-black w-full  py-[5px] bg-lime-400 text-black font-semibold rounded-[6px] active:scale-95" type='submit'>Register</button>
                    </div>
                    {/* <div class=""></div> */}
                    <div className='bg--100 text-center text-[15px]' >
                        <p className='text-gray-500'>Already have an account? <span className='text-lime-600 hover:text-lime-400 ' onClick={loginPageRedirect}>Login Now</span></p>
                    </div>
                </form>
                <div className="left-0 bottom-[-15px] absolute w-0 h-0 border-t-[65px] border-t-transparent border-l-[85px] border-l-lime-500 border-b-[65px] border-b-transparent"></div>
                <div className="left-[-5px] bottom-10 absolute w-0 h-0 border-t-[50px] border-t-transparent border-l-[75px] border-l-lime-600 border-b-[50px] border-b-transparent"></div>
            </div>
        </>
    )
}

export default Register;