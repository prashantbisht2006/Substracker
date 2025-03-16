import { Router } from "express";
import { signup} from "../controlers/auth.controler.js";
import { signIn } from "../controlers/auth.controler.js";
import { signOut } from "../controlers/auth.controler.js";
const authRouter = Router();

authRouter.post('/sign-up',signup);
authRouter.post('/sign-in',signIn);
authRouter.post('/sign-out',signOut);

export default authRouter;