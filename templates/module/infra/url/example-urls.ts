/** URLs da feature, centralizadas. O http gateway consome daqui. */
export const exampleUrls = {
  list: '/api/v1/examples',
  create: '/api/v1/examples',
  byId: (id: string) => `/api/v1/examples/${id}`,
} as const
