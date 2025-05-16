pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/SynapsesZX/TypeScript_Allure_Mocha.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Start Appium Server') {
            steps {
                
                bat 'appium &'
                sleep 10
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx wdio run wdio.conf.js'
            }
        }

        stage('Publish Reports') {
            steps {
                
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }
}
