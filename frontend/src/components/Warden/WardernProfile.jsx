import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loding from '../Loding/Loding.jsx'
import API from '../../axiosConfig.js'
import socket from '../../socket.js'
import { AccepctStudentSOCKET, DeclineStudentSOCKET, RequestedStudentListenSOCKET } from '../../Socket_code.js'
// import WardernDropdown from './WardenDropdown/WardenDropdown.jsx'

const WardernProfile = () => {
  const [user, setUser] = useState(null);
  const [pendingStudent, setPendingStudent] = useState([])
  const [wardernName, setWardernName] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const response = await axios.get("https://srxitbackend-production.up.railway.app/api/wardern/profile", { withCredentials: true });
        const response = await API.get("/api/wardern/profile");
        setUser(response.data.userData); // Set the user data
        console.log(socket.id);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        navigate("/wardern/login")
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    pendingStudentList();
    RequestedStudentListenSOCKET((userr) => {
      console.log("RequestedStudentListenSOCKET_frontend", userr);
      setPendingStudent((prev) => [...prev, userr]);
    })

    // console.log(RequestedStudentListenSOCKET())
  }, [user])

  const handleLogout = async () => {
    try {
      // await axios.get("https://srxitbackend-production.up.railway.app/api/wardern/logout", { withCredentials: true })
      await API.get("/api/wardern/logout")
      navigate("/wardern/login")
    } catch (error) {
      console.log("Error during logout", error.message);
    }
  }

  const pendingStudentList = async () => {
    if (!user) return;
    try {
      // setWardernName(user.name)
      // let ok = user.name
      let wardernNameData = { wardernName: user.name }
      // let list = await axios.post("https://srxitbackend-production.up.railway.app/api/wardern/profile/pendingStudentList", wardernNameData, { withCredentials: true })
      // /api/wardern/profile/fetchPendingStudent 
      let list = await API.post("/api/wardern/profile/pendingStudentList", wardernNameData)
      console.log(list.data.data);
      setPendingStudent(list.data.data)
    } catch (error) {
      console.log("Error during logout", error.message);
    }
  }

  // setTimeout(() => {
  //   pendingStudentList()
  // }, 4000);

  // useEffect( async () => {
  //   if (!user) return;
  //   await pendingStudentList();
  //   // const interval = setInterval(async () => {
  //   // }, 5000);

  //   return 0
  // }, [user]);

  const accepct = async (phone) => {
    try {
      // console.log("phone number is: ", phone)
      AccepctStudentSOCKET(phone)
      setPendingStudent((prev) => prev.filter((elem) => elem.phoneNo !== phone))
      let phoneNo = { phone }
      // await axios.post("https://srxitbackend-production.up.railway.app/api/wardern/profile/accepctStudent", phoneNo, { withCredentials: true })
      await API.post("/api/wardern/profile/accepctStudent", phoneNo)
      console.log("Request accepted .jsx");
    } catch (error) {
      console.log("Error during accepct", error.message);
    }
  }
  const decline = async (phone) => {
    try {
      DeclineStudentSOCKET(phone)
      setPendingStudent((prev) => prev.filter((elem) => elem.phoneNo !== phone))
      console.log("phone number is: ", phone)
      let phoneNo = { phone }
      // await axios.post("https://srxitbackend-production.up.railway.app/api/wardern/profile/declineStudent", phoneNo, { withCredentials: true })
      await API.post("/api/wardern/profile/declineStudent", phoneNo)
      console.log("Request decline .jsx");

      setTimeout(async () => {
        // await axios.post("https://srxitbackend-production.up.railway.app/api/wardern/profile/doingPending", phoneNo, { withCredentials: true })
        await API.post("/api/wardern/profile/doingPending", phoneNo)
        console.log("Request default to pending .jsx");
      }, 1000);
    } catch (error) {
      console.log("Error during decline", error.message);
    }
  }

  return (
    <>
      {user ? (
        <>
          <div className='main bg-black h-screen'>
            <div className='text-orange-100 pl-5 py-3 text-2xl font-medium'>Welcome, {user.name}</div>
            <hr className='border-orange-600' />

            <div>Student Requests</div>
            <div className='p-3 flex gap-3 bg-gray-800 rounded-lg mt-1 border-2 border-gray-950 w-full overflow-hidden flex-wrap h-fit gray text-white'>
              {pendingStudent.map(function (elem) {
                return <div key={elem.phoneNo} className='flex flex-col border-orange-300 border-[0.8px] rounded-lg p-3 text-center w-40 gap-y-3'>
                  <div className='text-start'>
                    <h1 className='text-[13px]'>{elem.name}</h1>
                    <h1 className='text-[13px]'>PhoneNo: {elem.phoneNo}</h1>
                    <h1 className='text-[13px]'>College Year: {elem.collegeYear}</h1>
                    <h1 className='text-[13px]'>RoomNo: {elem.roomNo}</h1>
                    {/* <h1 className='text-[13px]'>Email: sahil@gmail.com</h1> */}
                    <h1 className='text-[13px]'>Destination: {elem.destination}</h1>
                  </div>
                  <div className='flex flex-col gap-y-2 justify-center text-[15px]'>
                    <button className='px-3 py-1 border-2 border-green-600 rounded-lg active:scale-95' onClick={() => { accepct(elem.phoneNo) }}>Accepct</button>
                    <button className='px-3 py-1 border-2 border-red-600      rounded-lg active:scale-95' onClick={() => { decline(elem.phoneNo) }}>Decline</button>
                  </div>
                </div>
              })}
            </div>

            <button onClick={handleLogout} className="m-2 border-2 border-black px-3 py-1 bg-orange-600 rounded-md mt-4 active:scale-95 fixed bottom-0 font-bold">Logout</button>
            {/* <button onClick={pendingStudentList} className="m-2 border-2 border-black px-3 py-1 bg-orange-600 rounded-md mt-4 active:scale-95 fixed bottom-11 font-bold">Get Data</button> */}
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

export default WardernProfile