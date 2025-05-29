/**
 * ThumbnailEntity représente l'entité principale de Thumbnail dans le domaine.
 * Elle contient les propriétés de base nécessaires à la gestion des données liées à Thumbnail.
 */
export class ThumbnailEntity {
  constructor(
    /**
     * L'identifiant unique de l'entité.
     * Utilisé pour retrouver de manière unique un enregistrement dans la base de données.
     *
     * Exemple : '123e4567-e89b-12d3-a456-426614174000'
     */
    private readonly id: string,

    /**
     * Champ imageUrl
     */
    private readonly imageUrl: string,
    /**
     * Champ videoId
     */
    private readonly videoId: string,

    /**
     * La date de création de l'entité.
     * Définie lors de la création et ne change pas.
     *
     * Exemple : new Date('2022-01-01T10:00:00Z')
     */
    private readonly createdAt: Date,
    /**
     * La date de dernière mise à jour de l'entité.
     * Mise à jour à chaque modification.
     *
     * Exemple : new Date('2022-02-01T15:00:00Z')
     */
    private readonly updatedAt: Date,
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.videoId = videoId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): string {
    return this.id;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getVideoId(): string {
    return this.videoId;
  }

  toJSON() {
    return {
      id: this.id,
      imageUrl: this.imageUrl,
      videoId: this.videoId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
