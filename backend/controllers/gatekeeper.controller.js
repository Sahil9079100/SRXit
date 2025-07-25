import { Student } from "../models/student.model.js"
import { Gatekeeper } from "../models/gatekeeper.model.js"
// import { History } from "../models/history.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import express from 'express'
import { History } from "../models/history.model.js"
import { PermissionFromGatekeeperSOCKET } from "../index.js"

express().use(cookieParser())
let demooo
const registerGatekeeper = async (req, res) => {
    try {
        const { name, phoneNo, email, password } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const ifany = await Gatekeeper.findOne({ phoneNo: req.body.phoneNo })
                if (ifany) return res.status(200).json({ status: 500, message: "User already exist with this number" })
                const newGatekeeper = new Gatekeeper({
                    name,
                    phoneNo,
                    email,
                    password: hash,
                })
                await newGatekeeper.save()

                let token = jwt.sign({ phoneNo }, process.env.SECRET_KEY)
                console.log(token);
                // res.cookie("GKtoken", token, { httpOnly: true, secure: true, sameSite: 'None' });
                res.status(201).json({ message: "Gatekeeper registered successfully", student: newGatekeeper })
            })
        })
    } catch (error) {
        console.log("gatekeeper register.Controller.js:::> ", error);
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const gatekeeperLogout = async (req, res) => {
    // res.cookie("token", "")
    // res.clearCookie('GKtoken')
    res.clearCookie('GKtoken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });
    // res.send("logout")
    res.redirect("/")
}

const gatekeeperLogin = async (req, res) => {
    let user = await Gatekeeper.findOne({ phoneNo: req.body.phoneNo })
    if (!user) return res.status(404).json({ message: "user not found" })

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ phoneNo: user.phoneNo }, process.env.SECRET_KEY)
            // console.log(token);
            // let demoCookie = user.name
            // phoneNo: user.phoneNo,
            // collegeYear: user.collegeYear,
            // roomNo: user.roomNo,

            res.cookie("GKtoken", token, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(200).json({ status: 200, message: "gatekeeper logined" })
        }
        else res.status(500).json({ message: "no you cant login" })
    })
}

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.GKtoken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userCookie = decoded
        demooo = decoded.phoneNo
        console.log("aith middleware: ", demooo)
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token", status: 401 })
    }
}


const studentProfileController = async (req, res) => {
    const token = req.cookies.GKtoken
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    let ok = await Gatekeeper.findOne({ phoneNo: decoded.phoneNo }).select(["-password", "-email"])
    console.log("middleware user detail", ok);
    res.status(200).json({
        message: "middleware working and welcome",
        user: req.userCookie,
        userData: ok
    })
}

function getISTTimeFormatted() {
    return new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
}

const addStudent = async (req, res) => {

    try {
        let ok = await Student.findOne({ phoneNo: req.body.phoneNo }).select(["-password"])

        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        };
        // const formattedDateTimee = new Intl.DateTimeFormat('en-IN', options).format(now);
        const formattedDateTimee = getISTTimeFormatted()
        console.log(formattedDateTimee);
        if (req.body.qrkey === ok.randomQRtoken) {

            if (ok.gateKeeperPermission == true) {
                ok.gateKeeperPermission = false
                ok.status = "none"
                ok.randomQRtoken = ""
                await ok.save()
                console.log(ok)

                const now = new Date();
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                };
                // const formattedDateTime = new Intl.DateTimeFormat('en-IN', options).format(now);
                const formattedDateTime = getISTTimeFormatted()
                console.log("coming in time: ", formattedDateTime);
                // console.log(number)
                console.log(ok.goOuttime)
                console.log(formattedDateTime)
                let name = ok.name
                let number = ok.phoneNo
                let email = ok.email
                let collageyear = ok.collegeYear
                let destination = ok.destination
                let wardernname = ok.wardenname
                let goOut = ok.goOuttime
                let comein = formattedDateTime
                try {
                    const newHistory = new History({
                        name: name,
                        phoneNo: number,
                        email: email,
                        collegeYear: collageyear,
                        destination: destination,
                        wardernname: wardernname,
                        goouttime: goOut,
                        comeintime: comein
                    })
                    await newHistory.save()
                } catch (error) {
                    console.log(error)
                }
                const num = ok.phoneNo
                const message = "201"
                await PermissionFromGatekeeperSOCKET({num,message})
                return res.status(200).json({ status: 200, message: "The student is now inside" })
            }

            if (ok.status === "accepted") {
                const num = ok.phoneNo
                const message = "200"
                console.log("socket data", {num,message})
                await PermissionFromGatekeeperSOCKET({num,message})
                ok.gateKeeperPermission = true
                ok.goOuttime = formattedDateTimee
                await ok.save()
                // try {
                //     const newHistory = new History({
                //         name: ok.name,
                //         phoneNo: ok.phoneNo,
                //         email: ok.email,
                //         collegeYear: ok.collegeYear,
                //         destination: ok.destination,
                //         wardernname: ok.wardenname,
                //         goouttime: req.body.goingOutTime,
                //         comeintime: req.body.goingOutTime
                //     })
                //     await newHistory.save()
                // } catch (error) {
                //     console.log(error)
                // }
                return res.status(200).json({ status: 200, message: "The student is outside from now" })
            }

            return res.status(200).json({ status: 500, message: "The student is not valid to go out" })
        }

        return res.status(200).json({ status: 500, message: "The QR code is expired " })
    } catch (error) {
        res.status(200).json({ status: 500, message: `there was an error adding student: ${error}` })
    }
}

const livestudents = async (req, res) => {
    let ok = await Student.find({ gateKeeperPermission: true }).select(["-password"])
    res.status(200).json({ status: 200, message: "live working", livestudents: ok })
}


const historyStudent = async (req, res) => {
    let ok = await History.find().select(["-password"])
    // console.log(ok)
    res.status(200).json({ status: 200, message: "history working", historyStudent: ok })
}
export { registerGatekeeper, gatekeeperLogout, gatekeeperLogin, authMiddleware, studentProfileController, addStudent, livestudents, historyStudent }