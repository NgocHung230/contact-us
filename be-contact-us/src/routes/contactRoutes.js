const express = require("express");
const {
  sendMessage,
  getMessages,
  getContactList,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/send-message", sendMessage);
router.get("/messages", getMessages);
router.post("/getContactList", getContactList);

module.exports = router;
