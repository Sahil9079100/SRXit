import { Student } from "../models/student.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import express from 'express'
import { Wardern } from "../models/wardern.model.js"
import { History } from "../models/history.model.js"

express().use(cookieParser())
let demooo;
const registerStudent = async (req, res) => {
    try {
        const { name, phoneNo, collegeYear, roomNo, email, password, wardenName, destination, status } = req.body;

        // checking if phone number already exists
        const existingStudent = await Student.findOne({ phoneNo });
        if (existingStudent) {
            res.status(200).json({ status: 500, message: "Phone number already in use" });
        }
        else (
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    const newStudent = new Student({
                        name,
                        phoneNo,
                        collegeYear,
                        roomNo,
                        email,
                        password: hash,
                        wardenName,
                        destination,
                        status,
                    })
                    await newStudent.save()

                    let token = jwt.sign({ phoneNo }, process.env.SECRET_KEY)
                    console.log(token);
                    // res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' });
                    res.status(200).json({ message: "Student registered successfully", student: newStudent })
                })
            })
        )
    } catch (error) {
        console.log("register.Controller.js:::> ", error);
        res.status(200).json({ message: "Internal server error", error: error.message })
    }
}

const logout = async (req, res) => {
    // res.cookie("token", "")
    // res.clearCookie('token')
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });
    // res.send("logout")
    res.redirect("/")
}

const login = async (req, res) => {
    let user = await Student.findOne({ phoneNo: req.body.phoneNo })
    if (!user) return res.status(404).json({ message: "User not found" })

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ phoneNo: user.phoneNo }, process.env.SECRET_KEY)
            // console.log(token);
            // let demoCookie = user.name
            // phoneNo: user.phoneNo,
            // collegeYear: user.collegeYear,
            // roomNo: user.roomNo,

            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 604800000 });
            res.status(200).json({ status: 200, message: "user logined" })
        }
        else res.status(500).json({ message: "Wrong password" })
    })
}

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userCookie = decoded
        demooo = decoded.phoneNo
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token", status: 401 })
    }
}


const studentProfileController = async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    let ok = await Student.findOne({ phoneNo: decoded.phoneNo }).select(["-password", "-email", "-wardenname", "-destination", "-status"])
    // console.log("middleware user detail", ok);
    res.status(200).json({
        message: "middleware working and welcome",
        user: req.userCookie,
        userData: ok
    })
}

const sendRequest = async (req, res) => {

    console.log(req.body)
    let ok = await Student.findOne({ phoneNo: demooo })

    if (ok.status == "pending" || ok.status == "accepted") {
        return res.status(200).json({ status: 500, message: "Request already sent, stay calm" })
    }

    ok.status = "pending"
    ok.destination = req.body.desti
    ok.wardenname = req.body.name
    ok.save()
    res.status(200).json({ status: 200, message: "Request sended successfully" })
}

const checkStatus = async (req, res) => {
    // console.log(req.body.ook);

    let ok = await Student.findOne({ phoneNo: req.body.ook })

    if (ok.status == "accepted") {
        return res.status(200).json({ status: 200, message: "Request ACCEPTED", data: ok })
    }
    if (ok.status == "declined") {
        return res.status(200).json({ status: 201, message: "Request DECLINED", data: ok })
    }
    else { res.status(200).json({ status: 500, message: "still_pending", data: ok }) }
    // console.log(ok.name);
}

const isValidForQR = async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    let ok = await Student.findOne({ phoneNo: decoded.phoneNo }).select(["-password", "-email", "-wardenname", "-destination"])
    if (ok.status == "accepted") {
        res.status(200).json({
            status: 200,
            message: "valid for qr code",
            userData: ok
        })
        // console.log("HE IS VALID FOR QR CODE")
        return 0
    }

    console.log("HE IS NOT VALID FOR QR CODE")
    return res.status(200).json({ status: 500, message: "he is not valid for or code" })
}

const changingKey = async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // console.log(req.body)
    let ok = await Student.findOne({ phoneNo: decoded.phoneNo }).select(["-password", "-email", "-wardenname", "-destination"])
    ok.randomQRtoken = req.body.qrkey
    ok.save()
    // console.log(ok)
    res.status(200).json({ status: (200), message: "bhai save ho gai key" })
}

const fetchWardern = async (req, res) => {
    let ok = await Wardern.find().select(["-password"])
    res.status(200).json({ status: 200, message: "wardern list fetched successfully", wardernlistData: ok })
}

const personalHistory = async (req, res) => {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // console.log(req.body)
    let ok = await History.find({ phoneNo: decoded.phoneNo })
    if (!ok) return res.status(200).json({ status: 500, message: "Something went wrong, please try again" })
    res.status(200).json({ status: 200, message: "Personal History working", personalHistory: ok })
}


const checkIFcookie = (req, res) => {
    try {

        if (req.cookies.token) {
            const cookieData = req.cookies.token
            return res.status(200).json({ status: 201, message: "Cookie data", dataCOOKIE: cookieData })
        }
        else if (req.cookies.wardernToken) {
            const cookieData = req.cookies.wardernToken
            return res.status(200).json({ status: 202, message: "Cookie data", dataCOOKIE: cookieData })
        }
        else if (req.cookies.GKtoken) {
            const cookieData = req.cookies.GKtoken
            return res.status(200).json({ status: 203, message: "Cookie data", dataCOOKIE: cookieData })
        }
        else (
            res.status(200).json({ status: 500, message: "Cookie not found" })
        )
        // const cookieData = req.cookies
        // console.log(cookieData);
        // res.status(200).json({ status: 200, message: "Cookie data", dataCOOKIE : cookieData })
    } catch (error) {
        res.status(200).json({ status: 500, message: "Something went wrong while ckecking, please try again" })
    }
}



export { registerStudent, logout, login, authMiddleware, studentProfileController, sendRequest, checkStatus, isValidForQR, changingKey, fetchWardern, personalHistory, checkIFcookie }