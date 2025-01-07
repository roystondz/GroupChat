import {Router} from "express";
import {body} from "express-validator"
import * as projectController from "../controllers/project.controller.js"
import * as authMiddleware  from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create",authMiddleware.authuser,
    body("name").isString().withMessage("Name is required"),projectController.createProject

)

router.get("/all",authMiddleware.authuser,projectController.getAllProjects);

router.put("/add-user",authMiddleware.authuser,body('projectId').isString().withMessage('Project Id is required'),
    body('users').isArray({min:1}).withMessage('Users must be an array of String').bail().custom((users)=>users.every(user=>typeof user === 'string')).
    withMessage('Each user must be a String'),
    projectController.addUserToProject
)

export default router;