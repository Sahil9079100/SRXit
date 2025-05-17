import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loding from '../Loding/Loding.jsx'
import QRCode from "react-qr-code";
// import { login } from '../../../../backend/controllers/student.controller'
// ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));

const OutpassQRcode = () => {
    const [gotData, setGotData] = useState(false)
    const [qrValue, setQrValue] = useState("")
    const [user, setUser] = useState(null);
    const [gatePer, setGatePer] = useState(null)
    const navigate = useNavigate()
    let ok;

    // ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));

    const checkStatus = async (req, res) => {
        if (!user) return console.log("check status is working but USER is not here");
        try {
            let ook = user.phoneNo
            let phoneNo = { ook }
            const response = await axios.post("http://localhost:3000/api/profile/checkStatus", phoneNo, { withCredentials: true })
            console.log(response.data.status)
            console.log(response.data.data.gateKeeperPermission)
            let permission = response.data.data.gateKeeperPermission
            setGatePer(permission)
            if (response.data.status != 200) {
                navigate("/user/profile/")

                // console.log("line 27")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const randomgenerateQR = async () => {
        // if (!user) { return console.log }
        let num = Date.now().toString(36) + Math.random().toString(36).substr(2)
        console.log("random code: ", num);
        // console.log(assignKeyData())
        const response = await axios.get("http://localhost:3000/api/profile/isValidForQR", { withCredentials: true });
        // console.log(response.data.userData.phoneNo)
        let data = num
        let phonn = response.data.userData.phoneNo
        let haa = `{"phoneNo":"${phonn}","qrkey":"${num}"}`
        setQrValue(haa)
        let dataObj = {
            phoneNo: response.data.userData.phoneNo,
            qrkey: data
        }
        const bad = await axios.post("http://localhost:3000/api/profile/changingKey", dataObj, { withCredentials: true });
        // console.log(bad.data.message)
        // return data
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/profile/isValidForQR", { withCredentials: true });
                setUser(response.data.userData); // Set the user data
                ok = response.data.userData

                if (response.data.status == 500) {
                    console.log(response.data.message)
                    return console.log("line 41")
                    // return navigate("/user/profile")
                }
                // console.log(response.data);
                // let value = randomgenerateQR()
                // setQrValue(value)
                setGotData(true)
            } catch (error) {
                console.error("Error fetching profile:", error.message);
                // navigate("/user/profile")
            }
        };

        fetchProfile()
    }, [navigate]);

    useEffect(() => {
        randomgenerateQR();
        console.log(qrValue);
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            randomgenerateQR();
            console.log("q value is: ", qrValue);
        }, 60000);

        return () => clearInterval(interval)
    }, [user]);

    useEffect(() => {
        if (!user) return;
        const interval = setInterval(async () => {
            checkStatus();
            // console.log("set interwel running");

        }, 1000);

        return () => clearInterval(interval)
    }, [user]);

    return (
        <>

            {gotData ? (
                <>
                    <div className='main bg-black h-screen flex flex-col justify-center items-center gap-2'>
                        <div className='text-white text-2xl font-bold my-4'>Here is your Outpass</div>

                        {user ? (<div className='bg-white p-4 rounded-lg border-lime-300 border-2'>
                            <QRCode value={qrValue} size={200} fgColor='black' bgColor='white' />
                        </div>) : (<></>)}

                        <div className='text-white text-md  mt-3 opacity-55 font-light'>Scan the qr code at the gate</div>
                        <div className='mt-2'>
                            {gatePer ? (<><div className='text-white font-bold text-xl pt-1'> You can now go <span className='text-lime-300'>Outside</span></div></>) : null}
                            {!gatePer ? (<><div className='text-white font-bold text-xl pt-1'>You are still <span className='text-red-600'>Inside</span></div></>) : null}
                        </div>
                    </div>
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
export default OutpassQRcode