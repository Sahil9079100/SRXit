import { Wardern } from "../models/wardern.model.js"
import { Student } from "../models/student.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import express from 'express'

express().use(cookieParser())

const registerWardern = async (req, res) => {
    try {
        const { name, phoneNo, email, password } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const newWardern = new Wardern({
                    name,
                    phoneNo,
                    email,
                    password: hash,
                })
                await newWardern.save()

                let wardernToken = jwt.sign({ phoneNo }, process.env.SECRET_KEY)
                console.log(wardernToken);
                // res.cookie("wardernToken", wardernToken, { httpOnly: true, secure: true, sameSite: 'None' });
                res.status(201).json({ message: "Wardern registered successfully", wardern: newWardern })
            })
        })
    } catch (error) {
        console.log("register.Controller.js:::> ", error);
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

const wardernlogout = async (req, res) => {
    // res.cookie("wardernToken", "")
    res.clearCookie('wardernToken')
    // res.send("logout")
    res.redirect("/")
}

const wardernlogin = async (req, res) => {
    let user = await Wardern.findOne({ phoneNo: req.body.phoneNo })
    if (!user) return res.status(404).json({ message: "user not found" })

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let wardernToken = jwt.sign({ phoneNo: user.phoneNo }, process.env.SECRET_KEY)
            // console.log(wardernToken);
            // let demoCookie = user.name
            // phoneNo: user.phoneNo,
            // collegeYear: user.collegeYear,
            // roomNo: user.roomNo,

            res.cookie("wardernToken", wardernToken, { httpOnly: true, secure: true, sameSite: 'none' });
            res.status(200).json({ status: 200, message: "Wardern logined" })
        }
        else res.status(500).json({ message: "no you cant login, wardern" })
    })
}

const authMiddlewareWardern = async (req, res, next) => {
    const wardernToken = req.cookies.wardernToken;
    if (!wardernToken) {
        return res.status(401).json({ message: "Unauthorized: No wardernToken provided" });
    }

    try {
        const decoded = jwt.verify(wardernToken, process.env.SECRET_KEY)
        req.userCookie = decoded
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid wardernToken", status: 401 })
    }
}

const wardernProfileController = async (req, res) => {
    const wardernToken = req.cookies.wardernToken
    const decoded = jwt.verify(wardernToken, process.env.SECRET_KEY)
    let ok = await Wardern.findOne({ phoneNo: decoded.phoneNo }).select(["-password", "-email"])
    console.log("middleware user detail", ok);
    res.status(200).json({
        message: "middleware working and welcome",
        user: req.userCookie,
        userData: ok
    })
}


const pendingStudentList = async (req,res)=>{
    // console.log(req.body.wardernName)
    let studentList = await Student.find({status:"pending", wardenname: req.body.wardernName}).select(["-password"])
    // console.log(studentList);
    res.status(200).json({status:200,data: studentList})
}

const accepctStudent = async(req,res)=>{
    console.log("Request accepted", req.body.phone);
    let ok = await Student.findOne({ phoneNo:  req.body.phone})
    ok.status = "accepted"
    await ok.save()
    console.log("Request accepted", ok);
    res.status(200).json({status:200, message:"Request accepted"})
}

const declineStudent = async(req,res)=>{
    console.log("Request accepted", req.body.phone);
    let ok = await Student.findOne({ phoneNo:  req.body.phone})
    ok.status = "declined"
    await ok.save()
    console.log("Request accepted", ok);
    res.status(200).json({status:200, message:"Request declined"})
}

const doingPending = async(req,res)=>{
    console.log("Request accepted", req.body.phone);
    let ok = await Student.findOne({ phoneNo:  req.body.phone})

    ok.status = "none"
    await ok.save()
    // console.log("PLEASE GIVE START TO THIS REPO, PLEASEEEEEEEEEEEE", ok);
    res.status(200).json({status:200, message:"Request default to pending"})
}

export { registerWardern, wardernlogout, wardernlogin, authMiddlewareWardern, wardernProfileController, pendingStudentList, accepctStudent, declineStudent, doingPending }