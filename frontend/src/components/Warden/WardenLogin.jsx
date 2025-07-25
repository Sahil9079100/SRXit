import React from 'react'
import { useState } from 'react'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import API from '../../axiosConfig'

const WardernLogin = () => {
    const [formData, setFormData] = useState({
        phoneNo:'',
        password:''
    })
    const navigate = useNavigate()
    const handleChange= (e)=>{
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value})
    }

    const registerPageRedirect = ()=>{
        navigate("/wardern/register")
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()

        try {
            // console.log(formData);
            // const response = await axios.post("https://srxitbackend-production.up.railway.app/api/wardern/login", formData, {withCredentials: true})
            const response = await API.post("/api/wardern/login", formData)
            console.log('Login successful:', response.data.message, response.data.status)
            if (response.data.status === 200) {
                navigate("/wardern/profile")
            }
            // alert("Login Success ok")
        } catch (error) {
            console.log("Error Login.jsx :::>", error)
            // alert('Login Failed')
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 p-6 bg-zinc-900 h-screen text-white items-center text-2xl'>
                <label htmlFor="" className='text-3xl'>Wardern Login</label>
                <div className='flex flex-col'>
                    <label>Phone No: </label>
                    <input
                        className='bg-gray-300 rounded-md h-9 w-96 outline-none px-2 text-black'
                        type="text"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <label>Password: </label>
                    <input
                        className='bg-gray-300 rounded-md h-9 w-96 outline-none px-2 text-black'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <button className="border-2 border-black px-3 py-1 bg-orange-600 rounded-md mt-4 active:scale-95" type="submit">
                        Login
                    </button>
                </div>
                <div >
                    <p className='text-lg'>Dont have an account? <span className='text-orange-600 hover:text-orange-400 ' onClick={registerPageRedirect}>Register Now</span></p>
                </div>
            </form>
        </>
    )
}

export default WardernLogin