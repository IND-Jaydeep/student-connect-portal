import { api } from './api';

export const executeNLQuery = async (prompt) => {
  try {
    const response = await api.post('/statistics/query', { prompt });
    return response;
  } catch (error) {
    console.error('Failed to execute natural language query:', error);
    throw error;
  }
};
