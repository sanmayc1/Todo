import { Router } from "express";
import {validationRule, loginValidationRules} from "../Middleware/validation.js";
import { loginSession, checkSession } from "../Middleware/sessionHandling.js";
import {landingPage, loginPageLoad, signupPageLoad ,homePageLoad, logout, addTask, deleteTask, taskComplete} from '../Controller/userControl.js'
import { signupSubmit, loginAuthentication } from "../Controller/userAuth.js";

const router = Router()

router.get('/', loginSession,landingPage);
router.get('/signup', loginSession, signupPageLoad);
router.post('/signup', validationRule, signupSubmit);
router.get('/login', loginSession, loginPageLoad);
router.post('/login', loginValidationRules, loginAuthentication)
router.get('/home', checkSession, homePageLoad)
router.get('/logout',logout);

router.post('/addTask',addTask)
router.get('/deleteTask/:id',deleteTask)
router.get('/taskComplete/:id',taskComplete)

export default router