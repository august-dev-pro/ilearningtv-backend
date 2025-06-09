<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# iLearningTV Backend

**iLearningTV** est une plateforme de streaming éducatif et communautaire, développée avec [NestJS](https://nestjs.com/) et [Prisma](https://www.prisma.io/) pour la gestion des vidéos, chaînes, utilisateurs, abonnements, commentaires, likes, catégories, etc.

---

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancement du projet](#lancement-du-projet)
- [Seed de la base de données](#seed-de-la-base-de-données)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [API & Documentation Swagger](#api--documentation-swagger)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## Fonctionnalités

- Authentification JWT (utilisateurs, rôles)
- Gestion des utilisateurs et profils
- Création et gestion de chaînes personnalisées
- Gestion des vidéos (upload, live, tendances, tags, vues, spectateurs live, etc.)
- Système d’abonnement aux chaînes
- Likes et commentaires sur les vidéos
- Catégorisation des vidéos
- Gestion des miniatures (thumbnails)
- Seed réaliste et personnalisable pour la base de données
- Sécurité CORS, gestion des erreurs, logs avancés
- Documentation Swagger auto-générée

---

## Architecture

- **NestJS** (TypeScript, architecture modulaire)
- **Prisma** (ORM PostgreSQL)
- **JWT** pour l’authentification
- **Multer** pour l’upload de fichiers
- **Swagger** pour la documentation API
- **Seed** avancé pour la génération de données réalistes

---

## Prérequis

- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL (ou adapter la variable `DATABASE_URL`)

---

## Installation

```bash
git clone https://github.com/ton-org/ilearningtv-backend.git
cd ilearningtv-backend
npm install
```

---

## Configuration

1. **Variables d’environnement**

Crée un fichier `.env` à la racine :

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ilearningtv
JWT_SECRET=un_secret_tres_long
PORT=3900
HOST=0.0.0.0
```

2. **Migrations Prisma**

```bash
npx prisma migrate deploy
# ou pour dev :
npx prisma migrate dev
```

---

## Lancement du projet

```bash
# Développement
npm run start:dev

# Production
npm run build
npm run start:prod
```

Le serveur démarre sur [http://localhost:3900](http://localhost:3900) par défaut.

---

## Seed de la base de données

Pour remplir la base avec des données réalistes (utilisateurs, chaînes, vidéos, abonnements, likes, commentaires, etc.) :

```bash
npm run seed
```

- Les chaînes ont des noms professionnels et variés.
- Les vidéos sont associées à des chaînes, avec tags, vues, spectateurs live, etc.
- Les abonnements, likes et commentaires sont générés aléatoirement.

---

## Tests

```bash
npm run test
npm run test:e2e
npm run test:cov
```

---

## Déploiement

Le backend est actuellement **déployé sur Render** :
➡️ [https://ilearningtv-backend.onrender.com](https://ilearningtv-backend.onrender.com)

- Les scripts de seed sont exécutés automatiquement lors du déploiement pour enrichir la base PostgreSQL.
- Les fichiers uploadés sont servis via `/uploads`.
- Swagger est désactivé en production par défaut.

### Docker

Le projet est **prêt pour un déploiement Docker** (voir `Dockerfile` et `docker-compose.yml`), mais cette option n’est pas encore activée sur l’environnement Render.
Vous pouvez lancer le projet en local avec Docker pour vos tests ou pour un futur déploiement cloud.

```bash
docker-compose up --build
```

---

## API & Documentation Swagger

La documentation interactive est disponible (hors production) à :

```
http://localhost:4000/iLearningtv-api/docs
```

---

## Structure du projet

```
ilearningtv-backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── seeds/
│   ├── auth/
│   ├── user/
│   ├── channel/
│   ├── video/
│   ├── category/
│   ├── comment/
│   ├── like/
│   ├── subscription/
│   ├── thumbnail/
│   └── common/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── uploads/
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
├── tsconfig.json
└── ... (autres fichiers de config)
```

- **src/** : code source principal, organisé par modules métier.
- **prisma/** : schéma et migrations de la base de données.
- **uploads/** : fichiers uploadés (vidéos, miniatures…).
- **.env.example** : exemple de configuration d’environnement.
- **Dockerfile / docker-compose.yml** : pour le déploiement et le dev local.
- **README.md** : ce fichier de documentation.
- **tsconfig.json** : configuration TypeScript.
- **package.json** : dépendances et scripts npm.

---

## Contribuer

1. Fork le repo

```bash
git clone https://github.com/august-dev-pro/ilearningtv-backend.git
```

2. Crée une branche

```bash
git checkout -b feature/ma-feature
```

3. Commit tes changements

```bash
git commit -am 'feat: ma feature'
```

4. Push la branche

```bash
git push origin feature/ma-feature
```

5. Ouvre une Pull Request sur GitHub

---

## Licence

Projet sous licence [MIT](LICENSE).

---

**Contact**
Pour toute question : [augustinselete01@gmail.com](https://august-dev-porfolio.vercel.app)

---

> _Projet réalisé avec ❤️ et NestJS pour la communauté iLearningTV._
