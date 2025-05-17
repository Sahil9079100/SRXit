import express from 'express'
import {registerGatekeeper, gatekeeperLogout, gatekeeperLogin, authMiddleware, studentProfileController, addStudent, livestudents, historyStudent} from '../controllers/gatekeeper.controller.js'

const router = express.Router()

router.post("/profile/register", registerGatekeeper)
router.post("/profile/login", gatekeeperLogin)
router.get("/profile/logout",  gatekeeperLogout)
router.get("/profile/studentProfileController", authMiddleware, studentProfileController)
router.post("/profile/addStudent", addStudent)
router.get("/profile/livestudents",livestudents)
router.get("/profile/historyStudent",historyStudent)

export default router