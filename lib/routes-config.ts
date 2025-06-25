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
      title: "Data Structures & Algorithms",
      href: "/dsa",
      noLink: true,
      items: [
        {
          title: "Data Structures",
          href: "/structures",
          noLink: true,
          items: [
            { title: "Basic", href: "/basic" },
            {
              title: "Linear",
              href: "/linear",
              items: [
                { title: "Array", href: "/array" },
                { title: "Linked List", href: "/linked-list" },
                { title: "Stack", href: "/stack" },
                { title: "Queue", href: "/queue" },
                { title: "Deque", href: "/deque" },
              ],
            },
            {
              title: "Non-Linear",
              href: "/non-linear",
              items: [
                { title: "Hash Table", href: "/hash-table" },
                { title: "Binary Tree", href: "/binary-tree" },
                { title: "BST", href: "/bst" },
                { title: "Directed Graph", href: "/directed-graph" },
                { title: "Undirected Graph", href: "/undirected-graph" },
              ],
            },
            // { title: "Note", href: "/note" },
            // { title: "Code Block", href: "/code-block" },
            // { title: "Image & Link", href: "/image-link" },
            // { title: "Custom", href: "/custom" },
          ],
        },
        {
          title: "Algorithms",
          href: "/algorithms",
          items: [
            {
              title: "basic",
              href: "/basic",
              noLink: true,
              items: [
                { title: "Mathematics", href: "/math" },
                { title: "Sorting", href: "/sorting" },
                { title: "Search", href: "/search" },
                { title: "String processing", href: "/string-processing " },
                { title: "Undirected Graph", href: "/undirected-graph" },
              ],
            },
            {
              title: "Intermediate",
              href: "/intermediate",
              noLink: true,
              items: [
                { title: "Hash Table", href: "/hash-table" },
                { title: "Binary Tree", href: "/binary-tree" },
                { title: "BST", href: "/bst" },
                { title: "Directed Graph", href: "/directed-graph" },
                { title: "Undirected Graph", href: "/undirected-graph" },
              ],
            },
            {
              title: "Advanced",
              href: "/advanced",
              noLink: true,
              items: [
                { title: "Hash Table", href: "/hash-table" },
                { title: "Binary Tree", href: "/binary-tree" },
                { title: "BST", href: "/bst" },
                { title: "Directed Graph", href: "/directed-graph" },
                { title: "Undirected Graph", href: "/undirected-graph" },
              ],
            },
          ],
        },
      ],
    },
  ],
  backend: [
    {
      title: "Tech",
      href: "/tech",
      noLink: true,
      items: [
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
                { title: "Uvicorn & Gunicorn", href: "/server-gateway" },
                { title: "Starlette", href: "/starlette" },
                { title: "pydantic", href: "/pydantic" },
                { 
                  title: "Asynchronous", 
                  href: "/async",
                  items: [
                    { title: "Event Loop", href: "/event-loop" }, 
                    { title: "async & await", href: "/async-await" },
                    { title: "Coroutine", href: "/coroutine" },
                    { title: "ORM", href: "/orm" },
                    // { title: "Starlette", href: "/starlette" },
                    // { title: "pydantic", href: "/pydantic" },
                  ],
                 },
                 { 
                  title: "OOP", 
                  href: "/oop",
                  items: [
                    { title: "class & instance", href: "/class-instance" }, 
                    { title: "async & await", href: "/async-await" },
                    { title: "Coroutine", href: "/coroutine" },
                    { title: "ORM", href: "/orm" },
                    // { title: "Starlette", href: "/starlette" },
                    // { title: "pydantic", href: "/pydantic" },
                  ],
                 },
              ],
            },
            

            { title: "Directed Graph", href: "/directed-graph" },
            { title: "Undirected Graph", href: "/undirected-graph" },
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
                { "title": "FastAPI vs Django vs Flask", "href": "/compare" },
                { "title": "Uvicorn & Gunicorn", "href": "/server-gateway" },
                { "title": "Starlette", "href": "/starlette" },
                { "title": "pydantic", "href": "/pydantic" }
              ]
            },
              
            
          ]
        },
        {
          "title": "Redis",
          "noLink": true,
          "href": "/redis",
          "items": [
            {
              "title": "FastAPI",
              "href": "/fast-api",
              "noLink": true,
              "items": [
                { "title": "Introduction", "href": "/introduction" },
                { "title": "FastAPI vs Django vs Flask", "href": "/compare" },
                { "title": "Uvicorn & Gunicorn", "href": "/server-gateway" },
                { "title": "Starlette", "href": "/starlette" },
                { "title": "pydantic", "href": "/pydantic" }
              ]
            },
          ]
        },
        {
          "title": "Logstash",
          "noLink": false,
          "href": "/logstash",
          "items": [
            { title: "Install", href: "/install" },
            {
              "title": "test",
              "href": "/test",
              "noLink": true,
              "items": [
                { "title": "Introduction", "href": "/introduction" },
                { "title": "FastAPI vs Django vs Flask", "href": "/compare" },
                { "title": "Uvicorn & Gunicorn", "href": "/server-gateway" },
                { "title": "Starlette", "href": "/starlette" },
                { "title": "pydantic", "href": "/pydantic" }
              ]
            },
          ]
        },
      ],
    }

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

            ]
          },
        ]
      },

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
  code: ROUTES.code.map((it) => getRecurrsiveAllLinks(it)).flat(),
};

export function getPageRoutes(type: keyof typeof page_routes | string) {;
  if (!Object.keys(page_routes).includes(type)) {
    return [];
  }
  return page_routes[type as keyof typeof page_routes] ?? [];
}
