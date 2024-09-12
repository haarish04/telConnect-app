pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/sukruthi-landing']],
                    userRemoteConfigs: [[url: 'https://github.com/haarish04/telConnect-app']]
                ])
            }
        }
        stage('Install Dependencies') {
            steps {
                bat '''
                node -v
                npm -v
                dir
                dir
                npm install
                '''
            }
        }
        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }
    }
}