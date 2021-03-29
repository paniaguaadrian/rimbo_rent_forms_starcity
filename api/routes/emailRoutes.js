import express from "express";

// Controllers imported
import {
  sendF1SCFormEmails,
  sendE1REmailEmails,
  sendF2SCFormEmails,
} from "../controllers/emailsController.js";

const router = express.Router();

router.route("/e1r").post(sendF1SCFormEmails);
router.route("/e2tt").post(sendE1REmailEmails);
router.route("/e3").post(sendF2SCFormEmails);

export default router;
