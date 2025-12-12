---
title: Mermaid Diagram Examples and Guidelines
description: This knowledge base document provides examples and best practices for creating Mermaid diagrams in project documentation.
type: knowledge-base
category: documentation
version: 1.0.0
tags:
  - knowledge
  - documentation
  - mermaid
  - diagrams
last_updated: 2025-11-19
---

# Mermaid Diagram Examples and Guidelines

This knowledge base document provides examples and best practices for creating Mermaid diagrams in project documentation.

## Mermaid Diagram Types and Examples

### 1. System Architecture (Flowchart)

```mermaid
flowchart TD
    A[User Request] --> B[API Gateway]
    B --> C{Authentication}
    C -->|Valid| D[Application Layer]
    C -->|Invalid| E[Error Response]
    D --> F[Business Logic]
    F --> G[Database]
    G --> H[Response]
    H --> A
```

### 2. Component Relationships (Graph)

```mermaid
graph LR
    UI[User Interface] --> API[API Layer]
    API --> AUTH[Auth Service]
    API --> BL[Business Logic]
    BL --> DB[(Database)]
    BL --> CACHE[(Cache)]
    AUTH --> LDAP[LDAP Server]
```

### 3. API Flow (Sequence Diagram)

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth
    participant DB

    Client->>API: POST /api/login
    API->>Auth: validate credentials
    Auth->>DB: check user
    DB-->>Auth: user data
    Auth-->>API: token
    API-->>Client: 200 OK + token
```

### 4. Entity Relationships

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER_ITEM }o--|| PRODUCT : references

    USER {
        int id PK
        string email
        string name
    }
    ORDER {
        int id PK
        int user_id FK
        date created_at
    }
```

### 5. Cloud Architecture (Architecture Diagram - Recommended for Cloud)

```mermaid
architecture-beta
    group api(cloud)[Public API]
        service web(server)[Web Server]
        service lb(disk)[Load Balancer]
    group private(cloud)[Private Services] in api
        service app(server)[Application Server]
        service db(database)[Database]
        service cache(disk)[Cache Layer]
    group external(cloud)[External Services]
        service cdn(cloud)[CDN]

    web:R --> L:app
    lb:T --> B:web
    app:R --> L:db
    app:B --> T:cache
    cdn:L --> R:web
```

**Architecture Diagram Features:**

- Groups for organizing related services
- Built-in icons: `cloud`, `database`, `disk`, `internet`, `server`
- Support for custom Iconify icons (200,000+ available)
- Clean, modern cloud architecture visualization
- Services can be nested within groups using `in` keyword
- Edges with directional connectors (T|B|L|R for Top/Bottom/Left/Right)

### 5b. Deployment Architecture (Flowchart Alternative)

For more complex deployments or when more customization is needed, use flowchart:

```mermaid
flowchart TB
    subgraph "AWS Cloud"
        subgraph "VPC"
            ALB[Application Load Balancer]
            subgraph "Public Subnet"
                ALB
            end
            subgraph "Private Subnet"
                ECS[ECS Fargate Tasks]
                RDS[(RDS Database)]
            end
        end
        S3[(S3 Bucket)]
        CF[CloudFront CDN]
    end

    Users --> CF
    CF --> ALB
    ALB --> ECS
    ECS --> RDS
    ECS --> S3
```

### 6. State Diagram

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Processing : start
    Processing --> Completed : success
    Processing --> Failed : error
    Failed --> Pending : retry
    Completed --> [*]
