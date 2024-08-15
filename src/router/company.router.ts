import { Router } from "express";
import { authCheck } from "../middlerware/auth.middleware";
import {
  registerCompany,
  getCompany,
  updateCompany,
  deleteCompany,
} from "../controller";
import { upload } from "../middlerware";

const router = Router();

router.use(authCheck);

router.route("/registercompany").post(
  authCheck,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  registerCompany
);

router.route("/").get(authCheck, getCompany);

router.route("/:id").put(
  authCheck,
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]),
  updateCompany
);

router.route("/:id").delete(authCheck, deleteCompany);

export default router;
