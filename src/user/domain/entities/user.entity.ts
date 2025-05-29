/**
 * UserEntity représente l'entité principale de User dans le domaine.
 * Elle contient les propriétés de base nécessaires à la gestion des données liées à User.
 */
import { Role } from '../enums/role.enum';

export class UserEntity {
  constructor(
    /**
     * L'identifiant unique de l'entité.
     * Utilisé pour retrouver de manière unique un enregistrement dans la base de données.
     *
     * Exemple : '123e4567-e89b-12d3-a456-426614174000'
     */
    private readonly id: string,

    /**
     * Champ email
     */
    private readonly email: string,
    /**
     * Champ password
     */
    private readonly password: string,
    /**
     * Champ name
     */
    private readonly name: string,
    /**
     * Champ isActive
     */
    private readonly isActive: boolean,
    /**
     * Champ role
     */
    private readonly role: Role,
    /**
     * Champ avatarUrl (optionnel)
     */
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

    private readonly avatarUrl?: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.email = email;
    this.password = password;
    this.name = name;
    this.isActive = isActive;
    this.role = role;
    this.avatarUrl = avatarUrl;
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

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getName(): string {
    return this.name;
  }

  getAvatarUrl(): string | undefined {
    return this.avatarUrl;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getRole(): Role {
    return this.role;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      name: this.name,
      avatarUrl: this.avatarUrl,
      isActive: this.isActive,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
