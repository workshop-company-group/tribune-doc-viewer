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
                sh 'npm -g config set user root'
                sh 'npm install --quiet --no-progress --unsafe-perm -g @angular/cli@latest firebase-tools'
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
