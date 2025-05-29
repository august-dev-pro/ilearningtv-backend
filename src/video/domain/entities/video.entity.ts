import { VideoTypeEnum } from '../enums/video-type.enum';

/**
 * VideoEntity représente l'entité principale de Video dans le domaine.
 * Elle contient les propriétés de base nécessaires à la gestion des données liées à Video.
 */
export class VideoEntity {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly description: string,
    private readonly fileUrl: string,
    private readonly category: { id: string; name: string },
    private readonly channel: { id: string; name: string },
    private readonly videoType: VideoTypeEnum,
    private readonly views: number,
    private readonly liveViewers?: number,
    private readonly publishedAt?: Date,
    private readonly duration?: number,
    private readonly tags?: string[],
    private readonly isLive?: boolean,
    private readonly shares?: number,
    private readonly reports?: number,
    private readonly thumbnail?: { id: string; url: string },
    private readonly likes?: number,
    private readonly comments?: number,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date,
  ) {
    /* this.id = id;
    this.title = title;
    this.description = description;
    this.fileUrl = fileUrl;
    this.videoType = videoType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt; */
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getFileUrl(): string {
    return this.fileUrl;
  }
  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  getVideoType(): VideoTypeEnum {
    return this.videoType;
  }

  getChannel(): { id: string; name: string } {
    return this.channel;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      fileUrl: this.fileUrl,
      category: this.category,
      channel: this.channel,
      videoType: this.videoType,
      views: this.views,
      liveViewers: this.liveViewers,
      publishedAt: this.publishedAt,
      duration: this.duration,
      tags: this.tags,
      isLive: this.isLive,
      shares: this.shares,
      reports: this.reports,
      thumbnail: this.thumbnail,
      likes: this.likes,
      comments: this.comments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
