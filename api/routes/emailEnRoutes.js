import express from "express";

// Controllers imported
import { sendRJ1FormEmailsEn } from "../controllers/emailsController.js";

const router = express.Router();

router.route("/rj1").post(sendRJ1FormEmailsEn);

export default router;
