export const routes = [
  {
    path: '/collaborate-writing',
    label: 'Collaborate On Writing',
    description: 'Collaborate with the user to complete the article writing.',
  },
  {
    path: '/assist-product-listing',
    label: 'Assist Product Listing',
    description: 'Assist the user in completing the product listing process.',
  },
  {
    path: '/task-decomposition-agent',
    label: 'Task Decomposition Agent',
    description: 'Analyze the user\'s needs, and provide a comprehensive solution.',
  },
] as const satisfies { path: string, label: string, description: string }[]
