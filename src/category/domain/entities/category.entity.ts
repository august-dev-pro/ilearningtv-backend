/**
 * CategoryEntity représente l'entité principale de Category dans le domaine.
 * Elle contient les propriétés de base nécessaires à la gestion des données liées à Category.
 */
export class CategoryEntity {
  constructor(
    /**
     * L'identifiant unique de l'entité.
     * Utilisé pour retrouver de manière unique un enregistrement dans la base de données.
     *
     * Exemple : '123e4567-e89b-12d3-a456-426614174000'
     */
    private readonly id: string,
    /**
     * Champ name
     */
    private readonly name: string,
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
    /**
     * Champ videos
     * Liste des vidéos associées à cette catégorie.
     */
    private readonly videos?: any[], // ou VideoEntity[] si typé
  ) {}

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
  getVideos(): any[] | undefined {
    return this.videos;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      videos: this.videos,
    };
  }
}
