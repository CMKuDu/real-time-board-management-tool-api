const TaskRepository = require('../repositories/TaskRepository');

class TaskService {
  constructor() {
    this.taskRepo = new TaskRepository();
  }

  createTask(data) {
    return this.taskRepo.createTask(data);
  }

  getTasksByCard(cardId) {
    return this.taskRepo.getTasksByCard(cardId);
  }

  getTaskById(id) {
    return this.taskRepo.getTaskById(id);
  }

  updateTask(id, data) {
    return this.taskRepo.updateTask(id, data);
  }

  deleteTask(id) {
    return this.taskRepo.deleteTask(id);
  }

  assignMember(taskId, memberId) {
    return this.taskRepo.assignMember(taskId, memberId);
  }

  removeMember(taskId, memberId) {
    return this.taskRepo.removeMember(taskId, memberId);
  }

  attachGitHub(taskId, attachment) {
    return this.taskRepo.attachGitHub(taskId, attachment);
  }

  getGitHubAttachments(taskId) {
    return this.taskRepo.getGitHubAttachments(taskId);
  }

  removeGitHubAttachment(taskId, attachmentId) {
    return this.taskRepo.removeGitHubAttachment(taskId, attachmentId);
  }
}

module.exports = TaskService;
