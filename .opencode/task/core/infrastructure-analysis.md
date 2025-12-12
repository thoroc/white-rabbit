---
title: Infrastructure Analysis Task
description: Detect infrastructure patterns including databases, messaging
  systems, and architecture
type: task
category: Development
version: 1.0.0
tags:
  - analysis
  - infrastructure
  - database
  - messaging
  - monitoring
  - architecture
mode: task
temperature: 0.3
last_updated: 2025-11-19
estimated_duration: 3-5 minutes
---

This consolidated task provides focused infrastructure and architecture pattern detection, analyzing databases, messaging systems, monitoring, and architectural patterns without overlapping with technology stack detection.

## Core Infrastructure Detection

### Data Storage Analysis

```bash
# Comprehensive database and storage detection
echo "=== Data Storage Infrastructure ==="

# Database Technologies (single optimized search)
echo "## Database Technologies"
db_patterns="postgresql|postgres|mysql|mariadb|sqlite|oracle|mssql|sqlserver|mongodb|redis|elasticsearch|cassandra|dynamodb|couchdb|neo4j|influxdb|clickhouse|snowflake|bigquery"
grep -r -i -E "$db_patterns" requirements*.txt package.json composer.json Gemfile go.mod Cargo.toml pom.xml build.gradle 2>/dev/null | cut -d: -f1 | sort -u | sed 's/^/- Database dependencies in: /'

# Database files and configurations
echo "Database files:"
find . -name "*.sql" -o -name "*migration*" -o -name "*schema*" -o -name "*.db" -o -name "database.yml" -o -name "db.json" 2>/dev/null | head -10 | sed 's/^/- /'

# ORM/ODM Detection
echo "Database ORMs/ODMs:"
orm_patterns="sequelize|typeorm|prisma|mongoose|sqlalchemy|django.db|hibernate|jpa|activerecord|eloquent|doctrine|gorm|diesel|sea-orm"
grep -r -i -E "$orm_patterns" . --include="*.py" --include="*.js" --include="*.ts" --include="*.go" --include="*.rs" --include="*.java" --include="*.php" --include="*.rb" 2>/dev/null | head -5 | cut -d: -f1 | sort -u | sed 's/^/- ORM usage in: /'
```

### Messaging and Communication

```bash
# Message queues, event streaming, and communication patterns
echo "## Messaging and Communication"

# Message Queues and Event Streaming
echo "Message queues and event streaming:"
messaging_patterns="rabbitmq|activemq|kafka|redis|sqs|servicebus|pubsub|nats|zeromq|kinesis|eventbridge|eventhub|pulsar|amqp"
grep -r -i -E "$messaging_patterns" requirements*.txt package.json composer.json go.mod Cargo.toml pom.xml 2>/dev/null | head -5 | sed 's/^/- /'

# API and Communication Technologies
echo "API and communication frameworks:"
api_patterns="graphql|apollo|relay|grpc|protobuf|websocket|socket\.io|sse|webhook"
grep -r -i -E "$api_patterns" requirements*.txt package.json go.mod Cargo.toml pom.xml 2>/dev/null | head -5 | sed 's/^/- /'

# Queue and messaging configuration files
find . -name "*queue*" -o -name "*kafka*" -o -name "*rabbit*" -o -name "*pubsub*" -o -name "*message*" 2>/dev/null | head -5 | sed 's/^/- Config file: /'
```

### Caching and Performance

```bash
# Caching solutions and performance infrastructure
echo "## Caching and Performance"

# Caching Technologies
echo "Caching solutions:"
cache_patterns="redis|memcached|hazelcast|ehcache|caffeine|varnish|cloudflare|fastly"
grep -r -i -E "$cache_patterns" requirements*.txt package.json go.mod Cargo.toml pom.xml 2>/dev/null | head -5 | sed 's/^/- /'

# Object Storage and CDN
echo "Storage and CDN:"
storage_patterns="s3|blob|gcs|minio|swift|cloudfront|cloudflare|fastly|keycdn"
grep -r -i -E "$storage_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -3 | sed 's/^/- /'

# Performance monitoring hints
find . -name "*cache*" -o -name "*cdn*" -o -name "*performance*" 2>/dev/null | head -3 | sed 's/^/- Config: /'
```

## Monitoring and Observability

### Comprehensive Monitoring Detection

