import { Router } from "express";
import { authCheck } from "../middlerware/auth.middleware";
import { createCatogery } from "../controller";
import { upload } from "../middlerware";

const router = Router();

router.use(authCheck);

router
  .route("/addcategory")
  .post(upload.fields([{ name: "category", maxCount: 1 }]), createCatogery);

export default router;
