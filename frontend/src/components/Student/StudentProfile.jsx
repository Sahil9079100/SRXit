import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loding from '../Loding/Loding.jsx'
import { AiFillThunderbolt } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import Loding2 from '../Loding/Loding2.jsx'
import { IoIosLogOut } from "react-icons/io";
import { motion } from 'motion/react'
import { IoMdNotifications } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";

{/* <IoIosNotificationsOutline /> */ }
{/* <IoMdNotifications /> */ }


// import WardernDropdown from './WardenDropdown/WardenDropdown.jsx'

const StudentProfile = () => {
  const [isAccepct, setIsAccepct] = useState(true);
  const [decline, setDecline] = useState(false);
  const [declineText, setDeclineText] = useState("");
  const [user, setUser] = useState(null);
  const [sent, setSent] = useState(false);
  const [demo, setdemo] = useState("");
  const [noWarden, setNoWarden] = useState()
  const [noDesti, setNoDesti] = useState()
  const [wardernList, setWardernList] = useState([])
  const [nav, setNav] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const navigate = useNavigate()

  const [menuButton1, setMenuButton1] = useState(true)
  const [menuButton2, setMenuButton2] = useState(false)

  const [SendRequestData, setSendRequestData] = useState({
    wardenName: '',
    destination: ''
  })

  const [desti, setDesti] = useState("")

  const handleChange = (e) => {
    // const { name, value } = e.target
    const destii = e.target.value
    setDesti(destii)
    // console.log(desti)
    // setSendRequestData({ ...SendRequestData, [name]: value })
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", { withCredentials: true });
        setUser(response.data.userData); // Set the user data
      } catch (error) {
        // console.log(response.data)
        console.error("Error fetching profile:", error.message);
        navigate("/user/login")
      }
    };

    const fetchWarden = async () => {
      // setTimeout(async () => {
      //   try {
      //     const responce = await axios.get("http://localhost:3000/api/wardernList", { withCredentials: true });
      //     setWardernList(responce.data.wardernlistData)
      //     // console.log(responce.data.wardernlistData)
      //   } catch (error) {
      //     console.error("Error while fetching wardern list::> ", error)
      //   }
      // }, 8000);
      try {
        const responce = await axios.get("http://localhost:3000/api/wardernList", { withCredentials: true });
        setWardernList(responce.data.wardernlistData)
        // console.log(responce.data.wardernlistData)
      } catch (error) {
        console.error("Error while fetching wardern list::> ", error)
      }
    }

    fetchProfile();
    fetchWarden();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/logout", { withCredentials: true })
      navigate("/user/login")
    } catch (error) {
      console.log("Error during logout", error.message);
    }
  }

  const handleSubmit = async (SendRequestData) => {
    // if(SendRequestData.wardenName === '' || SendRequestData.wardenName == null){
    //   setNoWarden(true)
    // }
    try {
      console.log("Data is: ", SendRequestData)
      // return 0
      const response = await axios.post("http://localhost:3000/api/profile/sendRequest", SendRequestData, { withCredentials: true })
      console.log(response.data.message)
      if (response.data.status === 200) {
        setIsDisabled(true)
        setdemo(response.data.message)
        setSent(true)
        setTimeout(() => {
          setdemo('')
          setSent(false)
        }, 3000);
      }
      if (response.data.status === 500) {
        setIsDisabled(true)
        setdemo(response.data.message)
        setSent(true)
        setTimeout(() => {
          setdemo('')
          setSent(false)
        }, 3000);
      }
      setNoWarden(false)
    } catch (error) {
      console.log("Error studentprofile.jsx :::>", error)
    }
  }

  const QRcodePage = async () => {
    setTimeout(() => {
      navigate("/user/profile/qrcode")
    }, 3000);
    // navigate("/user/profile/qrcode")
  }

  const checkStatus = async (req, res) => {
    try {
      let ook = user.phoneNo
      let phoneNo = { ook }
      const response = await axios.post("http://localhost:3000/api/profile/checkStatus", phoneNo, { withCredentials: true })
      if (response.data.status === 200) {
        // setdemo(response.data.message)
        setIsAccepct(false)
        console.log("accepted")
        QRcodePage()
        // generateORcode()
      }
      if (response.data.status === 201) {
        setDeclineText(response.data.message)
        setDecline(true)
        setIsAccepct(true)
        // setIsAccepct(false)
        console.log("declined")
      }
      if (response.data.status === 500) {
        setDecline(false)
        setIsAccepct(true)
        setDeclineText("response.data.message")
        return console.log("pending or none")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      checkStatus();
      // console.log("set interwel running");

    }, 1000);

    return () => clearInterval(interval)
  }, [user]);

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

  function addWardernName(name) {

    if (desti == '') {
      console.log("select desti")
      setNoDesti(true); // Show error message
      setTimeout(() => {
        setNoDesti(false); // Hide error message after 5 seconds
      }, 5000);
      return; // Stop execution if destination is not filled
    }

    const SendRequestData = { name, desti }

    console.log("selected wardern name", name);

    handleSubmit(SendRequestData)
  }

  const navClose = () => {
    setMenuButton2(false)
    setMenuButton1(true)
    setNav(false)
  }

  const ook = []
  return (
    <>
      {isAccepct ? (
        <>
          {user ? (
            <>
              <div className='overflow-hidden flex absolute w-full'>
                <div className='main bg-gray-950 h-screen w-full'>
                  <div className='flex items-center justify-between'>
                    <div className='text-lime-200 pl-5 py-3 pt-4 text-2xl font-medium'>Hi, <span className='font-extrabold'>{user.name}</span> 👋</div>
                    {/* <GoZap className='text-lime-500 active:text-lime-300 mx-5 text-2xl' /> */}

                    {/* <AiFillThunderbolt onClick={menubutton1} className='text-lime-500 active:text-lime-300 mx-5 text-2xl' /> */}

                    {menuButton1 ? (<>
                      <AiFillThunderbolt onClick={menubutton1} className='text-lime-500 active:text-lime-300 mx-5 text-2xl' />
                    </>) : (<></>)}
                    {menuButton2 ? (<>
                      <AiOutlineThunderbolt onClick={menubutton2} className='text-lime-500 active:text-lime-300 mx-5 text-2xl' />
                    </>) : (<></>)}

                  </div>
                  <hr className='border-lime-600 border-[1.3px]' />
                  {/* <hr className='border-lime-900 border-[1.7px]' /> */}

                  <form onClick={(e) => e.preventDefault()} className='flex flex-col mx-[5%] mt-8'>
                    {/* <label className='text-white my-2 text-xl'>Choose your Warden:</label>
                  <select onChange={handleChange} id="wardernName" name="wardenName" className='text-xl px-3 py-2 rounded-md bg-zinc-900 text-white border-2 border-orange-600 outline-none'>
                    <option value="none" selected hidden className='text-orange-500'>{SendRequestData.wardenName}</option>
                    <option value="man singh">Man Singh</option>
                    <option value="Kailash">Kailash</option>
                    <option value="choti nunni">Choti nunni</option>
                    <option value="krishna">Krishna</option>
                  </select> */}


                    {/* <label className='text-white my-2 text-xl mt-10' >Enter your Destination:</label> */}
                    <input
                      id='destiInput'
                      className='bg-gray-900 rounded-md h-9 outline-none px-3 text-lime-100 text-xl p-6 focus:bg-gray-800'
                      type="text"
                      name="destination"
                      value={desti}
                      onChange={handleChange}
                      placeholder='Enter your destination...'
                      required
                    />
                    {noWarden ? (<><div className='mt-3 text-center text-red-600'>Please choose a Warden</div></>) : null}
                    {noDesti ? (<><div className='mt-3 text-center text-red-600'>Please enter a Destination</div></>) : null}

                    {sent ? (<><div className='text-green-600 text-lg mt-5 text-center'>{demo}</div>
                    </>) : null}

                    {decline ? (<>
                      <div className='text-red-500 text-lg mt-5 text-center'>{declineText}</div></>) : null}
                    {/* <div className='text-center'>
                    <button className="border-2 border-black px-7 py-2 bg-orange-600 rounded-md mt-4 active:scale-95 font-semibold text-2xl" type="submit">
                      Send Request
                    </button>
                  </div> */}
                  </form>
                  <h1 className='text-slate-200 px-5 mt-5 mb-3'>Select your wardern</h1>
                  <div className="w-full h-[75vh] overflow-scroll text-slate-200  flex flex-col gap-3 px-5 py-3">
                    {wardernList.length > 0 ? (<>
                      {wardernList.map(function (elem, idx) {
                        return <div key={elem._id} className='bg-gray-900 p-3 rounded-lg flex items-center justify-between'>
                          <div>
                            <h1 className="font-semi-bold text-xl">{elem.name}</h1>
                            <h1 className='opacity-40'>Phone No: {elem.phoneNo}</h1>
                          </div>
                          <button onClick={() => { addWardernName(elem.name) }} className="px-3 py-2 text-[14px] mr-1 bg-[#222c42] rounded-lg text-lime-300 active:scale-[97%]">Send Request</button>
                        </div>
                      })}
                    </>) : (<>
                      <div className='w-full h-full flex justify-center items-center'>
                        <div className='text-gray-500'>No wardern yet</div>
                        {/* <Loding2 /> */}
                      </div>
                    </>)}
                  </div>
                  {/* <button onClick={handleLogout} className="m-2 border-2 border-black px-3 py-1 bg-yellow-600 rounded-md mt-4 active:scale-95 fixed bottom-0 font-bold">Logout</button> */}
                </div>
              </div>

              {nav ? (<>
                <div className=' w-full absolute h-[91.7vh] bottom-0 z-10 flex'>
                  <div onClick={navClose} className='w-[36%] backdrop-blur-[2px] z-20'></div>
                  <motion.div initial={{ x: "40%", y: "-50%", scale: "0%", borderRadius: "5%", height: "10%", width: "30%" }} animate={{ x: "0%", y: "0%", scale: "100%", borderRadius: "0%", height: "100%", width: "65%" }} exit={{ x: "100%" }} transition={{ duration: 0.3 }} className='bg-gray-900  absolute w-[65%] h-full right-0 flex flex-col justify-between z-30'>
                    <div className="flex flex-col py-3 gap-3 text-slate-200 text-lg">
                      <div onClick={() => navigate("history")} className='px-4 py-1'>History</div>
                      <hr className='border-lime-400 border-[1px] opacity-15' />
                      <div onClick={() => console.log("edit details")} className='px-4 py-1'>Edit Details</div>
                      <hr className='border-lime-400 border-[1px] opacity-15' />
                      <div onClick={() => console.log("About us")} className='px-4 py-1'>About Us</div>
                      <hr className='border-lime-400 border-[1px] opacity-15' />
                    </div>

                    <div onClick={handleLogout} className="bg-gray-800 flex justify-between items-center">
                      <div className='text-slate-200 text-xl font-semibold px-4 py-2'>Logout</div>
                      <IoIosLogOut className='text-lime-300 mr-5 my-2 text-3xl' />
                    </div>
                  </motion.div>
                </div>
              </>) : null}

            </>
          ) : (
            <>
              <div className='flex justify-center items-center h-screen bg-zinc-900'>
                <Loding />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* <div className=" text-black">Request Accepted</div> */}
          <div className='main bg-black h-screen flex flex-col justify-center items-center gap-2'>
            <Loding />
            <div className='text-white text-xl font-bold mt-7'>Request <span className='text-green-500'>Accepted</span></div>
            <div className='text-white text-xl font-bold'>Generating your QR outpass...</div>
          </div>
        </>
      )}

    </>
  )
}

export default StudentProfile