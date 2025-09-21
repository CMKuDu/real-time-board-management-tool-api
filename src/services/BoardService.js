const BoardRepository = require('../repositories/BoardRepository');

class BoardService {
  constructor() {
    this.boardRepo = new BoardRepository();
  }

  createBoard(data) {
    return this.boardRepo.createBoard(data);
  }

  getAllBoards(ownerId) {
    return this.boardRepo.getAllBoards(ownerId);
  }

  getBoardById(id) {
    return this.boardRepo.getBoardById(id);
  }

  updateBoard(id, data) {
    return this.boardRepo.updateBoard(id, data);
  }

  deleteBoard(id) {
    return this.boardRepo.deleteBoard(id);
  }
}

module.exports = BoardService;
