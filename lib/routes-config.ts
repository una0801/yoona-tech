// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: boolean;
  description?: string;
  // 묶음 노드의 소개 글 경로 (묶음 href 기준 상대)
  intro?: string;
  items?: EachRoute[];
};


// 카테고리 → 섹션 → [소분류(href "")] → 문서. URL은 /카테고리/섹션/문서 3단계 고정
export const ROUTES = {
  cs: [
    {
      title: "CS 기초",
      href: "/fundamentals",
      noLink: true,
      items: [
        { title: "Complexity Analysis", href: "/complexity" },
        { title: "Recursion & Recurrence", href: "/recursion" },
        { title: "Bit Manipulation", href: "/bit-manipulation" },
        { title: "Number Systems & Encoding", href: "/number-systems" },
        { title: "Math for Algorithms", href: "/math" },
        { title: "Abstract Data Types", href: "/adt" },
      ],
    },
    {
      title: "자료구조",
      href: "/structures",
      noLink: true,
      items: [
        { title: "Array", href: "/array" },
        { title: "Linked List", href: "/linked-list" },
        { title: "Stack", href: "/stack" },
        { title: "Queue", href: "/queue" },
        { title: "Deque", href: "/deque" },
        { title: "Hash Table", href: "/hash-table" },
        { title: "B-Tree", href: "/binary-tree" },
        { title: "BST", href: "/bst" },
        { title: "Directed Graph", href: "/directed-graph" },
        { title: "Undirected-Graph", href: "/undirected-graph" },
        { title: "Heap & Priority Queue", href: "/heap" },
        { title: "Balanced Trees (AVL / Red-Black)", href: "/balanced-trees" },
      ],
    },
    {
      title: "알고리즘",
      href: "/algorithms",
      noLink: true,
      items: [
        { title: "Sorting", href: "/sorting" },
        { title: "Searching", href: "/searching" },
        { title: "Divide & Conquer", href: "/divide-conquer" },
        { title: "Greedy", href: "/greedy" },
        { title: "Dynamic Programming", href: "/dp" },
        { title: "Backtracking", href: "/backtracking" },
        { title: "Graph Traversal (BFS / DFS)", href: "/graph-traversal" },
        { title: "Prefix Sum & Difference Array", href: "/prefix-sum" },
      ],
    },
    {
      title: "고급 알고리즘",
      href: "/advanced-algo",
      noLink: true,
      items: [
        {
          title: "그래프",
          href: "",
          noLink: true,
          intro: "/graph-advanced",
          items: [
            { title: "Shortest Path (Dijkstra·Bellman-Ford·Floyd)", href: "/shortest-path" },
            { title: "MST (Kruskal·Prim)", href: "/mst" },
            { title: "Topological Sort", href: "/topological-sort" },
            { title: "SCC & Articulation", href: "/scc" },
            { title: "Network Flow", href: "/network-flow" },
          ],
        },
        {
          title: "문자열",
          href: "",
          noLink: true,
          intro: "/string-advanced",
          items: [
            { title: "KMP", href: "/kmp" },
            { title: "Rabin-Karp & Hashing", href: "/rabin-karp" },
            { title: "Trie", href: "/trie" },
            { title: "Suffix Array & LCP", href: "/suffix-array" },
          ],
        },
        {
          title: "정수론",
          href: "",
          noLink: true,
          intro: "/number-theory",
          items: [
            { title: "Modular Arithmetic & Inverse", href: "/modular" },
            { title: "Primes & Sieve", href: "/primes" },
            { title: "GCD · Euclid · CRT", href: "/euclid-crt" },
          ],
        },
      ],
    },
    {
      title: "고급 DP·자료구조",
      href: "/advanced-ds",
      noLink: true,
      items: [
        {
          title: "DP",
          href: "",
          noLink: true,
          intro: "/dp-advanced",
          items: [
            { title: "Knapsack", href: "/knapsack" },
            { title: "LIS & LCS", href: "/lis-lcs" },
            { title: "Interval & Tree DP", href: "/interval-tree-dp" },
            { title: "Bitmask DP", href: "/bitmask-dp" },
          ],
        },
        {
          title: "자료구조",
          href: "",
          noLink: true,
          intro: "/ds-advanced",
          items: [
            { title: "Segment Tree", href: "/segment-tree" },
            { title: "Fenwick Tree (BIT)", href: "/fenwick" },
            { title: "Union-Find (DSU)", href: "/union-find" },
            { title: "Sparse Table & LCA", href: "/sparse-table" },
          ],
        },
      ],
    },
    {
      title: "네트워크",
      href: "/networks",
      noLink: true,
      items: [
        { title: "OSI 7 Layers", href: "/osi-7" },
        { title: "TCP/IP", href: "/tcp-ip" },
        { title: "HTTP & HTTPS", href: "/http" },
        { title: "DNS & DHCP", href: "/dns-dhcp" },
        { title: "Load Balancing", href: "/load-balancing" },
        { title: "Network Security", href: "/security" },
        { title: "Socket Programming", href: "/socket" },
        { title: "REST · WebSocket · gRPC", href: "/rest-websocket" },
      ],
    },
    {
      title: "운영체제",
      href: "/os",
      noLink: true,
      items: [
        { title: "Process & Thread", href: "/process-thread" },
        { title: "CPU Scheduling", href: "/cpu-scheduling" },
        { title: "Memory Management", href: "/memory" },
        { title: "Synchronization", href: "/sync" },
        { title: "Deadlock", href: "/deadlock" },
        { title: "File System", href: "/file-system" },
        { title: "Virtual Memory & Paging", href: "/virtual-memory" },
        { title: "Interrupt & System Call", href: "/interrupt-syscall" },
        { title: "I/O & Disk Scheduling", href: "/io-scheduling" },
      ],
    },
    {
      title: "데이터베이스",
      href: "/db",
      noLink: true,
      items: [
        { title: "SQL Basics", href: "/sql" },
        { title: "Transactions & ACID", href: "/transactions" },
        { title: "Index & Optimization", href: "/index" },
        { title: "NoSQL", href: "/nosql" },
        { title: "Distributed DB", href: "/distributed" },
        { title: "Normalization", href: "/normalization" },
        { title: "Data Modeling (ER)", href: "/data-modeling" },
        { title: "Connection Pool & N+1", href: "/connection-pool" },
      ],
    },
    {
      title: "컴퓨터 구조",
      href: "/architecture",
      noLink: true,
      items: [
        { title: "CPU & Memory", href: "/cpu-memory" },
        { title: "Instruction Cycle", href: "/instruction-cycle" },
        { title: "Pipelining", href: "/pipelining" },
        { title: "Cache", href: "/cache" },
        { title: "Storage & RAID", href: "/storage" },
        { title: "Parallel & Multicore", href: "/parallel" },
      ],
    },
    {
      title: "시스템 설계: 확장·캐시·메시징",
      href: "/system-design",
      noLink: true,
      items: [
        {
          title: "확장성",
          href: "",
          noLink: true,
          items: [
            { title: "Vertical vs Horizontal", href: "/scale-types" },
            { title: "Stateless & Sessions", href: "/stateless" },
            { title: "CAP & PACELC", href: "/cap" },
          ],
        },
        {
          title: "캐싱",
          href: "",
          noLink: true,
          items: [
            { title: "Cache Strategies", href: "/cache-strategies" },
            { title: "Eviction & TTL", href: "/eviction-ttl" },
            { title: "CDN", href: "/cdn" },
          ],
        },
        {
          title: "메시징",
          href: "",
          noLink: true,
          items: [
            { title: "Message Queue", href: "/message-queue" },
            { title: "Pub/Sub & Event-Driven", href: "/pub-sub" },
            { title: "Kafka vs RabbitMQ", href: "/kafka-vs-rabbitmq" },
          ],
        },
      ],
    },
    {
      title: "시스템 설계: 신뢰성·사례",
      href: "/reliability",
      noLink: true,
      items: [
        {
          title: "신뢰성",
          href: "",
          noLink: true,
          items: [
            { title: "Rate Limiting", href: "/rate-limiting" },
            { title: "Idempotency & Retry", href: "/idempotency" },
            { title: "Circuit Breaker & Backpressure", href: "/circuit-breaker" },
          ],
        },
        {
          title: "분산 트랜잭션",
          href: "",
          noLink: true,
          items: [
            { title: "2PC vs Saga", href: "/2pc-saga" },
            { title: "Consensus (Raft·Paxos)", href: "/consensus" },
          ],
        },
        {
          title: "사례",
          href: "",
          noLink: true,
          items: [
            { title: "URL Shortener", href: "/url-shortener" },
            { title: "News Feed", href: "/news-feed" },
            { title: "Chat System", href: "/chat-system" },
          ],
        },
      ],
    },
  ],
  backend: [
    {
      title: "FastAPI",
      href: "/fastapi",
      noLink: true,
      intro: "/overview",
      items: [
        { title: "FastAPI vs Django vs Flask", href: "/compare" },
        { title: "Uvicorn vs Gunicorn", href: "/server-gateway" },
        { title: "Uvicorn + Gunicorn", href: "/workers" },
        { title: "pydantic", href: "/pydantic" },
        { title: "Middleware", href: "/middleware" },
        { title: "Dependency Injection", href: "/dependency-injection" },
        { title: "BackgroundTasks", href: "/backgroundtasks" },
        { title: "Event Hooks", href: "/event-hooks" },
        {
          title: "비동기",
          href: "",
          noLink: true,
          intro: "/async",
          items: [
            { title: "Event Loop", href: "/event-loop" },
            { title: "async & await", href: "/async-await" },
            { title: "Coroutine", href: "/coroutine" },
            { title: "ORM", href: "/orm" },
          ],
        },
      ],
    },
    {
      title: "Starlette",
      href: "/starlette",
      noLink: true,
      intro: "/overview",
      items: [
        { title: "ASGI & Application", href: "/application" },
        { title: "Routing", href: "/routing" },
        { title: "Requests & Datastructures", href: "/requests" },
        { title: "Responses & Background", href: "/responses" },
        { title: "Middleware Internals", href: "/middleware" },
        { title: "Exceptions", href: "/exceptions" },
        { title: "WebSockets", href: "/websockets" },
        { title: "Authentication", href: "/authentication" },
        { title: "Sync vs Async & Threadpool", href: "/concurrency" },
        { title: "TestClient Internals", href: "/testclient" },
        { title: "StaticFiles · Templates · Config", href: "/extras" },
      ],
    },
    {
      title: "OOP·디자인 패턴",
      href: "/oop",
      noLink: true,
      items: [
        { title: "Class & Instance", href: "/class-instance" },
        { title: "Metaclass", href: "/metaclass" },
        { title: "Attribute & Method", href: "/attr-method" },
        { title: "Method Types (Instance / Class / Static)", href: "/method-types" },
        { title: "Class vs Instance Attribute", href: "/class-instance-attr" },
        { title: "self & object identity", href: "/self" },
        { title: "MRO Basics", href: "/mro-basics" },
        { title: "super & Cooperative Inheritance", href: "/super" },
        {
          title: "생성 패턴",
          href: "",
          noLink: true,
          items: [
            { title: "Singleton", href: "/singleton" },
          ],
        },
        {
          title: "아키텍처 패턴",
          href: "",
          noLink: true,
          intro: "/architecture",
          items: [
            { title: "MVC", href: "/mvc" },
            { title: "MVP", href: "/mvp" },
            { title: "MVVM", href: "/mvvm" },
          ],
        },
      ],
    },
    {
      title: "Python 객체 모델",
      href: "/object-model",
      noLink: true,
      items: [
        { title: "vars / __dict__", href: "/vars" },
        { title: "getattr / setattr", href: "/getattr-setattr" },
        { title: "callable & __call__", href: "/callable" },
        { title: "Descriptor Pattern Basics", href: "/descriptor" },
        { title: "Lazy Evaluation", href: "/lazy-eval" },
        { title: "Attribute Lookup Flow", href: "/attribute-lookup" },
        {
          title: "팩토리",
          href: "",
          noLink: true,
          items: [
            { title: "factory_boy Concept", href: "/factory-boy" },
            { title: "Test Data Factory", href: "/test-factory" },
            { title: "LazyAttribute Deep Dive", href: "/lazyattribute" },
            { title: "AbstractFactory Structure", href: "/abstractfactory" },
            { title: "Factory Attribute Resolution", href: "/value-flow" },
            { title: "Your Factory Code Full Analysis", href: "/your-factory-analysis" },
          ],
        },
      ],
    },
    {
      title: "웹",
      href: "/web",
      noLink: true,
      items: [
        { title: "Restful API", href: "/restful" },
        { title: "Authentication & Authorization", href: "/auth" },
        { title: "Security", href: "/security" },
        { title: "OpenAPI & Swagger", href: "/openapi-swagger" },
      ],
    },
    {
      title: "분산 시스템",
      href: "/distributed",
      noLink: true,
      items: [
        {
          title: "기초",
          href: "",
          noLink: true,
          items: [
            { title: "Single vs Multi Node", href: "/single-vs-multi" },
            { title: "Replica, Leader, Election", href: "/replica-leader" },
            { title: "CAP Theorem", href: "/cap" },
            { title: "N–S vs E–W Traffic", href: "/ns-vs-ew" },
          ],
        },
        {
          title: "일관성",
          href: "",
          noLink: true,
          items: [
            { title: "Outbox Pattern", href: "/outbox" },
            { title: "Kafka Transactions", href: "/kafka-transactions" },
            { title: "Saga (Brief)", href: "/saga-brief" },
          ],
        },
        {
          title: "사례",
          href: "",
          noLink: true,
          items: [
            { title: "Multi-node Connection Issues", href: "/multi-node-conn" },
            { title: "Order Guarantee Pitfalls", href: "/order-guarantee" },
            { title: "Log Ingestion Bottlenecks", href: "/log-bottlenecks" },
          ],
        },
      ],
    },
    {
      title: "데이터 저장소",
      href: "/datastore",
      noLink: true,
      items: [
        { title: "SQL Basic", href: "/sql-basic" },
        { title: "ORM", href: "/orm" },
        {
          title: "Redis",
          href: "",
          noLink: true,
          items: [
            { title: "Basic", href: "/basic" },
          ],
        },
        {
          title: "MongoDB",
          href: "",
          noLink: true,
          items: [
            { title: "Primary/Stepdown", href: "/primary-stepdown" },
            { title: "WriteConcern & retryWrites", href: "/write-retry" },
            { title: "Connection Pool Tuning", href: "/pool-tuning" },
          ],
        },
      ],
    },
    {
      title: "메시징·작업 큐",
      href: "/messaging",
      noLink: true,
      items: [
        {
          title: "Kafka",
          href: "",
          noLink: true,
          items: [
            { title: "Producer acks & Idempotence", href: "/producer-reliability" },
            { title: "Partition & Rebalance", href: "/partition-rebalance" },
            { title: "Error/Retry Playbook", href: "/retry-playbook" },
            { title: "Install", href: "/kafka-install" },
          ],
        },
        {
          title: "Celery",
          href: "",
          noLink: true,
          items: [
            { title: "Basic", href: "/celery-basic" },
            { title: "Workers", href: "/workers" },
            { title: "Exceptions & Retry", href: "/exception-retry" },
          ],
        },
        {
          title: "Logstash",
          href: "",
          noLink: true,
          items: [
            { title: "Basic", href: "/logstash-basic" },
            { title: "Install", href: "/logstash-install" },
          ],
        },
      ],
    },
  ],
  kubernetes: [
    {
      title: "기초·구성요소",
      href: "/basics",
      noLink: true,
      items: [
        {
          title: "기초",
          href: "",
          noLink: true,
          intro: "/basic",
          items: [
            { title: "Container", href: "/container" },
            { title: "Runtime Architecture", href: "/runtime" },
          ],
        },
        {
          title: "Control Plane",
          href: "",
          noLink: true,
          intro: "/control-plane",
          items: [
            { title: "API Server", href: "/api-server" },
            { title: "etcd", href: "/etcd" },
            { title: "Controller Manager", href: "/controller-manager" },
            { title: "Sheduler", href: "/scheduler" },
          ],
        },
        {
          title: "Worker Node",
          href: "",
          noLink: true,
          intro: "/worker-node",
          items: [
            { title: "Kubelet", href: "/kubelet" },
            { title: "kube-proxy", href: "/kube-proxy" },
            { title: "Container Runtime", href: "/container-runtime" },
            { title: "CNI", href: "/cni" },
          ],
        },
      ],
    },
    {
      title: "워크로드·네트워크·스토리지",
      href: "/workload",
      noLink: true,
      items: [
        {
          title: "워크로드",
          href: "",
          noLink: true,
          items: [
            { title: "Pod", href: "/pod" },
            { title: "Deployment", href: "/deployment" },
            { title: "ReplicaSet", href: "/replicaset" },
            { title: "StatefulSet", href: "/statefulset" },
            { title: "DaemonSet", href: "/daemonset" },
            { title: "Job", href: "/job" },
            { title: "CronJob", href: "/cronjob" },
          ],
        },
        {
          title: "네트워크",
          href: "",
          noLink: true,
          items: [
            { title: "Service", href: "/service" },
            { title: "Ingress", href: "/ingress" },
          ],
        },
        {
          title: "스토리지",
          href: "",
          noLink: true,
          items: [
            { title: "Volume", href: "/volume" },
            { title: "PersistentVolumeClaim(PVC)", href: "/pvc" },
          ],
        },
      ],
    },
    {
      title: "실습",
      href: "/hands-on",
      noLink: true,
      items: [
        { title: "Install", href: "/install" },
        { title: "Dashboard", href: "/dashboard" },
        { title: "Rancher", href: "/rancher" },
      ],
    },
    {
      title: "마이그레이션 실습",
      href: "/migration",
      noLink: true,
      items: [
        { title: "Architecture Design", href: "/design" },
        { title: "Prepare Environment", href: "/prepare-environment" },
        { title: "Image Management", href: "/image-management" },
        { title: "PVC Setup", href: "/pvc-setup" },
        { title: "MariaDB StatefulSet", href: "/deploy-mariadb" },
        { title: "Redis StatefulSet", href: "/deploy-redis" },
        { title: "Backend Deployment", href: "/deploy-backend" },
        { title: "Inspection Backend Deployment", href: "/deploy-inspection" },
        { title: "Frontend Deployment", href: "/deploy-frontend" },
        { title: "Nginx Deployment", href: "/deploy-nginx" },
        { title: "Ingress Setup", href: "/ingress-setup" },
        { title: "Test & Verify", href: "/test-and-verify" },
      ],
    },
  ],
  aws: [
    {
      title: "네트워킹 기초",
      href: "/networking",
      noLink: true,
      items: [
        { title: "VPC & Subnet", href: "/vpc" },
        { title: "Route Table & CIDR", href: "/route-table" },
        { title: "Internet / NAT Gateway", href: "/gateway" },
        { title: "Security Group & NACL", href: "/security" },
        { title: "Load Balancers (ALB/NLB/GWLB)", href: "/load-balancer" },
        { title: "PrivateLink & Endpoint", href: "/endpoint" },
        { title: "Transit Gateway", href: "/transit-gateway" },
      ],
    },
    {
      title: "컴퓨팅",
      href: "/compute",
      noLink: true,
      items: [
        { title: "EC2 Basics & Lifecycle", href: "/ec2" },
        { title: "ECS / ECR / Fargate", href: "/ecs" },
        { title: "Lambda & Serverless", href: "/lambda" },
        { title: "Auto Scaling", href: "/autoscaling" },
        { title: "Elastic Beanstalk", href: "/beanstalk" },
      ],
    },
    {
      title: "스토리지·DB",
      href: "/storage",
      noLink: true,
      items: [
        { title: "S3 (Buckets, Lifecycle, Encryption)", href: "/s3" },
        { title: "EBS / EFS / FSx", href: "/ebs-efs" },
        { title: "RDS & Aurora", href: "/rds" },
        { title: "DynamoDB & Global Tables", href: "/dynamodb" },
        { title: "ElastiCache & Redis", href: "/elasticache" },
        { title: "Backup & Disaster Recovery", href: "/backup" },
      ],
    },
    {
      title: "IAM",
      href: "/iam",
      noLink: true,
      items: [
        { title: "IAM Users / Roles / Policies", href: "/iam-basics" },
        { title: "STS & Temporary Credentials", href: "/sts" },
        { title: "Cognito & Identity Federation", href: "/cognito" },
        { title: "AWS Organizations & SCP", href: "/organizations" },
      ],
    },
    {
      title: "모니터링·로깅",
      href: "/monitoring",
      noLink: true,
      items: [
        { title: "CloudWatch (Metrics, Logs, Alarms)", href: "/cloudwatch" },
        { title: "CloudTrail & EventBridge", href: "/cloudtrail" },
        { title: "X-Ray & Distributed Tracing", href: "/xray" },
        { title: "AWS Config & Audit Manager", href: "/config" },
        { title: "Centralized Logging Architecture", href: "/logging-arch" },
      ],
    },
    {
      title: "DevOps·자동화",
      href: "/automation",
      noLink: true,
      items: [
        { title: "CloudFormation / CDK", href: "/cloudformation" },
        { title: "Terraform on AWS", href: "/terraform" },
        { title: "CodeBuild / CodeDeploy / CodePipeline", href: "/codepipeline" },
        { title: "Systems Manager (SSM)", href: "/ssm" },
        { title: "ECS Blue/Green & Canary Deployments", href: "/deployment-strategies" },
      ],
    },
    {
      title: "네트워크 보안 심화",
      href: "/security-deepdive",
      noLink: true,
      items: [
        { title: "WAF / Shield / Firewall Manager", href: "/waf-shield" },
        { title: "Encryption (KMS, SSE, CMK)", href: "/kms" },
        { title: "PrivateLink, VPC Peering, TGW Patterns", href: "/vpc-patterns" },
        { title: "Zero Trust Architecture", href: "/zero-trust" },
      ],
    },
    {
      title: "고가용성·아키텍처 패턴",
      href: "/architecture",
      noLink: true,
      items: [
        { title: "Multi-AZ / Multi-Region Design", href: "/ha" },
        { title: "Caching & CDN (CloudFront)", href: "/cdn" },
        { title: "Queue & Stream (SQS / SNS / Kinesis)", href: "/messaging" },
        { title: "Event-driven Architecture", href: "/eda" },
        { title: "Microservices & Service Mesh (App Mesh)", href: "/microservices" },
        { title: "Cost Optimization Patterns", href: "/cost" },
      ],
    },
    {
      title: "실전 아키텍처 사례",
      href: "/cases",
      noLink: true,
      items: [
        { title: "3-Tier Web Architecture", href: "/3tier" },
        { title: "Serverless SaaS Architecture", href: "/serverless" },
        { title: "Container-based Platform (ECS + ALB)", href: "/container-platform" },
        { title: "Data Pipeline (Kinesis + Lambda + S3)", href: "/data-pipeline" },
        { title: "CI/CD on AWS", href: "/cicd" },
      ],
    },
  ],
  ai: [
    {
      title: "기초",
      href: "/basics",
      noLink: true,
      items: [
        { title: "Basic", href: "/basic" },
        { title: "RoadMap", href: "/roadmap" },
        { title: "Summary", href: "/summary" },
        {
          title: "환경 설정",
          href: "",
          noLink: true,
          items: [
            { title: "Environment", href: "/environment" },
            { title: "Credentials", href: "/credentials" },
            { title: "Local vs K8s", href: "/local-vs-k8s" },
          ],
        },
        {
          title: "용어",
          href: "",
          noLink: true,
          items: [
            { title: "Glossary", href: "/glossary" },
          ],
        },
      ],
    },
    {
      title: "데이터·임베딩",
      href: "/data",
      noLink: true,
      items: [
        { title: "MTEB & KorSTS", href: "/mteb-korsts" },
        { title: "Own Data (Chunking/Meta)", href: "/own-data" },
        {
          title: "임베딩",
          href: "",
          noLink: true,
          items: [
            { title: "Models", href: "/models" },
            { title: "Fine-tuning", href: "/finetune" },
            { title: "TEI Serving", href: "/tei" },
            { title: "Evaluation (MTEB)", href: "/mteb" },
          ],
        },
        {
          title: "Vector DB",
          href: "",
          noLink: true,
          items: [
            { title: "FAISS", href: "/faiss" },
            { title: "Qdrant", href: "/qdrant" },
          ],
        },
      ],
    },
    {
      title: "RAG·추론·서빙",
      href: "/rag",
      noLink: true,
      items: [
        { title: "Chunking", href: "/chunking" },
        { title: "Top-K & Re-rank", href: "/retrieval" },
        { title: "Prompting", href: "/prompting" },
        {
          title: "추론",
          href: "",
          noLink: true,
          items: [
            { title: "vLLM", href: "/vllm" },
            { title: "OpenAI API", href: "/openai-api" },
          ],
        },
        {
          title: "서빙",
          href: "",
          noLink: true,
          items: [
            { title: "TEI on K8s", href: "/tei-k8s" },
            { title: "vLLM on K8s", href: "/vllm-k8s" },
            { title: "Ingress & Auth", href: "/ingress-auth" },
            { title: "HPA & Observability", href: "/hpa-observe" },
          ],
        },
        {
          title: "UI",
          href: "",
          noLink: true,
          items: [
            { title: "Gradio", href: "/gradio" },
          ],
        },
      ],
    },
  ],
  code: [
    {
      title: "Python 내장",
      href: "/python",
      noLink: true,
      items: [
        { title: "Mathematical", href: "/mathematical" },
        { title: "Type Conversion", href: "/type-conversion" },
        { title: "String Manipulation", href: "/string-manipulation" },
        { title: "Sequence and Iterable", href: "/sequence-iterable" },
        { title: "Input/Output", href: "/input-output" },
        { title: "Object and Introspectionc", href: "/object-introspection" },
        { title: "Functional Programming Tools", href: "/functional-programming-tools" },
        { title: "Data Structures", href: "/data-structures" },
        { title: "Miscellaneous", href: "/miscellaneous" },
      ],
    },
    {
      title: "코딩테스트 풀이",
      href: "/problems",
      noLink: true,
      items: [
        {
          title: "Programmers",
          href: "",
          noLink: true,
          items: [
            { title: "개미군단", href: "/ants" },
            { title: "[곱셈/나눗셈] 주사위 개수", href: "/div-dice" },
            { title: "[LCM] 피자 나눠먹기", href: "/lcm-pizza" },
            { title: "소인수분해", href: "/prime-factorization" },
            { title: "[Linear] 숨어있는 숫자 덧셈", href: "/linear-sum" },
            { title: "[Linear] 가까운 수 찾기", href: "/linear-min" },
            { title: "[Counting] 한 번만 등장한 문자", href: "/frequency-counting" },
            { title: "Stack", href: "/stack" },
          ],
        },
        {
          title: "Baekjoon",
          href: "",
          noLink: true,
          items: [
            { title: "1018번", href: "/1018-chess" },
          ],
        },
        {
          title: "패턴",
          href: "",
          noLink: true,
          items: [
            { title: "Problem Solving Patterns", href: "/patterns" },
            { title: "LeetCode/BOJ Practice", href: "/practice-sets" },
          ],
        },
      ],
    },
  ],
};

// ✅ 특정 타입의 ROUTES를 가져오는 함수
export function getRoutes(type: keyof typeof ROUTES) {
  return ROUTES[type] ?? [];
}

function getRecurrsiveAllLinks(node: EachRoute, parentHref = ""): { title: string; href: string }[] {
  const ans: { title: string; href: string }[] = [];
  const fullHref = `${parentHref}${node.href}`; // ✅ 부모 href와 결합

  if (!node.noLink) {
    ans.push({ title: node.title, href: fullHref });
  }
  if (node.intro) {
    ans.push({ title: node.title, href: `${fullHref}${node.intro}` });
  }

  node.items?.forEach((subNode) => {
    ans.push(...getRecurrsiveAllLinks(subNode, fullHref));
  });
  return ans;
}

export const page_routes: Record<string, { title: string; href: string }[]> = Object.fromEntries(
  Object.entries(ROUTES).map(([type, routes]) => [
    type,
    (routes as EachRoute[]).map((it) => getRecurrsiveAllLinks(it)).flat(),
  ])
);

export function getPageRoutes(type: string) {
  return page_routes[type] ?? [];
}
