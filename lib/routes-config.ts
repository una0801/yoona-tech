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
            { title: "Note", href: "/note" },
            { title: "Code Block", href: "/code-block" },
            { title: "Image & Link", href: "/image-link" },
            { title: "Custom", href: "/custom" },
          ],
        },
        {
          title: "Algorithms",
          href: "/algorithms",
          items: [
            { title: "Stepper", href: "/stepper" },
            { title: "Tabs", href: "/tabs" },
            { title: "Note", href: "/note" },
            { title: "Code Block", href: "/code-block" },
            { title: "Image & Link", href: "/image-link" },
            { title: "Custom", href: "/custom" },
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
                    { title: "async & await", href: "/async-await" },
                    { title: "FastAPI vs Django vs Flask", href: "/compare" },
                    { title: "Uvicorn & Gunicorn", href: "/server-gateway" },
                    { title: "Starlette", href: "/starlette" },
                    { title: "pydantic", href: "/pydantic" },
                  ],
                 },
              ],
            },
            
            { title: "BST", href: "/bst" },
            { title: "Directed Graph", href: "/directed-graph" },
            { title: "Undirected Graph", href: "/undirected-graph" },
          ],
        },
      ],
    },
    {
      "title": "Kafka",
      "noLink": true,
      "href": "/kafka",
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
    }
  ],
  code: [
    {
      title: "Code",
      href: "/test2",
      noLink: true,
      items: [
        { title: "Stepper", href: "/stepper" },
        { title: "Tabs", href: "/tabs" },
        { title: "Note", href: "/note" },
        { title: "Code Block", href: "/code-block" },
        { title: "Image & Link", href: "/image-link" },
        { title: "Custom", href: "/custom" },
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

  node.items?.forEach((subNode) => {
    ans.push(...getRecurrsiveAllLinks(subNode, fullHref)); // ✅ 재귀적으로 탐색
  });
  return ans;
}

export const page_routes = {
  cs: ROUTES.cs.map((it) => getRecurrsiveAllLinks(it)).flat(),
  backend: ROUTES.backend.map((it) => getRecurrsiveAllLinks(it)).flat(),
  code: ROUTES.code.map((it) => getRecurrsiveAllLinks(it)).flat(),
};

export function getPageRoutes(type: keyof typeof page_routes | string) {;
  if (!Object.keys(page_routes).includes(type)) {
    return [];
  }
  return page_routes[type as keyof typeof page_routes] ?? [];
}
