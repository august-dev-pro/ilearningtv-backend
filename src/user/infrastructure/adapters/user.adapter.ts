// L'adaptateur permet de transformer ou d'adapter les données d'un format source vers un format cible.
// Cela est particulièrement utile lorsque nous devons interagir avec des API externes ou des services ayant des structures de données différentes.

export class UserAdapter {
  // La méthode 'adapt' prend des données brutes d'un format spécifique et les transforme
  // en un format qui est attendu par le système de notre domaine.
  adapt(data: any) {
    // Exemple d'adaptation des données - ceci est un exemple générique.
    // Nous transformons les données pour que le format interne du système soit respecté.

    const adaptedData = {
      id: data.id,
      email: data.email,
      password: data.password,
      name: data.name,
      avatarUrl: data.avatarUrl,
      isActive: data.isActive,
      role: data.role,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };

    // Retournez les données adaptées dans un format compréhensible pour le système
    return adaptedData;
  }
}
