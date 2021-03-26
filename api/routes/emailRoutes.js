import express from "express";

// Controllers imported
import { sendRJ1FormEmails } from "../controllers/emailsController.js";

const router = express.Router();

router.route("/rj1").post(sendRJ1FormEmails);

export default router;
