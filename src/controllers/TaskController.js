const TaskService = require('../services/TaskService');
const taskService = new TaskService();

class TaskController {
  async createTask(req, res) {
    try {
      const ownerId = req.user.id;
      const { cardId, title, description, status } = req.body;
      const task = await taskService.createTask({ cardId, title, description, status, ownerId });
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getTasksByCard(req, res) {
    try {
      const { cardId } = req.params;
      const tasks = await taskService.getTasksByCard(cardId);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getTaskById(req, res) {
    try {
      const task = await taskService.getTaskById(req.params.taskId);
      res.status(200).json(task);
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const updatedTask = await taskService.updateTask(req.params.taskId, req.body);
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async deleteTask(req, res) {
    try {
      await taskService.deleteTask(req.params.taskId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async assignMember(req, res) {
    try {
      const { taskId } = req.params;
      const { memberId } = req.body;
      const result = await taskService.assignMember(taskId, memberId);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async removeMember(req, res) {
    try {
      const { taskId, memberId } = req.params;
      await taskService.removeMember(taskId, memberId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async attachGitHub(req, res) {
    try {
      const { taskId } = req.params;
      const attachment = req.body; 
      const result = await taskService.attachGitHub(taskId, attachment);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async getGitHubAttachments(req, res) {
    try {
      const { taskId } = req.params;
      const attachments = await taskService.getGitHubAttachments(taskId);
      res.status(200).json(attachments);
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async removeGitHubAttachment(req, res) {
    try {
      const { taskId, attachmentId } = req.params;
      await taskService.removeGitHubAttachment(taskId, attachmentId);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}

module.exports = new TaskController();
