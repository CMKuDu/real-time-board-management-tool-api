// routes/board.routes.js
const express = require('express');
const router = express.Router();
const boardController = require('../controllers/BoardController');
const { authenticateToken } = require('../middleware/auth');

router.post('/create', boardController.createBoard);
router.get('/boards', boardController.getAllBoards);
router.get('/:id', authenticateToken, boardController.getBoardById);
router.put('/:id', authenticateToken, boardController.updateBoard);
router.delete('/:id', authenticateToken, boardController.deleteBoard);

module.exports = router;
