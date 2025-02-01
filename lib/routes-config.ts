// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
};

export const ROUTES: EachRoute[] = [
  {
    title: "Data Structures & Algorithms",
    href: "/dsa",
    noLink: true,
    items: [
      {
        title: "Data Structures",
        href: "/structures",
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
      // {
      //   title: "Installation",
      //   href: "/installation",
      // },
      // { title: "Quick Start Guide", href: "/quick-start-guide" },
      // {
      //   title: "Project Structure",
      //   href: "/project-structure",
      // },
      // {
      //   title: "Components",
      //   href: "/components",
      //   items: [
      //     { title: "Stepper", href: "/stepper" },
      //     { title: "Tabs", href: "/tabs" },
      //     { title: "Note", href: "/note" },
      //     { title: "Code Block", href: "/code-block" },
      //     { title: "Image & Link", href: "/image-link" },
      //     { title: "Custom", href: "/custom" },
      //   ],
      // },
      // { title: "Themes", href: "/themes" },
      // {
      //   title: "Customize",
      //   href: "/customize",
      // },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
