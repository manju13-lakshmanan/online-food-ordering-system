pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/manju13-lakshmanan/online-food-ordering-system.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t foodies-backend ./backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'docker build -t foodies-frontend ./frontend'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}
