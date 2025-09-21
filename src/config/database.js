const { db } = require('./firebase');

class Database {
  constructor() {
    this.db = db;
  }

  collection(name) {
    return this.db.collection(name);
  }

  async transaction(callback) {
    return this.db.runTransaction(callback);
  }
}

module.exports = new Database();