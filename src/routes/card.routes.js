const express = require('express');
const router = express.Router({ mergeParams: true });
const cardController = require('../controllers/CardController');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.post('/', authenticateToken, cardController.createCard);
router.get('/', authenticateToken, cardController.getAllCards);
router.get('/:id', authenticateToken, cardController.getCardById);
router.put('/:id', authenticateToken, cardController.updateCard);
router.delete('/:id', authenticateToken, cardController.deleteCard);

router.get('/user/:user_id', authenticateToken, cardController.getCardsByUser);

module.exports = router;
