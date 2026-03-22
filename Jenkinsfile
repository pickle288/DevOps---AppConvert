pipeline {
    agent { label 'docker' }

    //options {//disableConcurrentBuilds()}

    environment { 
        image-version = 'convert-app:1.0'
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
                //run du script lint eslint.config.json
                sh 'npm run lint'
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
                sh 'docker build -f .\app\Dockerfile -t pickle288/$image-version'
                echo 'Building...'
                sh 'docker push $DOCKER_USERNAME/$image-version'
                echo 'Deploying... name of image '


                }
            }
        }
    }
}
