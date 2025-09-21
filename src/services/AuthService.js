const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

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
        user: user.toJSON(),
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
        user = new (require('../models/User'))({
          uid: decodedToken.uid,
          email: decodedToken.email,
          displayName: decodedToken.name,
          photoURL: decodedToken.picture,
          emailVerified: decodedToken.email_verified
        });
        await user.save();
      }

      const jwtToken = this.generateJWT({
        uid: user.uid,
        email: user.email
      });

      return {
        user: user.toJSON(),
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
  async getAccount(email){
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
}

module.exports = new AuthService();