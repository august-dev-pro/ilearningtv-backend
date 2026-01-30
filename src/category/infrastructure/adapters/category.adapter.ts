// L'adaptateur permet de transformer ou d'adapter les données d'un format source vers un format cible.
// Cela est particulièrement utile lorsque nous devons interagir avec des API externes ou des services ayant des structures de données différentes.

export class CategoryAdapter {
  // La méthode 'adapt' prend des données brutes d'un format spécifique et les transforme
  // en un format qui est attendu par le système de notre domaine.
  adapt(data: any) {
    // Exemple d'adaptation des données - ceci est un exemple générique.
    // Nous transformons les données pour que le format interne du système soit respecté.

    const adaptedData = {
      // Assurez-vous que vous mappez les propriétés nécessaires et les transformez.
      id: data.id, // Mapping de l'ID de la donnée source à notre format interne
      name: data.fullName || data.name, // Exemple de transformation de champ
      description: data.details || data.description, // Gestion des données optionnelles
      createdAt: new Date(data.createdAt), // Transformation de la date
      updatedAt: new Date(data.updatedAt), // Idem pour la date de mise à jour
      // Vous pouvez adapter d'autres champs en fonction des exigences spécifiques
    };

    // Retournez les données adaptées dans un format compréhensible pour le système
    return adaptedData;
  }
}
