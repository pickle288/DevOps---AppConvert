pipeline {
    agent { label 'debian' }

    options {
        disableConcurrentBuilds()
    }

    environment {
        EXAMPLE_VAR = 'value'
    }

    stages {

        stage('Checkout') {
            steps {
                withCredentials([string(credentialsId: 't', variable: 'GITHUB_TOKEN')]) {
                    checkout scm
                    echo 'Checking out...'
                }
            }
        }

        stage('deps') {
            steps {
                sh 'npm ci'
                echo 'install dependencies ...'
            }
        }

        stage('test') {
            steps {
                sh 'npm test'
                echo 'Testing...'
            }
        }

        stage('lint') {
            steps {
                sh 'eslint .'
                echo 'Linting...'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t $DOCKER_USERNAME/convert-app:1.0 .'
                echo 'Building...'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-login',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh 'docker push $DOCKER_USERNAME/convert-app:1.0'
                    echo 'Deploying...'
                }
            }
        }
    }
}
