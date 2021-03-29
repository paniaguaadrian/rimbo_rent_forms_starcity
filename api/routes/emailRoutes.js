import express from "express";

// Controllers imported
import { sendF1SCFormEmails } from "../controllers/emailsController.js";

const router = express.Router();

router.route("/e1r").post(sendF1SCFormEmails);

export default router;