```bash
# Complete monitoring, logging, and observability stack
echo "## Monitoring and Observability"

# Application Performance Monitoring
echo "APM and monitoring:"
apm_patterns="newrelic|datadog|splunk|dynatrace|appdynamics|honeycomb|sentry|bugsnag|rollbar"
grep -r -i -E "$apm_patterns" requirements*.txt package.json go.mod Cargo.toml 2>/dev/null | head -5 | sed 's/^/- /'

# Logging Frameworks
echo "Logging frameworks:"
log_patterns="winston|bunyan|logrus|zap|serilog|log4j|slf4j|structlog|python-json-logger"
grep -r -i -E "$log_patterns" requirements*.txt package.json go.mod Cargo.toml pom.xml 2>/dev/null | head -5 | sed 's/^/- /'

# Metrics and Tracing
echo "Metrics and tracing:"
metrics_patterns="prometheus|grafana|jaeger|zipkin|opentelemetry|honeycomb|lightstep|elastic|kibana"
grep -r -i -E "$metrics_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -5 | sed 's/^/- /'

# Health Check and Status Endpoints
echo "Health monitoring:"
find . -name "*health*" -o -name "*status*" -o -name "*metrics*" 2>/dev/null | head -5 | sed 's/^/- /'
grep -r -E "health|ping|status|metrics" . --include="*.py" --include="*.js" --include="*.ts" --include="*.go" --include="*.rs" --include="*.java" 2>/dev/null | head -3 | cut -d: -f1 | sort -u | sed 's/^/- Health endpoints in: /'
```

## Security and Authentication

### Security Infrastructure Analysis

```bash
# Security frameworks, authentication, and access control
echo "## Security and Authentication"

# Authentication and Authorization
echo "Authentication frameworks:"
auth_patterns="passport|jwt|oauth|saml|ldap|auth0|okta|cognito|keycloak|firebase-auth|supabase"
grep -r -i -E "$auth_patterns" requirements*.txt package.json go.mod Cargo.toml 2>/dev/null | head -5 | sed 's/^/- /'

# Security Libraries and Tools
echo "Security libraries:"
security_patterns="bcrypt|argon2|helmet|cors|csrf|rate-limit|express-rate-limit|slowloris"
grep -r -i -E "$security_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -5 | sed 's/^/- /'

# SSL/TLS and Certificates
echo "SSL/TLS configuration:"
find . -name "*.pem" -o -name "*.crt" -o -name "*.key" -o -name "*ssl*" -o -name "*tls*" -o -name "*cert*" 2>/dev/null | head -5 | sed 's/^/- /'

# Security Configuration Files
find . -name "*security*" -o -name "*auth*" -o -name "*acl*" 2>/dev/null | head -5 | sed 's/^/- Security config: /'
```

## Architecture Pattern Detection

### Microservices Architecture Analysis

```bash
# Detect microservices and distributed system patterns
echo "## Architecture Patterns"

# Service Discovery and Orchestration
echo "Service discovery and orchestration:"
service_patterns="consul|eureka|etcd|zookeeper|kubernetes|istio|linkerd|envoy|traefik|nginx|haproxy"
grep -r -i -E "$service_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -5 | sed 's/^/- /'

# API Gateway and Load Balancing
echo "API gateways and load balancers:"
gateway_patterns="kong|ambassador|zuul|ocelot|nginx|apache|haproxy|cloudflare|aws-api-gateway"
grep -r -i -E "$gateway_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -5 | sed 's/^/- /'

# Circuit Breaker and Resilience
echo "Resilience patterns:"
resilience_patterns="hystrix|resilience4j|circuit\.breaker|retry|timeout|bulkhead"
grep -r -i -E "$resilience_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -3 | sed 's/^/- /'

# Microservices Indicators
echo "Microservices indicators:"
dockerfile_count=$(find . -name "Dockerfile*" 2>/dev/null | wc -l)
[ "$dockerfile_count" -gt 1 ] && echo "- Multiple Dockerfiles found ($dockerfile_count services)"

compose_services=$(find . -name "docker-compose.yml" -exec grep -c "services:" {} \; 2>/dev/null | head -1)
[ -n "$compose_services" ] && [ "$compose_services" -gt 2 ] && echo "- Docker Compose with $compose_services services"
```

### Event-Driven Architecture

```bash
# Event-driven and reactive architecture patterns
echo "## Event-Driven Architecture"

# Event Sourcing and CQRS
echo "Event sourcing and CQRS:"
event_patterns="event\.store|eventstore|event\.sourcing|cqrs|command\.query|saga|choreography|orchestration"
grep -r -i -E "$event_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -3 | sed 's/^/- /'

# Event Patterns in Code
echo "Event-driven patterns:"
find . -name "*event*" -o -name "*publisher*" -o -name "*subscriber*" -o -name "*handler*" -o -name "*listener*" 2>/dev/null | head -5 | sed 's/^/- /'

# Reactive Frameworks
reactive_patterns="rxjs|reactor|akka|vertx|reactive|streams"
grep -r -i -E "$reactive_patterns" requirements*.txt package.json go.mod Cargo.toml pom.xml 2>/dev/null | head -3 | sed 's/^/- Reactive: /'
```

## Cloud Services Detection

### Multi-Cloud Infrastructure Analysis

