import express from 'express'
import {registerStudent, logout, login, authMiddleware, studentProfileController, sendRequest, checkStatus, isValidForQR, changingKey, fetchWardern, personalHistory} from '../controllers/student.controller.js'

const router = express.Router()

router.post("/register", registerStudent)
router.post("/login", login)
router.get("/logout",  logout)

router.get("/profile", authMiddleware, studentProfileController)
router.get("/wardernList",fetchWardern)
router.post("/profile/sendRequest", sendRequest)
router.post("/profile/checkStatus",checkStatus)
router.get("/profile/isValidForQR", authMiddleware, isValidForQR)
router.post("/profile/changingKey",changingKey)
router.get("/profile/personalHistory",personalHistory)


export default router