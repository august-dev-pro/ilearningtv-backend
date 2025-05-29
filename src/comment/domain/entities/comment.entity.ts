/**
 * CommentEntity représente l'entité principale de Comment dans le domaine.
 * Elle contient les propriétés de base nécessaires à la gestion des données liées à Comment.
 */
export class CommentEntity {
  constructor(
    /**
     * L'identifiant unique de l'entité.
     * Utilisé pour retrouver de manière unique un enregistrement dans la base de données.
     *
     * Exemple : '123e4567-e89b-12d3-a456-426614174000'
     */
    private readonly id: string,

    /**
     * L'identifiant de l'utilisateur ayant créé le commentaire.
     * Utilisé pour lier le commentaire à un utilisateur dans le système.
     *
     * Exemple : 'user-123'
     */
    private readonly userId: string,
    /**
     * L'identifiant de la vidéo à laquelle le commentaire est associé.
     * Utilisé pour lier le commentaire à une vidéo dans le système.
     *
     * Exemple : 'video-456'
     */
    private readonly videoId: string,

    /**
     * Champ content
     */
    private readonly content: string,

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
    this.userId = userId;
    this.videoId = videoId;
    this.content = content;
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

  getContent(): string {
    return this.content;
  }

  getUserId(): string {
    return this.userId;
  }

  getVideoId(): string {
    return this.videoId;
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      content: this.content,
      userId: this.userId,
      videoId: this.videoId,
    };
  }
}