```bash
# Cloud platform and services detection
echo "## Cloud Infrastructure"

# AWS Services
echo "AWS services:"
aws_patterns="boto3|aws-sdk|@aws-sdk|s3|dynamodb|lambda|sqs|sns|rds|ec2|ecs|eks|cloudformation|cloudwatch|cognito|api-gateway"
grep -r -i -E "$aws_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -5 | sed 's/^/- AWS: /'

# Azure Services
echo "Azure services:"
azure_patterns="azure|@azure|cosmosdb|servicebus|keyvault|storage\.account|functions|app-service"
grep -r -i -E "$azure_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -3 | sed 's/^/- Azure: /'

# Google Cloud Services
echo "Google Cloud services:"
gcp_patterns="google-cloud|@google-cloud|bigquery|pubsub|firestore|cloud\.storage|functions|app-engine"
grep -r -i -E "$gcp_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -3 | sed 's/^/- GCP: /'

# Cloud Configuration Files
find . -name "*.aws.yml" -o -name "*cloudformation*" -o -name "*.bicep" -o -name "app.yaml" -o -name "*gcp*" 2>/dev/null | head -3 | sed 's/^/- Cloud config: /'
```

## Network and Load Balancing

### Network Infrastructure Analysis

```bash
# Network configuration and load balancing
echo "## Network Infrastructure"

# Load Balancers and Reverse Proxies
echo "Load balancers and proxies:"
find . -name "nginx.conf" -o -name "apache.conf" -o -name "*proxy*" -o -name "*loadbalancer*" 2>/dev/null | head -5 | sed 's/^/- Config: /'

# Network Security
echo "Network security:"
find . -name "*firewall*" -o -name "*iptables*" -o -name "*security-group*" 2>/dev/null | head -3 | sed 's/^/- Security: /'

# Service Mesh
mesh_patterns="istio|linkerd|consul-connect|envoy|kuma|maesh"
grep -r -i -E "$mesh_patterns" . --include="*.yaml" --include="*.yml" 2>/dev/null | head -3 | cut -d: -f1 | sort -u | sed 's/^/- Service mesh config: /'
```

## Data Pipeline and Analytics

### Data Processing Infrastructure

```bash
# Data processing and analytics infrastructure
echo "## Data Processing and Analytics"

# Big Data and Stream Processing
echo "Big data frameworks:"
bigdata_patterns="spark|hadoop|kafka|storm|flink|beam|airflow|prefect|dagster|luigi"
grep -r -i -E "$bigdata_patterns" requirements*.txt package.json go.mod 2>/dev/null | head -5 | sed 's/^/- /'

# Analytics and ML Infrastructure
echo "Analytics and ML:"
analytics_patterns="pandas|numpy|sklearn|tensorflow|pytorch|jupyter|mlflow|kubeflow|wandb|tensorboard"
grep -r -i -E "$analytics_patterns" requirements*.txt package.json 2>/dev/null | head -5 | sed 's/^/- /'

# Data Pipeline Configuration
find . -name "*pipeline*" -o -name "*etl*" -o -name "*airflow*" -o -name "*dag*" 2>/dev/null | head -5 | sed 's/^/- Pipeline config: /'
```

## Quick Infrastructure Summary

### Rapid Infrastructure Assessment

```bash
# Quick infrastructure overview for fast analysis
echo "=== Quick Infrastructure Summary ==="
echo "Databases: $(grep -r -i -E 'postgresql|mysql|mongodb|redis|dynamodb' requirements*.txt package.json go.mod 2>/dev/null | cut -d: -f2 | tr ',' '\n' | grep -E -i 'postgresql|mysql|mongodb|redis|dynamodb' | sort -u | tr '\n' ' ')"
echo "Messaging: $(grep -r -i -E 'kafka|rabbitmq|sqs|pubsub' requirements*.txt package.json go.mod 2>/dev/null | cut -d: -f2 | tr ',' '\n' | grep -E -i 'kafka|rabbitmq|sqs|pubsub' | sort -u | tr '\n' ' ')"
echo "Monitoring: $(grep -r -i -E 'prometheus|datadog|newrelic|sentry' requirements*.txt package.json go.mod 2>/dev/null | cut -d: -f2 | tr ',' '\n' | grep -E -i 'prometheus|datadog|newrelic|sentry' | sort -u | tr '\n' ' ')"
echo "Cloud: $(grep -r -i -E 'aws|azure|google-cloud' requirements*.txt package.json go.mod 2>/dev/null | cut -d: -f2 | tr ',' '\n' | grep -E -i 'aws|azure|google-cloud' | sort -u | tr '\n' ' ')"
```

## Usage Instructions

This task provides focused infrastructure analysis:

1. **Data Storage Analysis**: Comprehensive database and storage technology detection
2. **Communication Infrastructure**: Messaging, queues, and API communication patterns
3. **Monitoring Stack**: Complete observability and monitoring setup analysis
4. **Architecture Patterns**: Microservices, event-driven, and distributed system patterns
5. **Cloud Infrastructure**: Multi-cloud service and platform detection
6. **Quick Assessment**: Rapid infrastructure summary for fast analysis

## Integration with Commands

Commands should reference this task for infrastructure-specific analysis:

```markdown
## Infrastructure Analysis

Uses `.opencode/task/core/infrastructure-analysis.md` for comprehensive infrastructure detection:

!`[appropriate infrastructure analysis command based on documentation needs]`
```

This focused approach provides deep infrastructure insight without overlapping with technology stack or deployment detection.
