const BoardService = require('../services/BoardService');
const boardService = new BoardService();

class BoardController {
        async createBoard(req, res) {
            try {
                const ownerId = req.user.id || 'test-user-id-123';
                const board = await boardService.createBoard({ ...req.body, ownerId });
                res.status(201).json(board);
            } catch (err) {
                res.status(500).json({ success: false, message: err.message });
            }
        }

    async getAllBoards(req, res) {
        try {
            const ownerId = req.user.id;
            const boards = await boardService.getAllBoards(ownerId);
            res.status(200).json(boards);
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async getBoardById(req, res) {
        try {
            const board = await boardService.getBoardById(req.params.id);
            res.status(200).json(board);
        } catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    }

    async updateBoard(req, res) {
        try {
            const updatedBoard = await boardService.updateBoard(req.params.id, req.body);
            res.status(200).json(updatedBoard);
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    async deleteBoard(req, res) {
        try {
            await boardService.deleteBoard(req.params.id);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
}

module.exports = new BoardController();
