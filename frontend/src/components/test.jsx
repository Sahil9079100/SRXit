import React from 'react'

export const Test = () => {
    // const [user, setUser] = useState(null);
    //   const [pendingStudent, setPendingStudent] = useState([])
    //   const navigate = useNavigate()

    //   useEffect(() => {
    //     const fetchProfile = async () => {
    //       try {
    //         const response = await axios.get("http://localhost:3000/api/wardern/profile", { withCredentials: true });
    //         setUser(response.data.userData); // Set the user data
    //       } catch (error) {
    //         console.error("Error fetching profile:", error.message);
    //         navigate("/wardern/login")
    //       }
    //     };
    //     fetchProfile();
    //   }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/api/wardern/logout", { withCredentials: true })
            navigate("/wardern/login")
        } catch (error) {
            console.log("Error during logout", error.message);
        }
    }

    const pendingStudentList = async () => {
        try {
            let list = await axios.get("http://localhost:3000/api/wardern/profile/pendingStudentList", { withCredentials: true })
            console.log(list.data.data);
            setPendingStudent(list.data.data)
        } catch (error) {
            console.log("Error during logout", error.message);
        }
    }

    return (<>
        <div className='bg-gray-600 w-full h-[100vh] absolute flex flex-col justify-between items-center p-4'>
            <div className='logo h-[30%] w-full bg-slate-400'></div>
            <div className='loginBox bg-gray-300 p-4 flex items-start w-full h-[70%]'>
                <div className='bg-yellow-500 p-2 w-full h-fit'>
                    <div className='bg-red-500 text-center'>Login</div>
                    <div>
                        <div className='p-2 flex flex-col gap-2'>
                            <input
                                className='bg-gray-300 h-9  outline-none px-2 text-black'
                                type="text"
                                name="phoneNo"
                                // value={formData.phoneNo}
                                // onChange={handleChange}
                                required
                            />
                            <input
                                className='bg-gray-400 h-9 outline-none px-2 text-black'
                                type="password"
                                name="password"
                                // value={formData.password}
                                // onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='bg-red-300 text-center'>
                        <button className="px-5 py-2 text-[14px] mr-1 bg-[#222c42] rounded-md text-lime-300 active:scale-[97%]" type="submit"
                        // onSubmit={handleSubmit}
                        >
                            Login
                        </button>
                    </div>
                    {true ? (<div className="text-red-500 bg-green-900 text-center">Dekh kia kara ha<br />Please try again</div>) : (<></>)}
                    <div >
                        <p className='text-lg'>Dont have an account? <span className='text-orange-600 hover:text-orange-400 ' 
                        // onClick={registerPageRedirect}
                        >Register Now</span></p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Test