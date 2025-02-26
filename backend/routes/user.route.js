import {Router} from 'express';
import * as userController from '../controllers/user.controller.js'
import { body } from 'express-validator';
import * as authMiddleware from '../middlewares/auth.middleware.js'

const router = Router();
router.post("/register",
    body('email').isEmail().withMessage('Email must be a valid email address'),
    body('password').isLength({min:3}).withMessage('password must be atleast 3 characters')
    ,userController.createUserController);

router.post("/login",
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("password").isLength({min:3}).withMessage("Password must be atelast 3 chracters"),
    userController.loginController
)

router.get("/profile",authMiddleware.authuser,userController.profileController);

router.get("/logout",authMiddleware.authuser,userController.logoutController);

router.get("/all",authMiddleware.authuser,userController.getAllUser)
export default router;