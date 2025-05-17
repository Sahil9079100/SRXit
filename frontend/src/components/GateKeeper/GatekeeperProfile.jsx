import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loding from '../Loding/Loding.jsx'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { IoIosLogOut } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Loding2 from '../Loding/Loding2.jsx'
// import WardernDropdown from './WardenDropdown/WardenDropdown.jsx'

const StudentProfile = () => {
    // const [isAccepct, setIsAccepct] = useState(true);
    // const [decline, setDecline] = useState(false);
    // const [declineText, setDeclineText] = useState("");
    // const [sent, setSent] = useState(true);
    // const [noWarden, setNoWarden] = useState()
    const [user, setUser] = useState(null);
    const [scanQrpage, setScanQrpage] = useState(true);
    const [liveDatapage, setLiveDatapage] = useState(null);
    const [historypage, setHistorypage] = useState(null);
    const [qrdatascan, setQrdatascan] = useState(null)
    const [livestudents, setLivestudents] = useState([])
    const [historyArray, setHistoryArray] = useState([])

    const [menuButton1, setMenuButton1] = useState(true)
    const [menuButton2, setMenuButton2] = useState(false)
    const [nav, setNav] = useState(false)




    const [errorscanning, setErrorscanning] = useState(false)
    const [errormessage, setErrormessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [successMessagedisplay, setSuccessMessagedisplay] = useState(false)
    const navigate = useNavigate()


    const addStudent = async (qrdata) => {
        try {
            const responce = await axios.post("http://localhost:3000/api/gatekeeper/profile/addStudent", qrdata, { withCredentials: true })
            console.log("RESPONCE DATA: ", responce.data.message)
            if (responce.data.status === 500) {
                setErrormessage(responce.data.message)
                setErrorscanning(true)
                setTimeout(() => {
                    setErrorscanning(false)
                }, 5000);
                return 0
            }
            if (responce.data.status === 200) {
                setSuccessMessage(responce.data.message)
                setSuccessMessagedisplay(true)
                setTimeout(() => {
                    setSuccessMessagedisplay(false)
                }, 5000);
            }
        } catch (error) {
            console.log(error)
            setErrorscanning(true)
        }
        // return console.log(phoneNo, qrkey)
    }

    function scanQrFunction() {
        setErrorscanning(false)
        console.log("open camera and scan");
        const Scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 2,
        })
        Scanner.render(qrsuccess, qrerror)
        function qrsuccess(result) {
            Scanner.clear()
            console.log(result)
            let qrdata = JSON.parse(result)
            addStudent(qrdata)
            setQrdatascan(result)
        }
        function qrerror(err) {
            console.log(err);
        }
    }



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/gatekeeper/profile/studentProfileController", { withCredentials: true });
                setUser(response.data.userData); // Set the user data
                console.log("profile useeffect", response.data.userData);

            } catch (error) {
                // console.log(response.data)
                console.error("Error fetching profile:", error.message);
                navigate("/gatekeeper/login")
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:3000/api/gatekeeper/profile/logout", { withCredentials: true })
            navigate("/gatekeeper/login")
        } catch (error) {
            console.log("Error during logout", error.message);
        }
    }


    //   const QRcodePage = async ()=>{
    //     setTimeout(() => {
    //       navigate("/user/profile/qrcode")
    //     }, 3000);
    //     // navigate("/user/profile/qrcode")
    //   }

    const getHiatory = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/gatekeeper/profile/historyStudent", { withCredentials: true })
            console.log("histotry", response.data.historyStudent)
            setHistoryArray(response.data.historyStudent)
        } catch (error) {
            console.log(error)
        }
    }
    const getLiveStudents = async (req, res) => {
        if (!user) return console.log("check status is working but USER is not here");
        try {
            const response = await axios.get("http://localhost:3000/api/gatekeeper/profile/livestudents", { withCredentials: true })
            console.log(response.data.livestudents)
            setLivestudents(response.data.livestudents)
        } catch (error) {
            console.log(error)
        }


    }

    // useEffect(() => {
    //     if (!user) return;
    //     const interval = setInterval(async () => {
    //         // getLiveStudents();

    //         // console.log("set interwel running");

    //     }, 2000);

    //     return () => clearInterval(interval)
    // }, [user]);



    function scanqrpageFUNC() {
        console.log("scanqr page")
        setScanQrpage(true)
        setLiveDatapage(false)
        setHistorypage(false)
    }
    function livedataFUNC() {
        console.log("live data page")
        getLiveStudents();
        setScanQrpage(false)
        setLiveDatapage(true)
        setHistorypage(false)
    }
    function historyFUNC() {
        getHiatory()
        console.log("history page ")
        setScanQrpage(false)
        setLiveDatapage(false)
        setHistorypage(true)
    }

    function menubutton1() {
        setMenuButton2(true)
        setMenuButton1(false)
        setNav(true)
    }
    function menubutton2() {
        setMenuButton2(false)
        setMenuButton1(true)
        setNav(false)
    }
    const navClose = () => {
        setMenuButton2(false)
        setMenuButton1(true)
        setNav(false)
    }

    return (
        <>
            {user ? (
                <>
                    <div className='main bg-black h-screen overflow-hidden'>
                        {nav ? (<>
                            <div className='bg--200 w-full flex h-full absolute'>
                                <div onClick={navClose} className='w-[35%] h-full backdrop-blur-[2px]'></div>
                                <div className='w-[65%] h-full bg-gray-900 text-slate-100 flex flex-col justify-between'>
                                    <div className='flex flex-col gap-3 text-lg px-2 '>
                                        <div onClick={() => { scanqrpageFUNC(); navClose(); }} className='px-3 pt-5 py-1'>Scan Qrcode</div>
                                        <hr className='border-lime-300 border px-3 opacity-35' />
                                        <div onClick={() => { livedataFUNC(); navClose(); }} className='px-3 py-1'>Live Student</div>
                                        <hr className='border-lime-300 border px-3 opacity-35' />
                                        <div onClick={() => { historyFUNC(); navClose(); }} className='px-3 py-1'>History</div>
                                        <hr className='border-lime-300 border px-3 opacity-35' />
                                    </div>
                                    <div className='bg-gray-800 w-full px-4 py-3 flex text-lg justify-between items-center'>
                                        <button onClick={handleLogout} className="">Logout</button>
                                        <IoIosLogOut className='text-[27px]' />
                                    </div>
                                </div>
                            </div>
                        </>) : (null)}

                        <div className='flex justify-between items-center'>
                            <div className='text-orange-100 pl-5 py-3 text-2xl font-medium'>Welcome, {user.name}</div>
                            {menuButton1 ? (<>
                                <AiFillThunderbolt onClick={menubutton1} className='text-lime-500 active:text-lime-300 mx-5 text-2xl' />
                            </>) : (<></>)}
                            {menuButton2 ? (<>
                                <AiOutlineThunderbolt onClick={menubutton2} className='text-lime-500 active:text-lime-300 mx-5 text-2xl' />
                            </>) : (<></>)}
                        </div>
                        <hr className='border-lime-600' />
                        {/* <div className='flex justify-between gap-3 px-3 py-2'>
                            <button onClick={scanqrpageFUNC} className='border-2 border-black px-2 py-1 bg-orange-600 rounded-md active:scale-95 font-bold text-md'>Scan Qrcode</button>
                            <button onClick={livedataFUNC} className='border-2 border-black px-2 py-1 bg-orange-600 rounded-md active:scale-95 font-bold text-md'>Live Student</button>
                            <button onClick={historyFUNC} className='border-2 border-black px-2 py-1 bg-orange-600 rounded-md active:scale-95 font-bold text-md'>History</button>
                        </div> */}
                        {/* errorscanning */}
                        {/* successMessagedisplay */}
                        {scanQrpage ? (
                            <div className='bg-gray-950 w-full h-full flex flex-col justify-center text-center'>
                                <div className='w-full h-[60%] flex justify-center items-center'>
                                    <div id="reader" className=' text-lime-300 w-full h-fit'></div>
                                </div>
                                <div className='w-full h-[40%] justify-start flex flex-col'>
                                    <button onClick={scanQrFunction} className='border-2  border-lime-400 mx-28 mb-3 mt-4  px-2 py-2 bg-[#9cff2a34] text-lime-400 rounded-md active:scale-95 font-bold text-md'>Scan QR</button>
                                    {errorscanning ? (<><div className='text-red-500 text-lg mx-6'>{errormessage}<br />Please try again</div></>) : (null)}
                                    {successMessagedisplay ? (<><div className='text-green-500 text-lg mx-6'>{successMessage}hajsdgahgf</div></>) : (null)}
                                </div>
                            </div>
                        ) : (<></>)}

                        {liveDatapage ? (<div className='bg-white w-full h-[100vh]'>
                            {livestudents.length > 0 ? (
                                <>
                                    <div className='p-3 flex flex-col gap-3 bg-gray-950 border-2 h-full border-gray-950 w-full overflow-hidden flex-wrap gray text-white'>
                                        {livestudents.map(function (elem) {
                                            return <div key={elem.phoneNo} className='flex flex-col border-gray-700  h-fit border-[0.8px] rounded-md p-2 text-center w-full bg-gray-800'>
                                                <div className='text-start'>
                                                    <h1 className='text-[15px]'>Name: <span className="font-bold">{elem.name}</span></h1>
                                                    <h1 className='text-[13px]'>PhoneNo: {elem.phoneNo}</h1>
                                                    <h1 className='text-[13px]'>College Year: {elem.collegeYear}</h1>
                                                    <h1 className='text-[13px]'>RoomNo: {elem.roomNo}</h1>
                                                    <h1 className='text-[13px]'>Destination: {elem.destination}</h1>
                                                    <h1 className='text-[13px]'>Wardern Name: {elem.wardenname}</h1>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </>) : (
                                <>
                                    <div className='bg-gray-950 h-full overflow-scroll flex justify-center pt-20 text-gray-600 text-lg'>
                                        No student is outside
                                    </div>
                                </>)}



                        </div>
                        ) : (<></>)}

                        {historypage ? (<div className='bg-white w-full h-[92.5vh]'>
                            {historyArray.length > 0 ? (
                                <>
                                    <div className='p-3 flex flex-col gap-3 bg-gray-950 border-2 h-full border-gray-950 w-full overflow-y-auto gray text-white'>
                                        {historyArray.map(function (elem, idx) {
                                            return <div key={idx} className='flex flex-col border-gray-700  h-fit border-[0.8px] rounded-md p-2 text-center w-full bg-gray-800'>
                                                <div className='text-start'>
                                                    <h1 className='text-[15px]'>Name: <span className="font-bold">{elem.name}</span></h1>
                                                    <h1 className='text-[13px]'>PhoneNo: {elem.phoneNo}</h1>
                                                    <h1 className='text-[13px]'>College Year: {elem.collegeYear}</h1>
                                                    {/* <h1 className='text-[13px]'>RoomNo: {elem.roomNo}</h1> */}
                                                    <h1 className='text-[13px]'>Destination: {elem.destination}</h1>
                                                    <h1 className='text-[13px]'>Wardern Name: {elem.wardernname}</h1>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </>) : (
                                <>
                                    <div className='bg-gray-950 h-full overflow-scroll flex flex-col gap-4 justify-center items-center pt-20 text-gray-500 text-lg'>
                                        <Loding2/>
                                        Loding history
                                    </div>
                                </>)}
                        </div>
                        ) : (<></>)}

                        {/* <div className="bg-black w-full fixed bottom-0">
                            <button onClick={handleLogout} className="m-2 border-2 border-black px-3 py-1 bg-orange-600 rounded-md active:scale-95 font-bold">Logout</button>
                        </div> */}
                    </div>
                </>
            ) : (
                <>
                    <div className='flex justify-center items-center h-screen bg-zinc-900'>
                        <Loding />
                    </div>
                </>
            )}
        </>
    )
}

export default StudentProfile