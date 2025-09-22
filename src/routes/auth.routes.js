const express = require('express');
const AuthController = require('../controllers/AuthController');
const { authenticateToken } = require('../middleware/auth');
const { validateRegister, validateLogin, validateUpdateProfile } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

router.delete('/delete', AuthController.deleteUser);

router.get('/profile', authenticateToken, AuthController.getProfile);
router.put('/profile', authenticateToken, validateUpdateProfile, AuthController.updateProfile);
router.post('/logout', authenticateToken, AuthController.logout);
router.get('/account', AuthController.getAccount);
router.get("/github/callback", (req, res) =>
    AuthController.githubCallback(req, res)
);

router.post("/send-otp", AuthController.sendOtp);
router.post("/verify-otp", AuthController.verifyOtp);
module.exports = router;