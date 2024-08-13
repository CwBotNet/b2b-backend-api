// router config

import { Router } from "express";
import { createUser, deleteUser, getUserById, updateUser } from "../controller";

const router = Router();
router.route("/register").post(createUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

export default router;
