// router config

import { Router } from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controller";
import { upload } from "../middlerware";
import { authCheck } from "../middlerware/auth.middleware";

const router = Router();
router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);

router.route("/:id").get(authCheck, getUserById);

router.route("/:id").put(
  authCheck,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  updateUser
);
router.route("/:id").delete(authCheck, deleteUser);

export default router;
