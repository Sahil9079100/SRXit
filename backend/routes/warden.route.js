import express from 'express'
import {registerWardern, wardernlogout, wardernlogin, authMiddlewareWardern, wardernProfileController, pendingStudentList, accepctStudent, declineStudent, doingPending} from '../controllers/wardern.controller.js'


const router = express.Router()

router.post("/register", registerWardern)
router.post("/login", wardernlogin)
router.get("/logout",  wardernlogout)

router.get("/profile", authMiddlewareWardern, wardernProfileController)
router.post("/profile/pendingStudentList", pendingStudentList)
router.post("/profile/accepctStudent", accepctStudent)
router.post("/profile/declineStudent", declineStudent)
router.post("/profile/doingPending",doingPending)
// router.post("/profile/sendRequest", sendRequest)

export default router