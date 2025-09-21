const User = require('../models/User');
const { auth } = require('../config/firebase');

class UserRepository {
    async createUser(userData) {
        try {
            const userRecord = await auth.createUser({
                email: userData.email,
                password: userData.password,
                displayName: userData.displayName,
            });
            const user = new User({
                uid: userRecord.uid,
                email: userData.email,
                displayName: userData.displayName,
                emailVerified: userRecord.emailVerified
            });
            await user.save();
            return user;
        } catch (error) {
            console.log("something wrong with Auth", error);
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
    async getUserByEmail(email) {
        return await User.findByEmail(email);
    }

    async getUserByUid(uid) {
        return await User.findByUid(uid);
    }

    async updateUser(uid, updateData) {
        try {
            // Update Firebase Auth user
            await auth.updateUser(uid, updateData);

            // Update Firestore document
            const user = await User.findByUid(uid);
            if (!user) throw new Error('User not found');

            Object.assign(user, updateData);
            await user.save();

            return user;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUser(uid) {
        try {
            // Delete from Firebase Auth
            await auth.deleteUser(uid);

            // Delete from Firestore
            await User.delete(uid);
            return true;
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    async verifyFirebaseToken(idToken) {
        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            throw new Error(`Invalid Firebase token: ${error.message}`);
        }
    }
}
module.exports = new UserRepository();