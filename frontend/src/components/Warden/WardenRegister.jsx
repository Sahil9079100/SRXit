import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import API from '../../axiosConfig';

const WardenRegister = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loginPageRedirect = ()=>{
        navigate("/wardern/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Password do not match');
            return
        }

        try {
            // const responce = await axios.post('https://srxitbackend-production.up.railway.app/api/wardern/register', formData, { withCredentials: true })
            const responce = await API.post('/api/wardern/register', formData)
            console.log('Registration successful: ', responce.data);
            // alert("Regiatration successful")
            navigate("/wardern/login")
        } catch (error) {
            console.log(`Error:::> ${error.responce?.data || error.message}`)
            alert("Registration failed:::>" + (error.responce?.data?.message || error.message))
        }

        setFormData({
            name: '',
            phoneNo: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6 bg-zinc-900 h-screen text-white items-center text-2xl'>
                <label htmlFor="" className='text-3xl'>Wardern Register</label>
                <div className='flex flex-col'>
                    <label>Name: </label>
                    <input className='bg-gray-300 rounded-md h-9 w-96 outline-none px-2 text-black' type="text" name='name' value={formData.name} onChange={handleChange} required />
                </div>

                <div className='flex flex-col'>
                    <label>Phone No: </label>
                    <input className='bg-gray-300 rounded-md h-9 w-96 outline-none px-2 text-black' type="text" name='phoneNo' value={formData.phoneNo} onChange={handleChange} required />
                </div>

                <div className='flex flex-col'>
                    <label>Email: </label>
                    <input className='bg-gray-300 rounded-md h-9 w-96 outline-none px-2 text-black' type="text" name='email' value={formData.email} onChange={handleChange} required />
                </div>

                <div className='flex flex-col'>
                    <label>Password: </label>
                    <input className='bg-gray-300 rounded-md h-9 w-96 outline-none px-2 text-black' type="text" name='password' value={formData.password} onChange={handleChange} required />
                </div>

                <div className='flex flex-col'>
                    <label>Confirm Password: </label>
                    <input className='bg-gray-300 rounded-md h-9 w-96 outline-none px-2 text-black' type="text" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
                </div>

                <div>
                    <button className="border-2 border-black px-3 py-1 bg-orange-600 rounded-md mt-4 active:scale-95" type='submit'>Register</button>
                </div>
            </form>
            <div >
                <p className='text-lg'>Already have an account? <span className='text-orange-600 hover:text-orange-400 ' onClick={loginPageRedirect}>Login Now</span></p>
            </div>
        </>
    )
}

export default WardenRegister