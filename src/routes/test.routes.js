const express = require("express");
const admin = require("../config/firebase")

const router = express.Router();
router.get("/test", async (req, res) => {
    try {
        const users = await admin.auth().listUsers(6);
        res.json(users.users.map(u => ({ uid: u.uid, email: u.email })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;