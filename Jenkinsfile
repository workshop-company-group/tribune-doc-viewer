pipeline {
    agent {
        docker { image 'node:latest' }
    }

    stages {
        stage('Install') {
            steps {
                sh 'rm -rf node_modules'
                sh 'npm cache clean --force'
                sh 'npm i --force'
                sh 'npm set progress=false'
                sh 'npm install'
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