// router config

import { Router } from "express";
import { createUser, deleteUser, getUserById, updateUser } from "../controller";
import { upload } from "../middlerware";

const router = Router();
router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), createUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  updateUser
);
router.route("/:id").delete(deleteUser);

export default router;
