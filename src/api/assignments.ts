import api from '@/lib/api';

export interface AssignmentDTO {
  _id: string;
  title: string;
  description?: string;
  courseId: string;
  dueDate?: string | null;
  maxScore?: number;
  published: boolean;
  createdAt: string;
}

export interface SubmissionDTO {
  _id: string;
  assignmentId: string;
  studentId: string;
  answers?: any;
  file?: string | null;
  score?: number | null;
  feedback?: string | null;
  status: 'submitted' | 'graded';
  submittedAt: string;
  gradedAt?: string | null;
}

export interface CreateAssignmentInput {
  title: string;
  description?: string;
  courseId: string;
  dueDate?: string | null;
  maxScore?: number;
  published?: boolean;
}

export interface UpdateAssignmentInput extends Partial<CreateAssignmentInput> {}

export async function listAssignments(params?: { courseId?: string; published?: boolean }): Promise<AssignmentDTO[]> {
  const { data } = await api.get('/assignments', { params });
  return data;
}

export async function getAssignment(id: string): Promise<AssignmentDTO> {
  const { data } = await api.get(`/assignments/${id}`);
  return data;
}

export async function createAssignment(payload: CreateAssignmentInput): Promise<AssignmentDTO> {
  const { data } = await api.post('/assignments', payload);
  return data;
}

export async function updateAssignment(id: string, payload: UpdateAssignmentInput): Promise<AssignmentDTO> {
  const { data } = await api.patch(`/assignments/${id}`, payload);
  return data;
}

export async function deleteAssignment(id: string): Promise<{ message: string }>{
  const { data } = await api.delete(`/assignments/${id}`);
  return data;
}

export async function listSubmissions(assignmentId: string): Promise<SubmissionDTO[]> {
  const { data } = await api.get(`/assignments/${assignmentId}/submissions`);
  return data;
}

export async function gradeSubmission(assignmentId: string, submissionId: string, payload: { score?: number; feedback?: string }): Promise<SubmissionDTO> {
  const { data } = await api.patch(`/assignments/${assignmentId}/submissions/${submissionId}/grade`, payload);
  return data;
}

// Student
export async function getMySubmission(assignmentId: string): Promise<SubmissionDTO> {
  const { data } = await api.get(`/assignments/${assignmentId}/my-submission`);
  return data;
}

export async function submitAssignment(
  assignmentId: string,
  payload: { answers?: any; file?: File | null }
): Promise<SubmissionDTO> {
  const fd = new FormData();
  if (payload.answers !== undefined) fd.append('answers', JSON.stringify(payload.answers));
  if (payload.file) fd.append('file', payload.file);
  const { data } = await api.post(`/assignments/${assignmentId}/submissions`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
