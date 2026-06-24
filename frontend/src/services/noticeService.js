import { api } from './api';

export async function getNotices() {
  try {
    return await api.get('/notices');
  } catch (error) {
    console.error('Error fetching notices:', error);
    return [];
  }
}

export async function addNotice(notice) {
  try {
    return await api.post('/notices', notice);
  } catch (error) {
    console.error('Error adding notice:', error);
    throw error;
  }
}

export async function analyzeNotice(title, body) {
  try {
    // Calling the actual Gemini API through backend
    const response = await api.post('/chat/analyze-notice', { title, body });
    // Assuming backend returns a string with format "Category: X, Priority: Y, Summary: Z"
    // Or maybe it returns structured data. Let's handle both or fall back to basic parsing.
    if (typeof response === 'string') {
        const categoryMatch = response.match(/Category:\s*([A-Za-z]+)/i);
        const priorityMatch = response.match(/Priority:\s*([A-Za-z]+)/i);
        const summaryMatch = response.match(/Summary:\s*(.*)/i);
        
        return {
            category: categoryMatch ? categoryMatch[1] : 'General',
            priority: priorityMatch ? priorityMatch[1] : 'Low',
            summary: summaryMatch ? summaryMatch[1].trim() : 'AI Summary not available.'
        };
    } else if (response && response.category) {
        return response;
    }
  } catch (error) {
    console.error('AI Analysis failed, falling back to local analysis', error);
  }

  // Fallback local mock analysis if API fails
  const lowerBody = body.toLowerCase();
  const lowerTitle = title.toLowerCase();

  let category = 'General';
  if (lowerBody.includes('exam') || lowerTitle.includes('exam')) category = 'Exam';
  else if (lowerBody.includes('syllabus') || lowerBody.includes('academic')) category = 'Academic';
  else if (lowerBody.includes('internship') || lowerBody.includes('club')) category = 'Co-curricular';

  let priority = 'Low';
  if (lowerBody.includes('urgent') || lowerBody.includes('mandatory')) priority = 'High';
  else if (lowerBody.includes('important') || lowerBody.includes('please')) priority = 'Medium';

  let summary = 'Notice details published by faculty.';
  if (body.trim().length > 0) {
    const sentences = body.split('.');
    summary = sentences[0] + (sentences[1] ? '.' + sentences[1] : '.');
    if (summary.length > 120) summary = summary.substring(0, 117) + '...';
  }

  return { category, priority, summary };
}

