---
title: Jenkins Patterns Knowledge Base
description: Comprehensive Jenkins pipeline patterns and best practices for modern CI/CD implementations.
type: knowledge-base
category: cicd
version: 1.0.0
tags:
    - knowledge
    - cicd
    - jenkins
    - patterns
last_updated: 2025-11-19
---

# Jenkins Patterns Knowledge Base

Comprehensive Jenkins pipeline patterns and best practices for modern CI/CD implementations.

## Table of Contents

- [Jenkins Patterns Knowledge Base](#jenkins-patterns-knowledge-base)
    - [Table of Contents](#table-of-contents)
    - [Declarative Pipeline Patterns](#declarative-pipeline-patterns)
        - [Basic Production Pipeline](#basic-production-pipeline)
        - [Matrix Build Pattern](#matrix-build-pattern)
        - [Dynamic Pipeline Generation](#dynamic-pipeline-generation)
    - [Scripted Pipeline Patterns](#scripted-pipeline-patterns)
        - [Advanced Scripted Pipeline](#advanced-scripted-pipeline)
    - [Shared Libraries](#shared-libraries)
        - [Library Structure](#library-structure)
        - [Global Variable Example](#global-variable-example)
        - [Docker Build Library](#docker-build-library)
        - [Testing Library](#testing-library)
        - [Usage in Pipeline](#usage-in-pipeline)
    - [Multi-Branch Pipelines](#multi-branch-pipelines)
        - [Jenkinsfile for Multi-Branch](#jenkinsfile-for-multi-branch)
    - [Performance Optimization](#performance-optimization)
        - [Parallel Execution Patterns](#parallel-execution-patterns)
        - [Caching Strategies](#caching-strategies)

## Declarative Pipeline Patterns

### Basic Production Pipeline

```groovy
pipeline {
    agent {
        kubernetes {
            yaml """
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: node
                    image: node:18-alpine
                    command:
                    - cat
                    tty: true
                  - name: docker
                    image: docker:24.0.5-dind
                    securityContext:
                      privileged: true
                    volumeMounts:
                    - name: docker-sock
                      mountPath: /var/run/docker.sock
                  volumes:
                  - name: docker-sock
                    hostPath:
                      path: /var/run/docker.sock
            """
        }
    }

    environment {
        NODE_ENV = 'production'
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = "${env.JOB_NAME}"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        KUBECONFIG = credentials('kubeconfig')
    }

    options {
        buildDiscarder(logRotator(
            numToKeepStr: '10',
            artifactNumToKeepStr: '5'
        ))
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
        skipDefaultCheckout()
    }

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['dev', 'staging', 'production'],
            description: 'Target deployment environment'
        )
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: false,
            description: 'Skip test execution'
        )
        string(
            name: 'BRANCH_NAME',
            defaultValue: 'main',
            description: 'Branch to build'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(
                    branches: [[name: "*/${params.BRANCH_NAME}"]],
                    extensions: [cloneOption(depth: 1, shallow: true)],
                    userRemoteConfigs: [[url: env.GIT_URL]]
                )

                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.BUILD_VERSION = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                container('node') {
                    sh '''
                        npm ci --only=production
                        npm ci --only=dev
                    '''
                }
            }
        }

        stage('Code Quality') {
            parallel {
                stage('Lint') {
                    when {
                        not { params.SKIP_TESTS }
                    }
                    steps {
                        container('node') {
                            sh 'npm run lint'
                        }
                    }
                }
                stage('Security Audit') {
                    steps {
                        container('node') {
                            sh '''
                                npm audit --audit-level high
                                npm run security:check || true
                            '''
                        }
                    }
                }
            }
        }

        stage('Test') {
            when {
                not { params.SKIP_TESTS }
            }
            parallel {
                stage('Unit Tests') {
                    steps {
                        container('node') {
                            sh '''
                                npm run test:unit -- --reporter=junit --outputFile=unit-test-results.xml
                                npm run test:coverage
                            '''
                        }
                    }
                    post {
                        always {
                            publishTestResults testResultsPattern: 'unit-test-results.xml'
                            publishCoverage adapters: [
                                istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')
                            ], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        container('node') {
                            sh '''
                                docker-compose -f docker-compose.test.yml up -d
                                npm run test:integration
                                docker-compose -f docker-compose.test.yml down
                            '''
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                container('docker') {
                    script {
                        def image = docker.build("${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.BUILD_VERSION}")

                        docker.withRegistry("https://${env.DOCKER_REGISTRY}", 'docker-registry-credentials') {
                            image.push()
                            image.push('latest')
                        }

                        env.DOCKER_IMAGE = "${env.DOCKER_REGISTRY}/${env.IMAGE_NAME}:${env.BUILD_VERSION}"
                    }
                }
            }
        }

        stage('Security Scan') {
            steps {
                container('docker') {
                    script {
                        sh """
                            docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                            aquasec/trivy image --exit-code 1 --severity HIGH,CRITICAL \\
                            ${env.DOCKER_IMAGE}
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    expression { params.DEPLOY_ENV != 'production' || currentBuild.result == null }
                }
            }
            steps {
                script {
                    def deployEnv = params.DEPLOY_ENV
                    if (env.BRANCH_NAME == 'develop') {
                        deployEnv = 'dev'
                    } else if (env.BRANCH_NAME == 'main' && params.DEPLOY_ENV == 'dev') {
                        deployEnv = 'staging'
                    }

                    deployToEnvironment(deployEnv, env.DOCKER_IMAGE)
                }
            }
        }

        stage('Smoke Tests') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    def targetUrl = getEnvironmentUrl(params.DEPLOY_ENV)
                    runSmokeTests(targetUrl)
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            script {
                if (env.BRANCH_NAME == 'main') {
                    slackSend(
                        channel: '#deployments',
                        color: 'good',
                        message: "✅ Production deployment successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                    )
                }
            }
        }
        failure {
            slackSend(
                channel: '#alerts',
                color: 'danger',
                message: "❌ Pipeline failed: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${env.BUILD_URL}"
            )
        }
        unstable {
            emailext(
                subject: "⚠️ Unstable build: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The build completed with warnings. Please check: ${env.BUILD_URL}",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}

// Helper functions
def deployToEnvironment(String environment, String dockerImage) {
    sh """
        helm upgrade --install myapp-${environment} ./helm-chart \\
            --namespace ${environment} \\
            --set image.repository=\$(echo ${dockerImage} | cut -d':' -f1) \\
            --set image.tag=\$(echo ${dockerImage} | cut -d':' -f2) \\
            --set environment=${environment} \\
            --wait --timeout=10m
    """
}

def getEnvironmentUrl(String environment) {
    def urls = [
        'dev': 'https://dev.myapp.com',
        'staging': 'https://staging.myapp.com',
        'production': 'https://myapp.com'
    ]
    return urls[environment]
}

def runSmokeTests(String targetUrl) {
    sh """
        curl -f ${targetUrl}/health || exit 1
        curl -f ${targetUrl}/api/version || exit 1
    """
}
```

### Matrix Build Pattern

```groovy
pipeline {
    agent none

    stages {
        stage('Matrix Build') {
            matrix {
                axes {
                    axis {
                        name 'NODE_VERSION'
                        values '14', '16', '18', '20'
                    }
                    axis {
                        name 'OS'
                        values 'ubuntu', 'alpine'
                    }
                }
                excludes {
                    exclude {
                        axis {
                            name 'NODE_VERSION'
                            values '14'
                        }
                        axis {
                            name 'OS'
                            values 'alpine'
                        }
                    }
                }
                stages {
                    stage('Test') {
                        agent {
                            docker {
                                image "node:${NODE_VERSION}-${OS}"
                            }
                        }
                        steps {
                            sh '''
                                npm ci
                                npm test
                            '''
                        }
                    }
                }
            }
        }
    }
}
```

### Dynamic Pipeline Generation

```groovy
pipeline {
    agent any

    stages {
        stage('Generate Pipelines') {
            steps {
                script {
                    def services = ['api', 'frontend', 'worker']
                    def parallelStages = [:]

                    services.each { service ->
                        parallelStages["Build ${service}"] = {
                            stage("Build ${service}") {
                                node {
                                    checkout scm
                                    dir(service) {
                                        sh """
                                            docker build -t myapp-${service}:${BUILD_NUMBER} .
                                            docker push myapp-${service}:${BUILD_NUMBER}
                                        """
                                    }
                                }
                            }
                        }

                        parallelStages["Test ${service}"] = {
                            stage("Test ${service}") {
                                node {
                                    checkout scm
                                    dir(service) {
                                        sh """
                                            npm ci
                                            npm test
                                        """
                                    }
                                }
                            }
                        }
                    }

                    parallel parallelStages
                }
            }
        }
    }
}
```

## Scripted Pipeline Patterns

### Advanced Scripted Pipeline

```groovy
@Library('shared-library@main') _

def deploymentConfig = [
    dev: [
        namespace: 'development',
        replicas: 1,
        resources: [memory: '256Mi', cpu: '100m']
    ],
    staging: [
        namespace: 'staging',
        replicas: 2,
        resources: [memory: '512Mi', cpu: '200m']
    ],
    production: [
        namespace: 'production',
        replicas: 5,
        resources: [memory: '1Gi', cpu: '500m']
    ]
]

node {
    def app
    def dockerImage
    def gitCommit

    try {
        stage('Checkout') {
            checkout scm
            gitCommit = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            echo "Building commit ${gitCommit}"
        }

        stage('Environment Setup') {
            env.BUILD_VERSION = "${BUILD_NUMBER}-${gitCommit}"
            env.DOCKER_IMAGE = "myregistry/myapp:${env.BUILD_VERSION}"

            // Load environment-specific configuration
            if (env.BRANCH_NAME == 'main') {
                env.TARGET_ENV = 'production'
            } else if (env.BRANCH_NAME == 'develop') {
                env.TARGET_ENV = 'staging'
            } else {
                env.TARGET_ENV = 'dev'
            }
        }

        stage('Dependencies') {
            parallel(
                "Install Node Dependencies": {
                    sh 'npm ci'
                },
                "Install Python Dependencies": {
                    sh '''
                        python3 -m venv venv
                        . venv/bin/activate
                        pip install -r requirements.txt
                    '''
                },
                "Setup Test Database": {
                    sh '''
                        docker run -d --name test-db -p 5432:5432 \\
                        -e POSTGRES_DB=testdb -e POSTGRES_PASSWORD=test \\
                        postgres:13-alpine
                    '''
                }
            )
        }

        stage('Code Quality') {
            parallel(
                "Lint JavaScript": {
                    sh 'npm run lint'
                },
                "Lint Python": {
                    sh '''
                        . venv/bin/activate
                        flake8 src/
                        black --check src/
                    '''
                },
                "Security Scan": {
                    sh 'npm audit --audit-level=high'
                    sh '''
                        . venv/bin/activate
                        safety check
                    '''
                }
            )
        }

        stage('Test') {
            try {
                parallel(
                    "Unit Tests": {
                        sh '''
                            npm run test:unit -- --reporter=xunit --outputFile=unit-tests.xml
                            npm run coverage
                        '''
                        publishTestResults testResultsPattern: 'unit-tests.xml'
                    },
                    "Integration Tests": {
                        sh 'npm run test:integration'
                    },
                    "Python Tests": {
                        sh '''
                            . venv/bin/activate
                            pytest --junitxml=pytest-results.xml --cov=src --cov-report=xml
                        '''
                        publishTestResults testResultsPattern: 'pytest-results.xml'
                    }
                )
            } finally {
                // Cleanup test resources
                sh 'docker rm -f test-db || true'
            }
        }

        stage('Build') {
            app = docker.build(env.DOCKER_IMAGE)

            // Multi-stage build optimization
            sh """
                docker build --target production \\
                --cache-from myregistry/myapp:cache \\
                -t ${env.DOCKER_IMAGE} .
            """
        }

        stage('Push Image') {
            docker.withRegistry('https://myregistry', 'docker-registry-creds') {
                app.push()
                app.push('latest')

                // Push cache layer
                sh "docker tag ${env.DOCKER_IMAGE} myregistry/myapp:cache"
                sh "docker push myregistry/myapp:cache"
            }
        }

        stage('Security Scan') {
            sh """
                docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \\
                aquasec/trivy image --exit-code 1 --severity HIGH,CRITICAL \\
                ${env.DOCKER_IMAGE}
            """
        }

        stage('Deploy') {
            def config = deploymentConfig[env.TARGET_ENV]

            if (env.TARGET_ENV == 'production') {
                timeout(time: 5, unit: 'MINUTES') {
                    input message: 'Deploy to production?', ok: 'Deploy',
                          submitterParameter: 'DEPLOYER'
                }
                echo "Deployment approved by ${env.DEPLOYER}"
            }

            // Blue-Green deployment for production
            if (env.TARGET_ENV == 'production') {
                deployBlueGreen(config)
            } else {
                deployRolling(config)
            }
        }

        stage('Post-Deploy Tests') {
            def appUrl = getAppUrl(env.TARGET_ENV)

            retry(3) {
                sh """
                    curl -f ${appUrl}/health
                    curl -f ${appUrl}/api/version
                """
            }

            // Run smoke tests
            sh """
                newman run postman-collection.json \\
                --environment ${env.TARGET_ENV}-environment.json \\
                --reporters cli,junit --reporter-junit-export smoke-test-results.xml
            """
            publishTestResults testResultsPattern: 'smoke-test-results.xml'
        }

        stage('Monitoring Setup') {
            // Setup monitoring and alerting
            sh """
                kubectl apply -f monitoring/servicemonitor-${env.TARGET_ENV}.yaml
                kubectl apply -f monitoring/alerts-${env.TARGET_ENV}.yaml
            """
        }

    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        // Cleanup
        sh 'docker system prune -f'

        // Notifications
        def status = currentBuild.result ?: 'SUCCESS'
        def color = status == 'SUCCESS' ? 'good' : 'danger'
        def emoji = status == 'SUCCESS' ? '✅' : '❌'

        slackSend(
            channel: '#deployments',
            color: color,
            message: "${emoji} ${status}: ${env.JOB_NAME} #${env.BUILD_NUMBER} to ${env.TARGET_ENV}"
        )

        if (status == 'FAILURE') {
            emailext(
                subject: "Pipeline Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Pipeline failed. Check: ${env.BUILD_URL}",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}

def deployBlueGreen(config) {
    // Implement blue-green deployment logic
    def currentSlot = getCurrentSlot(config.namespace)
    def newSlot = currentSlot == 'blue' ? 'green' : 'blue'

    echo "Deploying to ${newSlot} slot"

    sh """
        helm upgrade --install myapp-${newSlot} ./helm-chart \\
            --namespace ${config.namespace} \\
            --set slot=${newSlot} \\
            --set image=${env.DOCKER_IMAGE} \\
            --set replicas=${config.replicas} \\
            --wait --timeout=10m
    """

    // Health check new slot
    sh "kubectl wait --for=condition=ready pod -l app=myapp,slot=${newSlot} --timeout=300s"

    // Switch traffic
    input message: "Switch traffic to ${newSlot}?", ok: 'Switch'

    sh """
        kubectl patch service myapp -p '{"spec":{"selector":{"slot":"${newSlot}"}}}'
    """

    // Cleanup old slot after delay
    sleep(time: 300, unit: 'SECONDS')
    sh "helm delete myapp-${currentSlot} --namespace ${config.namespace}"
}

def deployRolling(config) {
    sh """
        helm upgrade --install myapp ./helm-chart \\
            --namespace ${config.namespace} \\
            --set image=${env.DOCKER_IMAGE} \\
            --set replicas=${config.replicas} \\
            --set resources.memory=${config.resources.memory} \\
            --set resources.cpu=${config.resources.cpu} \\
            --wait --timeout=10m
    """
}

def getCurrentSlot(namespace) {
    def result = sh(
        script: "kubectl get service myapp -n ${namespace} -o jsonpath='{.spec.selector.slot}' || echo 'blue'",
        returnStdout: true
    ).trim()
    return result ?: 'blue'
}

def getAppUrl(environment) {
    def urls = [
        dev: 'https://dev.myapp.com',
        staging: 'https://staging.myapp.com',
        production: 'https://myapp.com'
    ]
    return urls[environment]
}
```

## Shared Libraries

### Library Structure

```
vars/
├── deployToKubernetes.groovy
├── buildDockerImage.groovy
├── runTests.groovy
├── sendNotification.groovy
└── securityScan.groovy

src/
└── com/
    └── company/
        └── jenkins/
            ├── Docker.groovy
            ├── Kubernetes.groovy
            └── Utils.groovy

resources/
├── template/
│   ├── deployment.yaml
│   └── service.yaml
└── scripts/
    └── deploy.sh
```

### Global Variable Example

```groovy
// vars/deployToKubernetes.groovy
def call(Map config) {
    echo "Deploying ${config.appName} to ${config.environment}"

    // Validate required parameters
    if (!config.appName || !config.environment || !config.image) {
        error("Missing required parameters: appName, environment, image")
    }

    // Set defaults
    config.namespace = config.namespace ?: config.environment
    config.replicas = config.replicas ?: 1
    config.timeout = config.timeout ?: '10m'

    // Apply Kubernetes manifests
    sh """
        helm upgrade --install ${config.appName} ./helm-chart \\
            --namespace ${config.namespace} \\
            --create-namespace \\
            --set image.repository=\$(echo ${config.image} | cut -d':' -f1) \\
            --set image.tag=\$(echo ${config.image} | cut -d':' -f2) \\
            --set environment=${config.environment} \\
            --set replicas=${config.replicas} \\
            --wait --timeout=${config.timeout}
    """

    // Verify deployment
    sh """
        kubectl rollout status deployment/${config.appName} -n ${config.namespace}
        kubectl get pods -l app=${config.appName} -n ${config.namespace}
    """

    return [
        success: true,
        endpoint: "https://${config.environment}.myapp.com"
    ]
}
```

### Docker Build Library

```groovy
// vars/buildDockerImage.groovy
def call(Map config) {
    def image
    def imageTag = config.tag ?: "${env.BUILD_NUMBER}-${env.GIT_COMMIT?.take(7)}"
    def imageName = "${config.registry}/${config.repository}:${imageTag}"

    echo "Building Docker image: ${imageName}"

    // Build image with caching
    if (config.useCache) {
        sh """
            docker pull ${config.registry}/${config.repository}:cache || true
            docker build \\
                --cache-from ${config.registry}/${config.repository}:cache \\
                -t ${imageName} \\
                -t ${config.registry}/${config.repository}:cache \\
                ${config.context ?: '.'}
        """
    } else {
        image = docker.build(imageName, config.context ?: '.')
    }

    // Security scan if enabled
    if (config.securityScan) {
        securityScan([image: imageName])
    }

    // Push image
    docker.withRegistry("https://${config.registry}", config.credentials) {
        if (image) {
            image.push()
            image.push('latest')
        } else {
            sh "docker push ${imageName}"
            sh "docker push ${config.registry}/${config.repository}:cache"
        }
    }

    return [
        image: imageName,
        registry: config.registry,
        repository: config.repository,
        tag: imageTag
    ]
}
```

### Testing Library

```groovy
// vars/runTests.groovy
def call(Map config) {
    def testResults = [:]

    if (config.unit) {
        stage('Unit Tests') {
            try {
                sh config.unit.command ?: 'npm run test:unit'
                testResults.unit = 'PASSED'
            } catch (Exception e) {
                testResults.unit = 'FAILED'
                if (!config.continueOnFailure) {
                    throw e
                }
            } finally {
                if (config.unit.results) {
                    publishTestResults testResultsPattern: config.unit.results
                }
            }
        }
    }

    if (config.integration) {
        stage('Integration Tests') {
            try {
                if (config.integration.services) {
                    // Start services
                    sh "docker-compose -f ${config.integration.services} up -d"
                }

                sh config.integration.command ?: 'npm run test:integration'
                testResults.integration = 'PASSED'

            } catch (Exception e) {
                testResults.integration = 'FAILED'
                if (!config.continueOnFailure) {
                    throw e
                }
            } finally {
                if (config.integration.services) {
                    sh "docker-compose -f ${config.integration.services} down"
                }
                if (config.integration.results) {
                    publishTestResults testResultsPattern: config.integration.results
                }
            }
        }
    }

    if (config.e2e) {
        stage('E2E Tests') {
            try {
                sh config.e2e.command ?: 'npm run test:e2e'
                testResults.e2e = 'PASSED'
            } catch (Exception e) {
                testResults.e2e = 'FAILED'
                if (!config.continueOnFailure) {
                    throw e
                }
            } finally {
                if (config.e2e.results) {
                    publishTestResults testResultsPattern: config.e2e.results
                }
                if (config.e2e.artifacts) {
                    archiveArtifacts artifacts: config.e2e.artifacts, allowEmptyArchive: true
                }
            }
        }
    }

    return testResults
}
```

### Usage in Pipeline

```groovy
@Library('shared-library@main') _

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    def buildResult = buildDockerImage([
                        registry: 'myregistry.com',
                        repository: 'myapp',
                        credentials: 'docker-registry-creds',
                        useCache: true,
                        securityScan: true
                    ])

                    env.DOCKER_IMAGE = buildResult.image
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    runTests([
                        unit: [
                            command: 'npm run test:unit',
                            results: 'test-results.xml'
                        ],
                        integration: [
                            command: 'npm run test:integration',
                            services: 'docker-compose.test.yml'
                        ],
                        continueOnFailure: false
                    ])
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    deployToKubernetes([
                        appName: 'myapp',
                        environment: 'staging',
                        image: env.DOCKER_IMAGE,
                        replicas: 2
                    ])
                }
            }
        }
    }
}
```

## Multi-Branch Pipelines

### Jenkinsfile for Multi-Branch

```groovy
pipeline {
    agent none

    environment {
        DOCKER_REGISTRY = 'myregistry.com'
        APP_NAME = 'myapp'
    }

    stages {
        stage('Setup') {
            agent any
            steps {
                script {
                    // Determine environment based on branch
                    if (env.BRANCH_NAME == 'main') {
                        env.TARGET_ENV = 'production'
                        env.DEPLOY_REPLICAS = '5'
                        env.REQUIRES_APPROVAL = 'true'
                    } else if (env.BRANCH_NAME == 'develop') {
                        env.TARGET_ENV = 'staging'
                        env.DEPLOY_REPLICAS = '2'
                        env.REQUIRES_APPROVAL = 'false'
                    } else if (env.BRANCH_NAME.startsWith('feature/')) {
                        env.TARGET_ENV = 'dev'
                        env.DEPLOY_REPLICAS = '1'
                        env.REQUIRES_APPROVAL = 'false'
                    } else {
                        env.TARGET_ENV = 'none'
                        env.DEPLOY_REPLICAS = '0'
                        env.REQUIRES_APPROVAL = 'false'
                    }

                    echo "Branch: ${env.BRANCH_NAME}, Target: ${env.TARGET_ENV}"
                }
            }
        }

        stage('Build & Test') {
            when {
                not { environment name: 'TARGET_ENV', value: 'none' }
            }
            agent {
                docker {
                    image 'node:18'
                }
            }
            steps {
                sh '''
                    npm ci
                    npm run lint
                    npm run test
                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            when {
                not { environment name: 'TARGET_ENV', value: 'none' }
            }
            agent any
            steps {
                script {
                    def imageTag = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}".replaceAll('/', '-')
                    env.DOCKER_IMAGE = "${env.DOCKER_REGISTRY}/${env.APP_NAME}:${imageTag}"

                    sh "docker build -t ${env.DOCKER_IMAGE} ."
                    sh "docker push ${env.DOCKER_IMAGE}"
                }
            }
        }

        stage('Deploy') {
            when {
                allOf {
                    not { environment name: 'TARGET_ENV', value: 'none' }
                    anyOf {
                        branch 'main'
                        branch 'develop'
                        branch 'feature/*'
                    }
                }
            }
            agent any
            steps {
                script {
                    if (env.REQUIRES_APPROVAL == 'true') {
                        timeout(time: 10, unit: 'MINUTES') {
                            input message: "Deploy to ${env.TARGET_ENV}?",
                                  ok: 'Deploy',
                                  submitterParameter: 'DEPLOYER'
                        }
                    }

                    sh """
                        helm upgrade --install ${env.APP_NAME}-${env.TARGET_ENV} ./helm-chart \\
                            --namespace ${env.TARGET_ENV} \\
                            --set image=${env.DOCKER_IMAGE} \\
                            --set replicas=${env.DEPLOY_REPLICAS} \\
                            --set environment=${env.TARGET_ENV}
                    """
                }
            }
        }

        stage('Integration Tests') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            agent any
            steps {
                script {
                    def appUrl = "https://${env.TARGET_ENV}.myapp.com"

                    // Wait for deployment
                    sleep(time: 30, unit: 'SECONDS')

                    // Run integration tests
                    sh """
                        curl -f ${appUrl}/health
                        newman run integration-tests.json \\
                            --env-var baseUrl=${appUrl}
                    """
                }
            }
        }
    }

    post {
        always {
            node {
                cleanWs()
            }
        }
        success {
            script {
                if (env.BRANCH_NAME == 'main') {
                    slackSend(
                        channel: '#releases',
                        color: 'good',
                        message: "🚀 Production deployment successful: ${env.BUILD_URL}"
                    )
                }
            }
        }
        failure {
            slackSend(
                channel: '#alerts',
                color: 'danger',
                message: "❌ Pipeline failed: ${env.JOB_NAME} ${env.BRANCH_NAME} #${env.BUILD_NUMBER}"
            )
        }
    }
}
```

## Performance Optimization

### Parallel Execution Patterns

```groovy
pipeline {
    agent none

    stages {
        stage('Parallel Build Matrix') {
            matrix {
                axes {
                    axis {
                        name 'PLATFORM'
                        values 'linux/amd64', 'linux/arm64'
                    }
                    axis {
                        name 'VERSION'
                        values 'node:16', 'node:18', 'node:20'
                    }
                }
                stages {
                    stage('Build & Test') {
                        agent {
                            docker {
                                image "${VERSION}"
                            }
                        }
                        steps {
                            sh '''
                                npm ci
                                npm run test
                                npm run build
                            '''
                        }
                    }
                }
            }
        }

        stage('Parallel Services') {
            parallel {
                stage('Frontend') {
                    agent any
                    steps {
                        dir('frontend') {
                            sh '''
                                npm ci
                                npm run build
                                docker build -t frontend:${BUILD_NUMBER} .
                            '''
                        }
                    }
                }
                stage('Backend') {
                    agent any
                    steps {
                        dir('backend') {
                            sh '''
                                npm ci
                                npm run build
                                docker build -t backend:${BUILD_NUMBER} .
                            '''
                        }
                    }
                }
                stage('Worker') {
                    agent any
                    steps {
                        dir('worker') {
                            sh '''
                                npm ci
                                npm run build
                                docker build -t worker:${BUILD_NUMBER} .
                            '''
                        }
                    }
                }
            }
        }
    }
}
```

### Caching Strategies

```groovy
pipeline {
    agent any

    options {
        // Keep workspace between builds for caching
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
                // Shallow clone for faster checkout
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${env.BRANCH_NAME}"]],
                    extensions: [
                        [$class: 'CloneOption', depth: 1, shallow: true],
                        [$class: 'CheckoutOption', timeout: 20]
                    ],
                    userRemoteConfigs: [[url: env.GIT_URL]]
                ])
            }
        }

        stage('Cache Dependencies') {
            steps {
                script {
                    // Check if node_modules cache is valid
                    def packageLockExists = fileExists('package-lock.json')
                    def nodeModulesExists = fileExists('node_modules')
                    def cacheValid = false

                    if (packageLockExists && nodeModulesExists) {
                        // Check if package-lock.json is newer than node_modules
                        def packageLockTime = sh(
                            script: 'stat -c %Y package-lock.json',
                            returnStdout: true
                        ).trim() as Long

                        def nodeModulesTime = sh(
                            script: 'stat -c %Y node_modules',
                            returnStdout: true
                        ).trim() as Long

                        cacheValid = nodeModulesTime >= packageLockTime
                    }

                    if (!cacheValid) {
                        echo "Installing dependencies..."
                        sh 'npm ci --cache .npm --prefer-offline'
                    } else {
                        echo "Using cached dependencies"
                    }
                }
            }
        }

        stage('Build with Docker Layer Caching') {
            steps {
                sh '''
                    # Pull previous image for layer caching
                    docker pull myregistry/myapp:cache || true

                    # Build with cache
                    docker build \\
                        --cache-from myregistry/myapp:cache \\
                        --tag myregistry/myapp:${BUILD_NUMBER} \\
                        --tag myregistry/myapp:cache \\
                        .

                    # Push cache layer
                    docker push myregistry/myapp:cache
                '''
            }
        }
    }
}
```

This Jenkins patterns knowledge base provides comprehensive examples for implementing modern CI/CD pipelines with
Jenkins, covering everything from basic patterns to advanced optimization techniques.
