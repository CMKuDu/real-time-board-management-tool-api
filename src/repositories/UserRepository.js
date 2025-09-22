const User = require('../models/User');
const { db, auth } = require('../config/firebase');

class UserRepository {
    constructor() {
        this.usersCollection = db.collection('users');
    }
    async createUser(userData) {
        try {
            const userRecord = await auth.createUser({
                email: userData.email,
                password: userData.password,
                displayName: userData.displayName,
            });

            if (!userRecord.uid) {
                throw new Error("Firebase UID is undefined, cannot create Firestore document");
            }

            const userObj = {
                uid: userRecord.uid,
                email: userData.email,
                displayName: userData.displayName,
                emailVerified: userRecord.emailVerified
            };

            await this.usersCollection.doc(userRecord.uid).set(userObj);

            return userObj; 
        } catch (error) {
            console.log("something wrong with Auth", error);
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        const snapshot = await this.usersCollection.where('email', '==', email).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { uid: doc.id, ...doc.data() };
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
            await auth.deleteUser(uid);

            await this.usersCollection.doc(uid).delete();

            return true;
        } catch (error) {
            console.log('Error deleting user:', error);
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
    async deleteUserByEmail(email) {
        try {
            const userRecord = await auth.getUserByEmail(email);
            const uid = userRecord.uid;

            await auth.deleteUser(uid);

            await this.usersCollection.doc(uid).delete();

            return { message: `User ${email} deleted successfully` };
        } catch (error) {
            throw new Error(error.message);
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