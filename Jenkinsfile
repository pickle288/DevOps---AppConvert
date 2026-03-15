pipeline {
    agent label 'debian' // Définir l'agent (any,docker, label "nom_agent", etc.)


    // Options globales pour le pipeline
    options {
    // Par exemple, pour limiter le nombre de builds en parallèle
        disableConcurrentBuilds()
    }     
    environment {
    // Variables d'environnement globales
        EXAMPLE_VAR = 'value'
    }
    // --- Définition des étapes du pipeline ---
    stages {
        stage('Checkout') {
            steps {
                // pour importer le code source dans l'agent (ex: git checkout)
                checkout scm
                echo 'Checking out...'
             }
            }
     stage('deps') {
            steps {
                // pour installer les dépendances, configurer l'environnement, etc.
                sh 'npm ci'
                echo 'install dependencies ...'
            }
        }
        stage('test') {
            steps {
                // pour exécuter les tests unitaires, d'intégration, etc.
                sh 'npm test'
                echo 'Testing...'
            }
        }
        stage('lint') {
            steps {
                // permet de vérifier la qualité du code, détecter les erreurs de syntaxe, etc.
                sh 'eslint .'
                echo 'Linting...'
            }
        }
//Build : sert à construire l'application, compiler le code source, etc.
        stage('Build') {
            steps {
                // Commandes pour construire l'application
                sh 'docker build -t $DOCKER_USERNAME/convert-app:1.0 .'
                echo 'Building...'
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-login', 
                    usernameVariable: 'DOCKER_USERNAME', 
                    passwordVariable: 'DOCKER_PASSWORD'
                    )]) {
                    // Commandes pour déployer l'application
                    
                    sh 'docker push $DOCKER_USERNAME/convert-app:1.0'
                    echo 'Deploying...'
            }
        }
    }
    }
