import { Router } from "express";
import { authCheck } from "../middlerware/auth.middleware";
import { registerCompany } from "../controller";
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

router.route("/mycompany").get();
router.route("/updatecompany").put();
router.route("/deletecompany").delete();

export default router;
