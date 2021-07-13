pipeline {
    agent any

    environment {
        DISPLAY=:99.0
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install -g @angular/cli'
                sh 'npm set progress=false'
                sh 'npm install'
                sh 'ng --version'
            }
        }
        stage('Build') {
            steps {
                sh 'make build'
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