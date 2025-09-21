class Board {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description || '';
    this.ownerId = data.ownerId;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Board;
