class Card {
    constructor(data) {
        this.id = data.id;
        this.boardId = data.boardId;
        this.name = data.name;
        this.description = data.description || '';
        this.ownerId = data.ownerId;
        this.list_member = data.list_member || [];
        this.tasks_count = data.tasks_count || 0;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    toJSON() {
        return {
            id: this.id,
            boardId: this.boardId,
            name: this.name,
            description: this.description,
            ownerId: this.ownerId,
            list_member: this.list_member,
            tasks_count: this.tasks_count,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Card;
