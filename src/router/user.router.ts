// router config

import { Router } from "express";
import { createUser, getUserById } from "../controller";

const router = Router();
router.route("/register").post(createUser);
router.route("/:id").get(getUserById);

export default router;
