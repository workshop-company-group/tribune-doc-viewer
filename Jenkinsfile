properties([
    disableConcurrentBuilds()
])

pipeline {
    agent {
        label 'Node'
    }

    triggers {
        pollSCM('* * * * *')
    }

    environment {
        GITHUB_TOKEN = credentials('ghpersonal')
    }

    stages {
        stage('PreBuild') {
            steps {
                sh 'make before'
            }
        }
        stage('Install & Run') {
            steps {
                sh 'make build'
                sh 'make run'
            }
        }
        stage('Linter') {
            steps {
                sh 'make lint'
            }
        }
        stage('Test') {
            steps {
                sh 'make test'
            }
        }
        stage('NodeJS Build') {
            steps {
                sh 'make node-build'
            }
        }
        stage('Release') {
            steps {
                sh 'make electron-build'
            }
        }
    }

    post {
        success {
            sh 'make post-success'
        }
        unstable {
            sh 'make post-failure'
        }
        failure {
            sh 'make post-failure'
        }
        changed {
            sh 'make post-success'
        }
        always {
            sh 'make after'
        }
    }
}
