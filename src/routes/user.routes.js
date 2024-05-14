import { Router, Router } from "express";
import { Route } from "react-router-dom";
import { registerUser } from "../controllers/user.controller";

const Router = Router()

Router.Route("/register").post(registerUser.js)


export default Router