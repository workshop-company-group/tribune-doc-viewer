pipeline {
    agent {
        docker { image 'node:latest' }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm cache clean --force'
                sh 'npm i --force'
                sh 'npm set progress=false'
                sh 'npm install'
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
