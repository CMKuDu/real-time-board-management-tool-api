const CardService = require('../services/CardService');
const cardService = new CardService();

class CardController {
  async createCard(req, res) {
    try {
      const ownerId = req.user.id;
      const { boardId, name, description } = req.body;
      const card = await cardService.createCard({ boardId, name, description, ownerId });
      res.status(201).json(card);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getAllCards(req, res) {
    try {
      const { boardId } = req.params;
      const cards = await cardService.getAllCards(boardId);
      res.status(200).json(cards);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getCardById(req, res) {
    try {
      const card = await cardService.getCardById(req.params.id);
      res.status(200).json(card);
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }

  async getCardsByUser(req, res) {
    try {
      const { boardId, user_id } = req.params;
      const cards = await cardService.getCardsByUser(boardId, user_id);
      res.status(200).json(cards);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateCard(req, res) {
    try {
      const updatedCard = await cardService.updateCard(req.params.id, req.body);
      res.status(200).json(updatedCard);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteCard(req, res) {
    try {
      await cardService.deleteCard(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new CardController();
