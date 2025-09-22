const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');
const MailService = require('../services/EmailService')
const OtpRepository = require('../repositories/OtpRepository')

class AuthService {
  generateJWT(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }

  verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  async register(userData) {
    try {
      const existingUser = await UserRepository.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User already exists with this email');
      }

      const user = await UserRepository.createUser(userData);

      const token = this.generateJWT({
        uid: user.uid,
        email: user.email
      });

      return {
        user,
        token
      };
    } catch (error) {
      throw error;
    }
  }


  async loginWithFirebase(firebaseToken) {
    try {
      const decodedToken = await UserRepository.verifyFirebaseToken(firebaseToken);

      let user = await UserRepository.getUserByUid(decodedToken.uid);

      if (!user) {
        const userData = {
          uid: decodedToken.uid,
          email: decodedToken.email,
          displayName: decodedToken.name,
          photoURL: decodedToken.picture,
          emailVerified: decodedToken.email_verified
        };
        user = await UserRepository.createUser(userData);
      }

      const jwtToken = this.generateJWT({
        uid: user.uid,
        email: user.email
      });

      return {
        user,
        token: jwtToken
      };
    } catch (error) {
      throw error;
    }
  }


  async getProfile(uid) {
    try {
      const user = await UserRepository.getUserByUid(uid);
      if (!user) {
        throw new Error('User not found');
      }
      return user.toJSON();
    } catch (error) {
      throw error;
    }
  }
  async getAccount(email) {
    const user = await UserRepository.getUserByEmail(email);
    return user;
  }
  async updateProfile(uid, updateData) {
    try {
      const user = await UserRepository.updateUser(uid, updateData);
      return user.toJSON();
    } catch (error) {
      throw error;
    }
  }
  async loginWithGitHub(code) {
    const accessToken = await GitHubRepository.getAccessToken(code);
    const profile = await GitHubRepository.getUserProfile(accessToken);

    let user = await User.findByUid(profile.id);
    if (!user) {
      user = new User({
        uid: profile.id,
        email: profile.email || null,
        displayName: profile.login,
        photoURL: profile.avatar_url,
      });
      await user.save();
    }

    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return { token, user };
  }
  async sendLoginCode(email) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(code);

    await OtpRepository.create({ email, code });

    await MailService.sendOtpMail(email, code);

    return { message: 'OTP code sent to email' };
  }
  async verifyLoginCode(email, code) {
    const valid = await OtpRepository.findValidOtp(email, code);
    if (!valid) {
      throw new Error('Invalid or expired OTP code');
    }

    OtpRepository.otps = OtpRepository.otps.filter(o => o !== valid);

    let user = await UserRepository.getUserByEmail(email);
    if (!user) {
      user = await UserRepository.createUser({ email });
    }

    const token = this.generateJWT({ uid: user.uid, email: user.email });
    console.log(token);
    
    return { user, token };
  }

  // async deleteUser(email) {
  //   if (!email) {
  //     throw new Error("Email is required");
  //   }

  //   const user = await UserRepository.getUserByEmail(email);
  //   if (!user) {
  //     throw new Error("User not found");
  //   }

  //   await UserRepository.deleteUser(user.uid);

  //   return { message: `User with email ${email} deleted successfully` };
  // }
  async deleteUser(email) {
    if (!email) throw new Error("Email is required");
    return await UserRepository.deleteUserByEmail(email);
  }
}

module.exports = new AuthService();