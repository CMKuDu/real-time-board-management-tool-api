const express = require('express');
const router = express.Router({ mergeParams: true });
const taskController = require('../controllers/TaskController');
const { authenticateToken } = require('../middleware/auth');

// CRUD task
router.post('/', authenticateToken, taskController.createTask);
router.get('/', authenticateToken, taskController.getTasksByCard);
router.get('/:taskId', authenticateToken, taskController.getTaskById);
router.put('/:taskId', authenticateToken, taskController.updateTask);
router.delete('/:taskId', authenticateToken, taskController.deleteTask);

// Assign member
router.post('/:taskId/assign', authenticateToken, taskController.assignMember);
router.delete('/:taskId/assign/:memberId', authenticateToken, taskController.removeMember);

// GitHub attachments
router.post('/:taskId/github-attach', authenticateToken, taskController.attachGitHub);
router.get('/:taskId/github-attachments', authenticateToken, taskController.getGitHubAttachments);
router.delete('/:taskId/github-attachments/:attachmentId', authenticateToken, taskController.removeGitHubAttachment);

module.exports = router;
