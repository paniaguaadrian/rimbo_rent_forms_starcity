import express from "express";

// Controllers imported
import { sendF1SCFormEmailsEn } from "../controllers/emailsController.js";

const router = express.Router();

router.route("/e1r").post(sendF1SCFormEmailsEn);

export default router;
