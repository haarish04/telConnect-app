pipeline {
    agent any

    environment {
        // Define the path to your locally installed npm on Windows
        NPM_PATH = 'C:/Program Files/nodejs/npm.cmd' // Replace with the correct path
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your code from version control (e.g., Git)
                git branch: 'sukruthi-landing', url: 'https://github.com/haarish04/telConnect-app'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies using the locally installed npm
                bat "npm install"
            }
        }

        stage('Build Application') {
            steps {
                // Build the Vite React app using the locally installed npm
                bat "npm run build"
            }
        }

        
    }

    post {
        always {
            // Clean up workspace after the build
            cleanWs()
        }
    }
}
