import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react'

const Register = () => {
    const navigate = useNavigate()
    const [errorText, setErrorText] = useState("")
    const [errorTextdisplay, setErrorTextdisplay] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const loginPageRedirect = ()=>{
        navigate("/user/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Password do not match');
            return
        }

        try {
            const responce = await axios.post('http://localhost:3000/api/gatekeeper/profile/register', formData, { withCredentials: true })
            if(responce.data.status === 500){
                setErrorText(responce.data.message)
                setErrorTextdisplay(true)
                setTimeout(() => {
                    setErrorTextdisplay(false)
                    setErrorText("")
                }, 3000);
                return console.log(responce.data.message)
            }
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
            email: '',
            password: '',
            confirmPassword: '',
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6 bg-zinc-900 h-screen text-white items-center text-2xl'>
                <label htmlFor="" className='text-3xl'>Gatekeeper Register</label>
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

                {errorTextdisplay ? (<><div className='text-red-500 bg-gray-900 px-3 py-1 rounded-md outline-none text-lg'>{errorText}</div></>):(<></>)}
                {/* <div className='text-red-500 bg-gray-900 px-3 py-1 rounded-md outline-none text-lg'>User already exits with this number</div> */}
                <motion.div animate={{rotate:360}} transition={{duration:2,delay:1}}>
                    <button className="border-2 border-black px-3 py-1 bg-orange-600 rounded-md mt-4 active:scale-95" type='submit'>Register</button>
                </motion.div>
            </form>
            <div >
                <p className='text-lg'>Already have an account? <span className='text-orange-600 hover:text-orange-400 ' onClick={loginPageRedirect}>Login Now</span></p>
            </div>
        </>
    )
}

export default Register;