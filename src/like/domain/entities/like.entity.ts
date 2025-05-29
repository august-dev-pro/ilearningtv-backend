/**
 * LikeEntity représente l'entité principale de Like dans le domaine.
 * Elle contient les propriétés de base nécessaires à la gestion des données liées à Like.
 */
export class LikeEntity {
  constructor(
    /**
     * L'identifiant unique de l'entité.
     * Utilisé pour retrouver de manière unique un enregistrement dans la base de données.
     *
     * Exemple : '123e4567-e89b-12d3-a456-426614174000'
     */
    private readonly id: string,
    /**
     * L'identifiant de l'utilisateur qui a créé le like.
     * Permet d'associer le like à un utilisateur spécifique.
     *
     * Exemple : 'user-123'
     */
    private readonly userId: string,
    /**
     * L'identifiant de la vidéo qui a reçu le like.
     * Permet d'associer le like à une vidéo spécifique.
     *
     * Exemple : 'video-456'
     */
    private readonly videoId: string,
    /**
     * La date de création de l'entité.
     * Définie lors de la création et ne change pas.
     *
     * Exemple : new Date('2022-01-01T10:00:00Z')
     */
    private readonly createdAt: Date,
  ) {}

  getId(): string {
    return this.id;
  }
  getUserId(): string {
    return this.userId;
  }
  getVideoId(): string {
    return this.videoId;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      videoId: this.videoId,
      createdAt: this.createdAt,
    };
  }
}
