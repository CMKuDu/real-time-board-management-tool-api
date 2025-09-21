const BoardInviteRepository = require('../repositories/BoardInviteRepository');

class BoardInviteService {
  constructor() {
    this.repo = new BoardInviteRepository();
  }

  createInvite(data) {
    return this.repo.createInvite(data);
  }

  getInvitesByBoard(boardId) {
    return this.repo.getInvitesByBoard(boardId);
  }

  updateStatus(inviteId, status) {
    return this.repo.updateStatus(inviteId, status);
  }

  deleteInvite(inviteId) {
    return this.repo.deleteInvite(inviteId);
  }

  getInviteById(inviteId) {
    return this.repo.getInviteById(inviteId);
  }
}

module.exports = BoardInviteService;
