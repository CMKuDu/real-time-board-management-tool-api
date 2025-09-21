const BoardInviteService = require('../services/BoardInviteService');
const inviteService = new BoardInviteService();

class BoardInviteController {
  async inviteMember(req, res) {
    try {
      const boardOwnerId = req.user.id;
      const { boardId, memberId, emailMember } = req.body;
      const invite = await inviteService.createInvite({
        boardId,
        boardOwnerId,
        memberId,
        emailMember,
        status: 'pending'
      });
      res.status(200).json({ success: true, invite });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async respondInvite(req, res) {
    try {
      const { inviteId } = req.params;
      const { status } = req.body;
      const invite = await inviteService.updateStatus(inviteId, status);
      res.status(200).json(invite);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getBoardInvites(req, res) {
    try {
      const { boardId } = req.params;
      const invites = await inviteService.getInvitesByBoard(boardId);
      res.status(200).json(invites);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new BoardInviteController();