```

### 7. Class Diagram

```mermaid
classDiagram
    class User {
        +String id
        +String email
        +String name
        +login()
        +logout()
    }

    class Order {
        +String id
        +String userId
        +Date createdAt
        +addItem()
        +removeItem()
    }

    User ||--o{ Order : has
```

### 8. Gantt Chart

```mermaid
gantt
    title Development Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1
    Planning       :a1, 2024-01-01, 30d
    Design         :a2, after a1, 20d
    section Phase 2
    Development    :b1, 2024-02-20, 60d
    Testing        :b2, after b1, 30d
    section Phase 3
    Deployment     :c1, after b2, 10d
```

### 9. Git Flow Diagram

```mermaid
gitgraph
    commit
    branch develop
    checkout develop
    commit
    branch feature
    checkout feature
    commit
    commit
    checkout develop
    merge feature
    checkout main
    merge develop
    commit
```

### 10. C4 Context Diagram

```mermaid
flowchart TB
    subgraph boundary [System Boundary]
        webapp[Web Application<br/>React SPA]
        api[API Gateway<br/>Node.js Express]
        db[(Database<br/>PostgreSQL)]
    end

    user[User<br/>End User] --> webapp
    webapp --> api
    api --> db
    api --> email[Email Service<br/>SendGrid]
```

## Architecture Diagram Guide (Mermaid v11.1.0+)

The **Architecture diagram** is the recommended diagram type for cloud and infrastructure architecture. It provides a clean, modern way to visualize cloud deployments, microservices, and system components.

### Core Concepts

1. **Groups** - Container for organizing related services

   ```
   group {id}({icon})[{title}]
   group {id}({icon})[{title}] in {parent_id}  // nested group
   ```

2. **Services** - Individual components/resources

   ```
   service {id}({icon})[{title}]
   service {id}({icon})[{title}] in {group_id}  // service in group
   ```

3. **Edges** - Connections between services with directional arrows

   ```
   service1:R --> L:service2  // right of service1 to left of service2
   service1:T -- B:service2   // top to bottom
   ```

4. **Junctions** - Special nodes for multi-directional connections
   ```
   junction j1
   junction j2 in {group_id}
   ```

### Available Icons

**Built-in icons:**

- `cloud` - Cloud services
- `database` - Databases
- `disk` - Storage/disk
- `internet` - Internet/external
- `server` - Servers/compute

**Custom icons:**
Use any Iconify icon with format: `{provider}:{icon-name}`

Example: `mdi:aws`, `fa:docker`, `fluent:azure`

### Complete Architecture Example

```mermaid
architecture-beta
    group public(cloud)[Public Cloud]
        group cdn_group(cloud)[CDN & Edge]
            service cdn(cloud)[CloudFront]
            service waf(disk)[WAF]
        group api_gw(cloud)[API Gateway]
            service apigw(server)[API Gateway]

    group private(cloud)[VPC - Private Network] in public
        group compute(cloud)[Compute Layer]
            service web1(server)[Web Server 1]
            service web2(server)[Web Server 2]
            service lb(disk)[Load Balancer]

        group data(cloud)[Data Layer] in private
            service rds(database)[RDS Primary]
            service cache(disk)[Redis Cache]
            service s3(disk)[S3 Storage]

    group external(cloud)[External Services]
        service auth(internet)[Auth Service]
        service email(internet)[Email Service]

    cdn:R --> L:apigw
    waf:B --> T:apigw
    apigw:R --> L:lb
    lb:B --> T:web1
    lb:B --> T:web2
    web1:R --> L:rds
    web2:R --> L:cache
    web1:B --> T:s3
    web2:B --> T:auth
    web1:B --> T:email
```

### Edge Direction Reference

| Direction | Meaning |
| --------- | ------- |
| `:T`      | Top     |
| `:B`      | Bottom  |
| `:L`      | Left    |
| `:R`      | Right   |

### Edge Arrow Types

| Syntax | Meaning              |
| ------ | -------------------- |
| `-->`  | Arrow pointing right |
| `<--`  | Arrow pointing left  |
| `--`   | No arrow             |
| `<-->` | Bidirectional arrows |

### Nested Groups Example

```mermaid
architecture-beta
    group aws(cloud)[AWS Cloud]
        group vpc(cloud)[VPC] in aws
            group public_subnet(cloud)[Public Subnet] in vpc
                service nat(server)[NAT Gateway]
            group private_subnet(cloud)[Private Subnet] in vpc
                service app(server)[Application]
                service db(database)[Database]
        service s3(disk)[S3] in aws

    nat:R --> L:app
    app:R --> L:db
    app:B --> T:s3
```

## Best Practices

### When to Use Architecture Diagrams

- Cloud infrastructure visualization
- Microservices architecture
- Network topology
- System component relationships
- Modern cloud deployments

### When to Use Flowcharts Instead

- Complex business logic workflows
- Conditional branching and decision trees
- Detailed process flows with many variations
- Legacy system documentation

### 1. Code Block Format

- Always use triple backticks with `mermaid` language identifier
- Example: ````mermaid`

### 2. Clear Labels

- Use descriptive node names instead of generic labels
- Good: `[User Authentication Service]`
- Bad: `[Service 1]`

### 3. Logical Flow

- Follow natural reading patterns (top-to-bottom, left-to-right)
- Use consistent direction throughout the diagram

### 4. Subgraphs

- Group related components using subgraphs
- Use meaningful subgraph titles
- Example: `subgraph "AWS Cloud"`

### 5. Styling

- Use consistent node shapes for similar components
- Databases: `[(Database)]`
- Services: `[Service Name]`
- Decisions: `{Decision Point}`

### 6. Documentation

- Include diagram explanations after each diagram
- Explain the purpose and key relationships shown

### 7. Accessibility

- Use descriptive text for all nodes and connections
- Avoid color-only differentiation

## Common Node Shapes

- `[]` Rectangle (default) - Services, components
- `()` Rounded rectangle - Processes
- `{}` Diamond - Decision points
- `(())` Circle - Start/end points
- `[()]` Stadium/pill shape - User interactions
- `[[]]` Subroutine - Sub-processes
- `[(Database)]` Database cylinder - Data stores
- `>Rectangle]` Asymmetric shape - External systems

## Connection Types

- `-->` Solid arrow - Standard flow
- `-.->` Dotted arrow - Conditional/optional flow
- `==>` Thick arrow - Important flow
- `--` Line without arrow - Association
- `-.` Dotted line - Weak association

## Color and Styling

```mermaid
flowchart TD
    A[Normal] --> B[Success]
    A --> C[Warning]
    A --> D[Error]

    classDef success fill:#d4edda,stroke:#28a745,color:#000
    classDef warning fill:#fff3cd,stroke:#ffc107,color:#000
    classDef error fill:#f8d7da,stroke:#dc3545,color:#000

    class B success
    class C warning
    class D error
```

## Usage Guidelines

### When to Use Each Diagram Type

1. **Architecture** (NEW - v11.1.0+) - Cloud infrastructure, microservices, system components
2. **Flowchart** - System workflows, business processes, complex logic
3. **Graph** - Component relationships, network topology, general connections
4. **Sequence** - API interactions, message flows, timing diagrams
5. **ER Diagram** - Database schema, data relationships
6. **State Diagram** - Object lifecycles, status workflows
7. **Class Diagram** - Object-oriented design, code structure
8. **Gantt Chart** - Project timelines, development phases
9. **Git Graph** - Branch strategies, release workflows

### Integration with Documentation

This knowledge base is referenced by documentation commands:

- `/document` - Comprehensive project documentation
- `/api-docs` - API documentation with sequence diagrams
- `/arch-docs` - Architecture documentation with system diagrams
- `/deploy-docs` - Deployment documentation with infrastructure diagrams

All documentation commands will automatically reference these Mermaid formats when creating visual documentation.
