pipeline {
    agent {
        docker { image 'node:latest' }
    }

    stages {
        stage('Install') {
            steps {
                sh 'echo pwd'
                sh 'echo "$PWD"Z'
                sh 'npm set progress=false'
                sh 'npm install'
                sh 'ng --version'
            }
        }
        stage('Tests') {
            steps {
                sh 'npm run test'
                sh 'npm run e2e'
            }
        }
        stage('Node Build') {
            steps {
                sh 'npm run build:prod'
                sh 'npm run '
            }
        }
        stage('Electron Build') {
            steps {
                sh 'npm run build:prod'
                sh 'electron-builder build'
            }
        }
    }
}