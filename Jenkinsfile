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

        stage('Start Appium Server') {
            steps {
                echo 'Starting Appium server...'
                bat 'powershell -Command "Start-Process appium -ArgumentList \'--port 4723\' -NoNewWindow -RedirectStandardOutput appium.log -RedirectStandardError appium.log"'
            }
        }

        stage('Wait for Appium') {
            steps {
                script {
                    def maxAttempts = 10
                    def attempt = 0
                    def isAppiumUp = false
                    while (attempt < maxAttempts && !isAppiumUp) {
                        try {
                            bat 'powershell -Command "Invoke-RestMethod -Uri http://localhost:4723/status"'
                            isAppiumUp = true
                        } catch (Exception e) {
                            echo "Appium not ready yet, retrying..."
                            sleep(time: 3, unit: 'SECONDS')
                            attempt++
                        }
                    }
                    if (!isAppiumUp) {
                        error "Appium server did not start within expected time"
                    }
                }
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