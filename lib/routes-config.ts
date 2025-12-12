// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: boolean;
  description?: string;
  items?: EachRoute[];
};


// ✅ `/cs/`와 `/backend/`를 구분하여 하나의 객체로 저장
export const ROUTES = {
  cs: [
    {
      title: "CS Fundamentals",
      href: "/fundamentals",
      noLink: true,
      items: [
        { title: "Complexity Analysis", href: "/complexity" },
        { title: "Recursion & Recurrence", href: "/recursion" },
      ],
    },
    {
      title: "Data Structures",
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
      ],
    },
    {
      title: "Algorithms",
      href: "/algorithms",
      noLink: true,
      items: [
        { title: "Sorting", href: "/sorting" },
        { title: "Searching", href: "/searching" },
        { title: "Divide & Conquer", href: "/divide-conquer" },
        { title: "Greedy", href: "/greedy" },
        { title: "Dynamic Programming", href: "/dp" },
        { title: "Backtracking", href: "/backtracking" },
      ],
    },
    {
      title: "Advanced Topics",
      href: "/advanced",
      noLink: true,
      items: [
        { title: "Graph Algorithms", href: "/graph-advanced" },
        { title: "Advanced DP", href: "/dp-advanced" },
        { title: "String Algorithms", href: "/string-advanced" },
        { title: "Advanced Data Structures", href: "/ds-advanced" },
      ],
    },
    {
      title: "Practice & Patterns",
      href: "/practice",
      noLink: true,
      items: [
        { title: "Problem Solving Patterns", href: "/patterns" },
        { title: "LeetCode/BOJ Practice", href: "/practice-sets" },
      ],
    },
    {
      title: "Computer Networks",
      href: "/networks",
      items: [
        { title: "OSI 7 Layers", href: "/osi-7" },
        { title: "TCP/IP", href: "/tcp-ip" },
        { title: "HTTP & HTTPS", href: "/http" },
        { title: "DNS & DHCP", href: "/dns-dhcp" },
        { title: "Load Balancing", href: "/load-balancing" },
        { title: "Network Security", href: "/security" },
      ],
    },
    {
      title: "Operating Systems",
      href: "/os",
      items: [
        { title: "Process & Thread", href: "/process-thread" },
        { title: "CPU Scheduling", href: "/cpu-scheduling" },
        { title: "Memory Management", href: "/memory" },
        { title: "Synchronization", href: "/sync" },
        { title: "File System", href: "/file-system" },
      ],
    },
    {
      title: "Databases",
      href: "/db",
      items: [
        { title: "SQL Basics", href: "/sql" },
        { title: "Transactions & ACID", href: "/transactions" },
        { title: "Index & Optimization", href: "/index" },
        { title: "NoSQL", href: "/nosql" },
        { title: "Distributed DB", href: "/distributed" },
      ],
    },
    {
      title: "Computer Architecture",
      href: "/architecture",
      items: [
        { title: "CPU & Memory", href: "/cpu-memory" },
        { title: "Instruction Cycle", href: "/instruction-cycle" },
        { title: "Pipelining", href: "/pipelining" },
        { title: "Cache", href: "/cache" },
        { title: "Storage & RAID", href: "/storage" },
      ],
    },
  ],

  backend: [
    
        {
          title: "Framework",
          noLink: true,
          href: "/framework",
          items: [
            {
              title: "FastAPI",
              href: "/fast-api",
              items: [ 
                { title: "FastAPI vs Django vs Flask", href: "/compare" },
                { title: "Uvicorn vs Gunicorn", href: "/server-gateway" },
                { title: "Uvicorn + Gunicorn", href: "/workers" },
                {
                  title: "Starlette",
                  href: "/starlette",
                  // noLink: true, // 목차만 보여줄 거면 true, 개요 페이지가 있다면 false
                  items: [
                    {
                      title: "Core Architecture (ASGI)",
                      href: "/architecture",
                      noLink: true,
                      items: [
                        { title: "ASGI Scope & Lifecycle", href: "/asgi-scope" },
                        { title: "App vs Router", href: "/app-router-structure" },
                        { title: "Lifespan Protocol", href: "/lifespan" }
                      ]
                    },
                    {
                      title: "Routing System",
                      href: "/routing",
                      items: [
                        { title: "Route & Endpoint", href: "/route-endpoint" },
                        { title: "Mounting & Sub-applications", href: "/mounting" },
                        { title: "Host & Mount Matching", href: "/host-matching" },
                        { title: "WebSocket Routing", href: "/websocket-routing" }
                      ]
                    },
                    {
                      title: "Middleware Internals",
                      href: "/middleware-deep-dive",
                      items: [
                        { title: "The Onion Architecture", href: "/onion-architecture" },
                        { title: "Pure ASGI Middleware", href: "/pure-asgi-middleware" },
                        { title: "BaseHTTPMiddleware Internals", href: "/base-http-middleware" },
                        { title: "ExceptionMiddleware Flow", href: "/exception-middleware" }
                      ]
                    },
                    {
                      title: "Request & Response",
                      href: "/req-res",
                      items: [
                        { title: "Request Parsing (Receive)", href: "/request-parsing" },
                        { title: "Response & BackgroundTasks", href: "/response-background" },
                        { title: "Streaming & File Responses", href: "/streaming" },
                        { title: "State Management (request.state)", href: "/state-management" }
                      ]
                    },
                    {
                      title: "Authentication",
                      href: "/auth",
                      items: [
                        { title: "AuthenticationBackend", href: "/auth-backend" },
                        { title: "Permissions & Guards", href: "/permissions" }
                      ]
                    }
                  ]
                },
                { title: "pydantic", href: "/pydantic" },
                { title: "Middleware", href: "/middleware" },
                { title: "Dependency Injection", href: "/dependency-injection" },
                { title: "BackgroundTasks", href: "/backgroundtasks" },
                { title: "Event Hooks", href: "/event-hooks" },
                { 
                  title: "Asynchronous", 
                  href: "/async",
                  items: [
                    { title: "Event Loop", href: "/event-loop" }, 
                    { title: "async & await", href: "/async-await" },
                    { title: "Coroutine", href: "/coroutine" },
                    { title: "ORM", href: "/orm" },
                  ],
                 },

              ],
            },
          ],
        },
          {
              title: "OOP",
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
                { title: "super & Cooperative Inheritance", href: "/super" }
              ],
                },
                {
                  title: "Python Object Model",
                  href: "/object-model",
                  noLink: true,
                  items: [
                    { title: "vars / __dict__", href: "/vars" },
                    { title: "getattr / setattr", href: "/getattr-setattr" },
                    { title: "callable & __call__", href: "/callable" },
                    { title: "Descriptor Pattern Basics", href: "/descriptor" },
                    { title: "Lazy Evaluation", href: "/lazy-eval" },
                    { title: "Attribute Lookup Flow", href: "/attribute-lookup" },
                  ],
                },
                {
                  title: "Python Factory",
                  href: "/python-factory",
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
        { 
          title: "Web", 
          href: "/web",
          noLink: true,
          items: [
            { title: "Restful API", href: "/restful" }, 
            { title: "Authentication & Authorization", href: "/auth" },
            { title: "Security", href: "/security" },
            { title: "OpenAPI & Swagger", href: "/openapi-swagger" },
            // { title: "Starlette", href: "/starlette" },
            // { title: "pydantic", href: "/pydantic" },
          ],
         },
         { 
          title: "Database", 
          href: "/database",
          noLink: true,
          items: [
            { title: "SQL Basic", href: "/sql-basic" }, 
            { title: "ORM", href: "/orm" },
            { title: "Security", href: "/security" },
            { title: "OpenAPI & Swagger", href: "/openapi-swagger" },
            // { title: "Starlette", href: "/starlette" },
            // { title: "pydantic", href: "/pydantic" },
          ],
         },
        {
          "title": "Design Pattern",
          "noLink": true,
          "href": "/design-pattern",
          "items": [
            {
              "title": "Creational Pattern",
              "href": "/creational",
              "noLink": true,
              "items": [
                { "title": "Singleton", "href": "/singleton" },
                { "title": "FastAPI vs Django vs Flask", "href": "/compare" },
                { "title": "Uvicorn & Gunicorn", "href": "/server-gateway" },
                { "title": "Starlette", "href": "/starlette" },
                { "title": "pydantic", "href": "/pydantic" }
              ]
            },
            {
              "title": "Behavioral Pattern",
              "href": "/behavioral",
              "noLink": true,
              "items": [
                { "title": "Singleton", "href": "/singleton" },
                { "title": "FastAPI vs Django vs Flask", "href": "/compare" },
                { "title": "Uvicorn & Gunicorn", "href": "/server-gateway" },
                { "title": "Starlette", "href": "/starlette" },
                { "title": "pydantic", "href": "/pydantic" }
              ]
            },
            {
              "title": "Structural Pattern",
              "href": "/structural",
              "noLink": true,
              "items": [
                { "title": "Singleton", "href": "/singleton" },
                { "title": "FastAPI vs Django vs Flask", "href": "/compare" },
                { "title": "Uvicorn & Gunicorn", "href": "/server-gateway" },
                { "title": "Starlette", "href": "/starlette" },
                { "title": "pydantic", "href": "/pydantic" }
              ]
            },
            {
              "title": "Architecture Pattern",
              "href": "/architecture",
              "noLink": true,
              "items": [
                { "title": "MVC", "href": "/mvc" },
                { "title": "MVP", "href": "/mvp" },
                { "title": "MVVM", "href": "/mvvm" },
              ]
            },
          ]
        },
        {
          title: "Distributed Systems",
          href: "/distributed",        // 부모 경로
          noLink: true,                // 상위는 클릭 불가(섹션 헤더처럼 보이게)
          items: [
            {
              title: "Foundations",
              noLink: true,   
              href: "/foundations",    // => /distributed/foundations
              items: [
                { title: "Single vs Multi Node", href: "/single-vs-multi" },
                { title: "Replica, Leader, Election", href: "/replica-leader" },
                { title: "CAP Theorem", href: "/cap" },
                { title: "N–S vs E–W Traffic", href: "/ns-vs-ew" },
              ],
            },
            {
              title: "Kafka",
              href: "/kafka", 
              noLink: true,          // => /distributed/kafka
              items: [
                { title: "Producer acks & Idempotence", href: "/producer-reliability" },
                { title: "Partition & Rebalance", href: "/partition-rebalance" },
                { title: "Error/Retry Playbook", href: "/retry-playbook" },
              ],
            },
            {
              title: "MongoDB Replica Set",
              href: "/mongodb",  
              noLink: true,       // => /distributed/mongodb
              items: [
                { title: "Primary/Stepdown", href: "/primary-stepdown" },
                { title: "WriteConcern & retryWrites", href: "/write-retry" },
                { title: "Connection Pool Tuning", href: "/pool-tuning" },
              ],
            },
            {
              title: "Consistency Patterns",
              href: "/consistency", 
              noLink: true,    // => /distributed/consistency
              items: [
                { title: "Outbox Pattern", href: "/outbox" },
                { title: "Kafka Transactions", href: "/kafka-transactions" },
                { title: "Saga (Brief)", href: "/saga-brief" },
              ],
            },
            {
              title: "Case Study",
              href: "/case-study",
              noLink: true,      // => /distributed/case-study
              items: [
                { title: "Multi-node Connection Issues", href: "/multi-node-conn" },
                { title: "Order Guarantee Pitfalls", href: "/order-guarantee" },
                { title: "Log Ingestion Bottlenecks", href: "/log-bottlenecks" },
              ],
            },
          ],
        },
        {
          "title": "Kafka",
          "noLink": true,
          "href": "/kafka",
          "items": [
            { title: "Install", href: "/install" },
            {
              "title": "test",
              "href": "/test",
              "noLink": true,
              "items": [
                { "title": "Introduction", "href": "/introduction" },
              ]
            },
          ]
        },
        {
          "title": "Celery",
          "noLink": true,
          "href": "/celery",
          "items": [
                    
            { "title": "Basic", "href": "/basic" },
            { "title": "Workers", "href": "/workers" },
            {
              "title": "Tasks",
              "href": "/tasks",
              "noLink": true,
              "items": [
                { "title": "Exceptions & Retry", "href": "/exception-retry" },
              ]
            },
              
            
          ]
        },
        {
          "title": "Redis",
          "noLink": true,
          "href": "/redis",
          "items": [
            { title: "Basic", href: "/basic" },
          ]
        },
        {
          "title": "Logstash",
          "noLink": true,
          "href": "/logstash",
          "items": [
            { title: "Basic", href: "/basic" },
            { title: "Install", href: "/install" },
          
          ]
        },
  ],
  devops: [
      {
        "title": "Kubernetes",
        "href": "/kubernetes",
        "noLink": true,
        "items": [
          {
            "title": "basic",
            "href": "/basic",
            "items": [
              { "title": "Container", "href": "/container" },
              { "title": "Runtime Architecture", "href": "/runtime" },

            ]
          },
          {
            "title": "Components",
            "href": "/components",
            "noLink": true,
            "items": [
             {
            "title": "Control Plane",
            "href": "/control-plane",
            "items": [
                { "title": "API Server", "href": "/api-server" },
                { "title": "etcd", "href": "/etcd" },
                { "title": "Controller Manager", "href": "/controller-manager" },
                { "title": "Sheduler", "href": "/scheduler" },
            ]
          },
          {
            "title": "Worker Node",
            "href": "/worker-node",
            "items": [
                { "title": "Kubelet", "href": "/kubelet" },
                { "title": "kube-proxy", "href": "/kube-proxy" },
                { "title": "Container Runtime", "href": "/container-runtime" },
                { "title": "CNI", "href": "/cni" },
            ]
          },

            ]
          },
          {
            "title": "Workload",
            "href": "/workload",
            "noLink": true,
            "items": [
              { "title": "Pod", "href": "/pod" },
              { "title": "Deployment", "href": "/deployment" },
              { "title": "ReplicaSet", "href": "/replicaset" },
              { "title": "StatefulSet", "href": "/statefulset" },
              { "title": "DaemonSet", "href": "/daemonset" },
              { "title": "Job", "href": "/job" },
              { "title": "CronJob", "href": "/cronjob" },

            ]
          },
          {
            "title": "Networking",
            "href": "/networking",
            "noLink": true,
            "items": [
              { "title": "Service", "href": "/service" },
              { "title": "Ingress", "href": "/ingress" },

            ]
          },
          {
            "title": "Storage",
            "href": "/storage",
            "noLink": true,
            "items": [
              { "title": "Volume", "href": "/volume" },
              { "title": "PersistentVolumeClaim(PVC)", "href": "/pvc" },

            ]
          },
          {
            "title": "Hands-on",
            "href": "/hands-on",
            "noLink": true,
            "items": [

              { "title": "Install", "href": "/install" },
              { "title": "Dashboard", "href": "/dashboard" },
              { "title": "Rancher", "href": "/rancher" },
              {
                "title": "migration",
                "href": "/migration",
                "noLink": true,
                "items": [
    
                  {
                    "title": "v1",
                    "href": "/v1",
                    "noLink": true,
                    "items": [
        
                      { "title": "Architecture Design", "href": "/design" },
                      { "title": "Prepare Environment", "href": "/prepare-environment" },
                      { "title": "Image Management", "href": "/image-management" },
                      { "title": "PVC Setup", "href": "/pvc-setup" },
                      { "title": "MariaDB StatefulSet", "href": "/deploy-mariadb" },
                      { "title": "Redis StatefulSet", "href": "/deploy-redis" },
                      { "title": "Backend Deployment", "href": "/deploy-backend" },
                      { "title": "Inspection Backend Deployment", "href": "/deploy-inspection" },
                      { "title": "Frontend Deployment", "href": "/deploy-frontend" },
                      { "title": "Nginx Deployment", "href": "/deploy-nginx" },
                      { "title": "Ingress Setup", "href": "/ingress-setup" },
                      { "title": "Test & Verify", "href": "/test-and-verify" }
                    ]
                  },
    
                ]
              },

            ]
          },
        ]
      },
        {
    title: "AWS",
    href: "/aws",
    noLink: true,
    items: [
      {
        title: "Networking & Foundations",
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
        title: "Compute Services",
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
        title: "Storage & Database",
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
        title: "Identity & Access Management",
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
        title: "Monitoring & Logging",
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
        title: "DevOps & Automation",
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
        title: "Networking + Security Deep Dive",
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
        title: "High Availability & Architecture Patterns",
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
        title: "Practical Architecture Cases",
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
  },
],
 "ai":[
  {
    "title":"Overview",
    "href":"/overview",
    "noLink":true,
    "items":[
       {"title":"Basic","href":"/basic"},
       {"title":"RoadMap","href":"/roadmap"},
       {"title":"Summary","href":"/summary"},
        ]}, 
       {
      "title":"Setup",
      "href":"/setup",
      "noLink":true,
      "items":[
         {
            "title":"Environment",
            "href":"/environment"
         },
         {
            "title":"Credentials",
            "href":"/credentials"
         },
         {
            "title":"Local vs K8s",
            "href":"/local-vs-k8s"
         }
      ]
   },
   {
      "title":"Datasets",
      "href":"/datasets",
      "noLink":true,
      "items":[
         {
            "title":"MTEB & KorSTS",
            "href":"/mteb-korsts"
         },
         {
            "title":"Own Data (Chunking/Meta)",
            "href":"/own-data"
         }
      ]
   },
   {
      "title":"Embeddings",
      "href":"/embeddings",
      "noLink":true,
      "items":[
         {
            "title":"Models",
            "href":"/models"
         },
         {
            "title":"Fine-tuning",
            "href":"/finetune"
         },
         {
            "title":"TEI Serving",
            "href":"/tei"
         },
         {
            "title":"Evaluation (MTEB)",
            "href":"/mteb"
         }
      ]
   },
   {
      "title":"Vector DB",
      "href":"/vectordb",
      "noLink":true,
      "items":[
         {
            "title":"FAISS",
            "href":"/faiss"
         },
         {
            "title":"Qdrant",
            "href":"/qdrant"
         }
      ]
   },
   {
      "title":"RAG",
      "href":"/rag",
      "noLink":true,
      "items":[
         {
            "title":"Chunking",
            "href":"/chunking"
         },
         {
            "title":"Top-K & Re-rank",
            "href":"/retrieval"
         },
         {
            "title":"Prompting",
            "href":"/prompting"
         }
      ]
   },
   {
      "title":"Inference",
      "href":"/inference",
      "noLink":true,
      "items":[
         {
            "title":"vLLM",
            "href":"/vllm"
         },
         {
            "title":"OpenAI API",
            "href":"/openai-api"
         }
      ]
   },
   {
      "title":"UI",
      "href":"/ui",
      "noLink":true,
      "items":[
         {
            "title":"Gradio",
            "href":"/gradio"
         }
      ]
   },
   {
      "title":"Serving",
      "href":"/serving",
      "noLink":true,
      "items":[
         {
            "title":"TEI on K8s",
            "href":"/tei-k8s"
         },
         {
            "title":"vLLM on K8s",
            "href":"/vllm-k8s"
         },
         {
            "title":"Ingress & Auth",
            "href":"/ingress-auth"
         },
         {
            "title":"HPA & Observability",
            "href":"/hpa-observe"
         }
      ]
   },
   {
      "title":"Glossary",
      "href":"/glossary"
   }
],

  code: [
    {
      "title": "Note",
      "noLink": true,
      "href": "/note",
      "items": [
        {
          "title": "Fundamentals for Python",
          "href": "/fundamentals",
          "noLink": true,
          "items": [
            {
              "title": "Built-in",
              "href": "/built-in",
              "noLink": true,
              "items": [
                { "title": "Mathematical", "href": "/mathematical" },
                { "title": "Type Conversion", "href": "/type-conversion" },
                { "title": "String Manipulation", "href": "/string-manipulation" },
                { "title": "Sequence and Iterable", "href": "/sequence-iterable" },
                { "title": "Input/Output", "href": "/input-output" },
                { "title": "Object and Introspectionc", "href": "/object-introspection" },
                { "title": "Functional Programming Tools", "href": "/functional-programming-tools" },
                { "title": "Data Structures", "href": "/data-structures" },
                { "title": "Miscellaneous", "href": "/miscellaneous" }
              ]
            },
          ]
        },
        {
          "title": "Programmers",
          "href": "/programmers",
          "noLink": true,
          "items": [
            {
              "title": "Greedy",
              "href": "/greedy",
              "noLink": true,
              "items": [
                { "title": "개미군단", "href": "/ants" },
                { "title": "FastAPI vs Django vs Flask", "href": "/compare" },
                { "title": "Uvicorn & Gunicorn", "href": "/server-gateway" },
                { "title": "Starlette", "href": "/starlette" },
                { "title": "pydantic", "href": "/pydantic" }
              ]
            },
            {
              "title": "Mathematics",
              "href": "/mathematics",
              "noLink": true,
              "items": [
                { "title": "[곱셈/나눗셈] 주사위 개수", "href": "/div-dice" },
                { "title": "[LCM] 피자 나눠먹기", "href": "/lcm-pizza" },
                { "title": "소인수분해", "href": "/prime-factorization" },
              ]
            },
            {
              "title": "Search",
              "href": "/search",
              "noLink": true,
              "items": [
                { "title": "[Linear] 숨어있는 숫자 덧셈", "href": "/linear-sum" },
                { "title": "[Linear] 가까운 수 찾기", "href": "/linear-min" },
              ]
            },
            {
              "title": "Frequency",
              "href": "/frequency",
              "noLink": true,
              "items": [
                { "title": "[Counting] 한 번만 등장한 문자", "href": "/frequency-counting" },

              ]
            },
            { "title": "Stack", "href": "/stack" },
          ]
        },
        {
          "title": "baekjoon",
          "href": "/baekjoon",
          "noLink": true,
          "items": [
            {
              "title": "Mathematics",
              "href": "/mathematics",
              "noLink": true,
              "items": [
                { "title": "1018번", "href": "/1018-chess" },
                { "title": "FastAPI vs Django vs Flask", "href": "/compare" },
                { "title": "Uvicorn & Gunicorn", "href": "/server-gateway" },
                { "title": "Starlette", "href": "/starlette" },
                { "title": "pydantic", "href": "/pydantic" }
              ]
            },
          ]
        },
      ]
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

  node.items?.forEach((subNode) => {
    ans.push(...getRecurrsiveAllLinks(subNode, fullHref)); // ✅ 재귀적으로 탐색
  });
  return ans;
}

export const page_routes = {
  cs: ROUTES.cs.map((it) => getRecurrsiveAllLinks(it)).flat(),
  backend: ROUTES.backend.map((it) => getRecurrsiveAllLinks(it)).flat(),
  devops: ROUTES.devops.map((it) => getRecurrsiveAllLinks(it)).flat(),
  ai: ROUTES.ai.map((it) => getRecurrsiveAllLinks(it)).flat(),

  code: ROUTES.code.map((it) => getRecurrsiveAllLinks(it)).flat(),
};

export function getPageRoutes(type: keyof typeof page_routes | string) {;
  if (!Object.keys(page_routes).includes(type)) {
    return [];
  }
  return page_routes[type as keyof typeof page_routes] ?? [];
}
