export class ChannelEntity {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly userId: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getUserId() {
    return this.userId;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
