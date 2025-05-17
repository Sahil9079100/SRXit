import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";


const Login = () => {

    const [errormessage, setErrormessage] = useState("")
    const [errordisplay, setErrordisplay] = useState(false)
    const [noPhone, setnoPhone] = useState(null)
    const [noPass, setnoPass] = useState(null)
    const [show, setshow] = useState(true)

    const [formData, setFormData] = useState({
        phoneNo: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }


    const registerPageRedirect = () => {
        navigate("/user/register")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // if (formData.phoneNo == '') {
        //     setnoPhone(true)
        //     setTimeout(() => {
        //         setnoPhone(false)
        //     }, 3000);
        //     return 0
        // }

        if (formData.password == '' || formData.phoneNo == '') {
            setnoPass(true)
            setTimeout(() => {
                setnoPass(false)
            }, 3000);
            return 0
        }

        // return console.log(formData.phoneNo)
        try {
            // console.log(formData);
            const response = await axios.post("http://localhost:3000/api/login", formData, { withCredentials: true })
            console.log('Login successful:', response.data.message, response.data.status)
            if (response.data.status === 200) {
                navigate("/user/profile")
                setErrordisplay(false)
            }
            // alert("Login Success ok")
        } catch (error) {
            console.log("Error Login.jsx :::>", error.response.data.message)
            setErrormessage(error.response.data.message)
            setErrordisplay(true)
            setTimeout(() => {
                setErrordisplay(false)
                setErrormessage('')
            }, 3000);
            // alert('Login Failed')
        }
    }
    return (
        <>
            <div className='bg-gray-900 w-full h-[100vh] absolute flex flex-col justify-between items-center p-'>
                <div className='logo h-[30%] w-full bg-slate'></div>
                <div className='loginBox bg-gray- p-6 flex flex-col justify-between items-start w-full h-[70%]'>
                    <div className='bg-gray-950 p-2 w-full h-fit rounded-xl'>
                        <div className='bg-red- text-center text-2xl font-semibold pt-2 text-lime-300 my-3 tracking-[4px]'>Login</div>
                        <div>
                            <div className='p-2 flex flex-col gap-1'>
                                <input
                                    className='bg-gray-900 h-9 rounded-t-lg outline-none px-2 py-5 focus:bg-gray-800 text-white'
                                    type="number"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    placeholder='enter your phone number'
                                    required
                                />
                                {noPhone ? (<div className="text-red-600 text-center text-[15px]">Enter a phone number</div>) : (null)}

                                <div className='bg-gray-900 rounded-b-lg flex'>
                                    <input
                                        className='bg-gray-900 h-9 rounded-bl-lg outline-none px-2 py-5 focus:bg-gray-800 text-white'
                                        type={show ? ("password") : ("text")}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='enter your password'
                                        required
                                    />
                                    <div onClick={() => { setshow(!show); }} className="bg-gray-900  w-full rounded-b-lg text-neutral-500 text-2xl flex items-center justify-center">
                                        {show ? (<LuEye />) : (<LuEyeClosed />)}
                                    </div>
                                </div>
                                {noPass ? (<div className="text-red-600 text-center text-[15px]">Enter a username or password</div>) : (<div className="text-red-600 text-center h-6 text-[15px]"></div>)}
                            </div>

                        </div>

                        <div className='text-center'>
                            <button className="px-9 py-[8px] font-semibold tracking-[3px] text-[17px] mr-1 bg-gray-900 rounded-md text-lime-300 active:scale-[97%]" type="submit"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </div>
                        {errordisplay ? (<div className="text-red-600 text-center mt-2 text-md">{errormessage}</div>) : (<div className="h-7"></div>)}
                        <div className='bg-red-20 text-center text-sm mt-4'>
                            <p className='text-gray-400 opacity-90'>Dont have an account? <span className='text-lime-500 opacity-80 hover:text-lime-300 '
                                onClick={registerPageRedirect}
                            >Register Now</span></p>
                        </div>
                    </div>
                </div>
                <div className='mb-4 text-center'>
                    <div className='text-gray-300 text-sm opacity-65'>- Know more about <span className='text-lime-300'>SRXit</span> -<br />- About <span className='text-lime-300'>Developers -</span></div>
                </div>
            </div>
        </>
    )
}

export default Login