class Task {
  constructor(data) {
    this.id = data.id;
    this.cardId = data.cardId;
    this.title = data.title;
    this.description = data.description || '';
    this.status = data.status || 'pending'; 
    this.ownerId = data.ownerId;     
    this.assignedMembers = data.assignedMembers || []; 
    this.githubAttachments = data.githubAttachments || []; 
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      cardId: this.cardId,
      title: this.title,
      description: this.description,
      status: this.status,
      ownerId: this.ownerId,
      assignedMembers: this.assignedMembers,
      githubAttachments: this.githubAttachments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Task;
