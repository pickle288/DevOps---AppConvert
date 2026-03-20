# app-convert – Application conteneurisée
##  Objectif
Ce projet a pour but de mettre en place une pipeline CI/CD complète autour d’une application Node.js conteneurisée avec Docker.
L’infrastructure s’appuie sur une VM locale hébergeant Jenkins et sur un dépôt GitHub, avec un déploiement cible sur AWS (ECR + ECS Fargate).
---

## 🐳 Conteneurisation Docker
L’application est packagée dans une image Docker éxposée sur le port 8080 afin de garantir 
un environnement d’exécution identique entre les postes de développement,la CI et la production.

##  Architecture
- VM locale avec Jenkins (pipeline declarative)
- Code source hébergé sur GitHub (branching et triggers CI)
- Application Node.js (Express)
- Endpoint REST principal : /convert
- Intégration avec AWS :
  -  amazon ECR pour le registre d’images
  - Amazon ECS (Fargate) pour l’orchestration des containers
  - Réseau AWS géré via Terraform (VPC, sous-réseaux, etc.)
---

## Workflow

- Mise en place d’un pipeline CI/CD Jenkins (lint, tests, build, push, déploiement)
- Gestion sécurisée des credentials (Jenkins credentials / AWS IAM)
- Build et push automatisés de l’image Docker vers AWS ECR
- Déploiement automatisé sur AWS ECS (Fargate)
- Provisionnement et mise à jour de l’infrastructure AWS avec Terraform

---
