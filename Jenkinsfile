pipeline {
    agent { label 'docker' }

    options {
        disableConcurrentBuilds()
    }

    environment {
        EXAMPLE_VAR = 'value'
    }

    stages {

        stage('deps') {
            steps {
                sh 'npm ci'
                echo 'install dependencies ...'
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
