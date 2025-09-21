class BoardInvite {
  constructor(data) {
    this.id = data.id;
    this.boardId = data.boardId;
    this.boardOwnerId = data.boardOwnerId;
    this.memberId = data.memberId; 
    this.emailMember = data.emailMember || null; 
    this.status = data.status || 'pending';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      boardId: this.boardId,
      boardOwnerId: this.boardOwnerId,
      memberId: this.memberId,
      emailMember: this.emailMember,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = BoardInvite;
