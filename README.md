# app-convert – Application conteneurisée
##  Objectif
Création d'une app simple qui permet de convertir un montant d’une devise vers une autre via une API REST simple.  
Elle sert de base à la mise en place d’une chaîne DevOps complète : 
conteneurisation, CI/CD, infrastructure as code et déploiement sur AWS. 
---

## 🐳 Conteneurisation Docker
L’application est packagée dans une image Docker afin de garantir 
un environnement d’exécution identique entre les postes de développement,la CI et la production.

##  Architecture

- Application Node.js (Express)
- Endpoint REST : /convert
- Conteneurisation via Docker
- Exposition sur le port 8080

---

### Build de l'image
Depuis le répertoire du projet :
1/  docker build -t app-convert .
2/  docker run -p 8080:8080 app-convert
3/  -- http://localhost:8080 --

---

## 🚀 Évolutions prévues (DevOps)

- Mise en place d’un pipeline CI/CD GitLab
- Tests automatisés
- Push de l’image vers AWS ECR
- Déploiement sur AWS ECS (Fargate)
- Provisionnement de l’infrastructure avec Terraform
- Gestion sécurisée des credentials

---
