import { api } from './api';

export async function getGrievances() {
  try {
    return await api.get('/grievances');
  } catch (error) {
    console.error('Error fetching grievances:', error);
    return [];
  }
}

export async function addGrievance(grievance) {
  try {
    return await api.post('/grievances', grievance);
  } catch (error) {
    console.error('Error adding grievance:', error);
    throw error;
  }
}

export async function resolveGrievance(id) {
  try {
    // Assuming backend has a PUT endpoint to update grievance status
    return await api.put(`/grievances/${id}/resolve`, {});
  } catch (error) {
    console.error('Error resolving grievance:', error);
    throw error;
  }
}

