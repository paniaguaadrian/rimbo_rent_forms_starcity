import express from "express";

// Controllers imported
import {
  sendF1SCFormEmailsEn,
  sendE1REmailEmailsEn,
  sendF2SCFormEmailsEn,
} from "../controllers/emailsController.js";

const router = express.Router();

router.route("/e1r").post(sendF1SCFormEmailsEn);
router.route("/e2tt").post(sendE1REmailEmailsEn);
router.route("/e3").post(sendF2SCFormEmailsEn);

export default router;
