export class SubscriptionEntity {
  constructor(
    private readonly id: string,
    private readonly userId: string,
    private readonly channelId: string,
    private readonly createdAt: Date,
  ) {}

  getId() {
    return this.id;
  }
  getUserId() {
    return this.userId;
  }
  getChannelId() {
    return this.channelId;
  }
  getCreatedAt() {
    return this.createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      channelId: this.channelId,
      createdAt: this.createdAt,
    };
  }
}
