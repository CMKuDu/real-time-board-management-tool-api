const CardRepository = require('../repositories/CardRepository');

class CardService {
  constructor() {
    this.cardRepo = new CardRepository();
  }

  createCard(data) {
    return this.cardRepo.createCard(data);
  }

  getAllCards(boardId) {
    return this.cardRepo.getAllCards(boardId);
  }

  getCardById(id) {
    return this.cardRepo.getCardById(id);
  }

  getCardsByUser(boardId, userId) {
    return this.cardRepo.getCardsByUser(boardId, userId);
  }

  updateCard(id, data) {
    return this.cardRepo.updateCard(id, data);
  }

  deleteCard(id) {
    return this.cardRepo.deleteCard(id);
  }
}

module.exports = CardService;
