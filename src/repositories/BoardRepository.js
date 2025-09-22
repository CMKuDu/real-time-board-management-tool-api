const { db } = require('../config/firebase');
const Board = require('../models/Board');

class BoardRepository {
  constructor() {
    this.collection = db.collection('boards');
  }

  async createBoard(board) {
    const docRef = this.collection.doc();
    const newBoard = new Board({ ...board, id: docRef.id });
    await docRef.set(newBoard.toJSON());
    const { id, name, description } = newBoard;
    return { id, name, description }
  }

  async getAllBoards(ownerId) {
    const snapshot = await this.collection
      .where('ownerId', '==', ownerId)
      .get();
    return snapshot.docs.map(doc => {
      const { id, name, description } = doc.data();
      return { id, name, description };
    });
  }

  async getBoardById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new Error('Board not found');
    return doc.data();
  }

  async updateBoard(id, data) {
    const boardRef = this.collection.doc(id);
    await boardRef.update({ ...data, updatedAt: new Date() });
    const updatedDoc = await boardRef.get();
    return updatedDoc.data();
  }

  async deleteBoard(id) {
    await this.collection.doc(id).delete();
  }
}

module.exports = BoardRepository;
