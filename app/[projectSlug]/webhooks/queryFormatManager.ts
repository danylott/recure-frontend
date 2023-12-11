export const formatQuery = (order: string, field: string) => `${order === 'ascend'
  ? ''
  : '-'}${field}`;
