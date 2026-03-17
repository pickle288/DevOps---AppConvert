pipeline {
    agent { label 'docker' }

    //options {//disableConcurrentBuilds()}

    //environment { //EXAMPLE_VAR = 'value'}

    stages {

        stage('deps') {
            steps {
                sh 'npm ci'
                echo 'install dependencies ...'
            }
        }
        stage('lint') {
            steps {
                sh 'npx eslint .'
                echo 'Linting...'
            }
        }
        stage('test') {
            steps {
                sh 'npm test'
                echo 'Testing...'
            }
        }
        
        stage('build & push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-login',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                sh 'docker build -t $DOCKER_USERNAME/convert-app:1.0 .'
                echo 'Building...'
                sh 'docker push $DOCKER_USERNAME/convert-app:1.0'
                echo 'Deploying...'
                
                }
            }
        }
    }
}
