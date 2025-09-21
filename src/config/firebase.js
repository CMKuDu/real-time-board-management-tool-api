require("dotenv").config();

const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
console.log("🔥 Service Account Path:", serviceAccountPath); // debug

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const auth = admin.auth();

module.exports = { admin, db, auth };
