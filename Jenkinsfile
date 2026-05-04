pipeline {
    agent any

    environment {
        IMAGE_NAME = "lavender-coast"
    }

    stages {

            stage('Install') {
            steps {
                sh 'npm install'
                sh 'cd backend && npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Run') {
            steps {
                sh '''
                docker stop lavender || true
                docker rm lavender || true
                docker run -d -p 3000:3000 -p 5000:5000 --name lavender $IMAGE_NAME
                '''
            }
        }
    }
}
