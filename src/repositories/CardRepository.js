const { db } = require('../config/firebase');
const Card = require('../models/Card');

class CardRepository {
  constructor() {
    this.collection = db.collection('cards');
  }

  async createCard(cardData) {
    const docRef = this.collection.doc();
    const newCard = new Card({ ...cardData, id: docRef.id });
    await docRef.set(newCard.toJSON());
    return newCard.toJSON();
  }

  async getAllCards(boardId) {
    const snapshot = await this.collection.where('boardId', '==', boardId).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getCardById(id) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new Error('Card not found');
    return doc.data();
  }

  async getCardsByUser(boardId, userId) {
    const snapshot = await this.collection
      .where('boardId', '==', boardId)
      .where('list_member', 'array-contains', userId)
      .get();
    return snapshot.docs.map(doc => doc.data());
  }

  async updateCard(id, data) {
    const cardRef = this.collection.doc(id);
    await cardRef.update({ ...data, updatedAt: new Date() });
    const updatedDoc = await cardRef.get();
    return updatedDoc.data();
  }

  async deleteCard(id) {
    await this.collection.doc(id).delete();
  }
}

module.exports = CardRepository;
