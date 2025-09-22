const AuthService = require('../services/AuthService');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
  async getAccount(req, res, next) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }

      const user = await AuthService.getAccount(email);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { firebaseToken } = req.body;
      const result = await AuthService.loginWithFirebase(firebaseToken);

      res.json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await AuthService.getProfile(req.user.uid);

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const updatedUser = await AuthService.updateProfile(req.user.uid, req.body);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res) {
    res.json({
      success: true,
      message: 'Logout successful. Please delete the token on client side.'
    });
  }
  async githubCallback(req, res) {
    try {
      const code = req.query.code;
      const { token, user } = await AuthService.loginWithGitHub(code);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "GitHub login failed" });
    }
  }

  async sendOtp(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      await AuthService.sendLoginCode(email);
      res.json({ message: "OTP sent to email" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async verifyOtp(req, res) {
    try {
      const { email, code } = req.body;
      if (!email || !code) {
        return res.status(400).json({ error: "Email and OTP code are required" });
      }
      const result = await AuthService.verifyLoginCode(email, code);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const { email } = req.body;
      const result = await AuthService.deleteUser(email);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

}

module.exports = new AuthController();