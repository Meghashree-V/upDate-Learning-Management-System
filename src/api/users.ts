import api from '@/lib/api';

export type UserRole = 'student' | 'admin';
export interface UserDTO {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: UserRole;
}

export async function fetchUsers(): Promise<UserDTO[]> {
  const { data } = await api.get('/users');
  return data;
}

export async function fetchUser(id: string): Promise<UserDTO> {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

export async function createUser(payload: CreateUserInput): Promise<UserDTO> {
  const { data } = await api.post('/users', payload);
  return data;
}

export async function updateUser(id: string, payload: UpdateUserInput): Promise<UserDTO> {
  const { data } = await api.patch(`/users/${id}`, payload);
  return data;
}

export async function deleteUser(id: string): Promise<{ message: string }>{
  const { data } = await api.delete(`/users/${id}`);
  return data;
}

// Current authenticated user's profile
export async function fetchMe(): Promise<UserDTO> {
  const { data } = await api.get('/users/me');
  return data;
}
