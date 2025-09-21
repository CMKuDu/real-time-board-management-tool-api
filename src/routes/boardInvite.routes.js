const express = require('express');
const router = express.Router({ mergeParams: true });
const inviteController = require('../controllers/BoardInviteController');
const { authenticateToken } = require('../middleware/auth');

router.post('/invite', authenticateToken, inviteController.inviteMember);

router.post('/:inviteId/respond', authenticateToken, inviteController.respondInvite);

router.get('/:boardId', authenticateToken, inviteController.getBoardInvites);

module.exports = router;
