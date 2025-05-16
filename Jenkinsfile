pipeline {
    agent any

    environment {
        ANDROID_HOME = "C:\\Users\\igorz\\AppData\\Local\\Android\\Sdk"
        PATH = "${env.PATH};${ANDROID_HOME}\\platform-tools"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/SynapsesZX/TypeScript_Allure_Mocha.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Verify ADB Connection') {
            steps {
                bat 'adb devices'
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

        stage('Stop Appium Server') {
            steps {
                echo 'Stopping Appium server...'
                bat 'taskkill /F /IM node.exe'
            }
        }
    }
}