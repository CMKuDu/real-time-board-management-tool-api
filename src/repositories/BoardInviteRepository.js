const { db } = require('../config/firebase');
const BoardInvite = require('../models/BoardInvite');

class BoardInviteRepository {
  constructor() {
    this.collection = db.collection('boardInvites');
  }

  async createInvite(data) {
    const docRef = this.collection.doc();
    const invite = new BoardInvite({ ...data, id: docRef.id });
    await docRef.set(invite.toJSON());
    return invite.toJSON();
  }

  async getInvitesByBoard(boardId) {
    const snapshot = await this.collection.where('boardId', '==', boardId).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getInviteById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new Error('Invite not found');
    return doc.data();
  }

  async updateStatus(inviteId, status) {
    const inviteRef = this.collection.doc(inviteId);
    await inviteRef.update({ status, updatedAt: new Date() });
    const updated = await inviteRef.get();
    return updated.data();
  }

  async deleteInvite(inviteId) {
    await this.collection.doc(inviteId).delete();
  }
}

module.exports = BoardInviteRepository;
