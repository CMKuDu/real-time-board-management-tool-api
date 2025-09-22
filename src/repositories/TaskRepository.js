const{db} = require('../config/firebase')
const Task = require('../models/Task')

class TaskRepository {
    constructor() {
        this.collection = db.collection('tasks');
    }

    async createTask(taskData) {
        const snapshot = await this.collection.doc();
        const newTask = new Task({ ...taskData, id: snapshot.id });
        await snapshot.set(newTask.toJSON);
        return newTask.toJSON();
    }
    async getTaskByCard(cardId) {
        const snapshot = await this.collection.where('cardId', '==', cardId).get()
        return snapshot.docs.map(doc => doc.data);
    }
    async getTaskById(id) {
        if (id == null) throw new Error('Id by task cant null')
        const doc = await this.collection.doc(id).get();
        if (!doc.exits) throw new Error('Task not found');
        return doc.data();
    }
    async updateTask(id, data) {
        const taskRef = this.collection.doc(id);
        await taskRef.update({ ...data, updatedAt: new Date() });
        const updatedDoc = await taskRef.get();
        return updatedDoc.data();
    }
    async deleteTask(id) {
        await this.collection.doc(id).delete();
    }

    // Assign member
    async assignMember(taskId, memberId) {
        const taskRef = this.collection.doc(taskId);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) throw new Error('Task not found');
        const task = taskDoc.data();
        if (!task.assignedMembers.includes(memberId)) {
            task.assignedMembers.push(memberId);
        }
        await taskRef.update({ assignedMembers: task.assignedMembers, updatedAt: new Date() });
        return { taskId, memberId };
    }

    // Remove member
    async removeMember(taskId, memberId) {
        const taskRef = this.collection.doc(taskId);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) throw new Error('Task not found');
        const task = taskDoc.data();
        task.assignedMembers = task.assignedMembers.filter(id => id !== memberId);
        await taskRef.update({ assignedMembers: task.assignedMembers, updatedAt: new Date() });
    }

    // GitHub attachments
    async attachGitHub(taskId, attachment) {
        const taskRef = this.collection.doc(taskId);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) throw new Error('Task not found');
        const task = taskDoc.data();
        task.githubAttachments.push(attachment);
        await taskRef.update({ githubAttachments: task.githubAttachments, updatedAt: new Date() });
        return { taskId, ...attachment };
    }

    async getGitHubAttachments(taskId) {
        const taskDoc = await this.collection.doc(taskId).get();
        if (!taskDoc.exists) throw new Error('Task not found');
        const task = taskDoc.data();
        return task.githubAttachments || [];
    }

    async removeGitHubAttachment(taskId, attachmentId) {
        const taskRef = this.collection.doc(taskId);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) throw new Error('Task not found');
        const task = taskDoc.data();
        task.githubAttachments = task.githubAttachments.filter(a => a.id !== attachmentId);
        await taskRef.update({ githubAttachments: task.githubAttachments, updatedAt: new Date() });
    }
}
module.exports = TaskRepository;