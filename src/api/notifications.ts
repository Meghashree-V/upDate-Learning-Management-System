import api from '@/lib/api';

export type NotificationTarget = 'all' | 'students' | 'admins' | 'specific';

export interface NotificationDTO {
  _id: string;
  title: string;
  message: string;
  target: NotificationTarget;
  userIds?: string[]; // when target === 'users'
  courseId?: string;
  createdAt: string;
}

export interface CreateNotificationInput {
  title: string;
  message: string;
  target: NotificationTarget;
  userIds?: string[];
  courseId?: string;
}

export interface NotificationReadDTO {
  _id: string;
  notificationId: string;
  userId: string;
  readAt: string;
}

// Admin
export async function createNotification(payload: CreateNotificationInput): Promise<NotificationDTO> {
  const { data } = await api.post('/notifications', payload);
  return data;
}

export async function listNotifications(): Promise<NotificationDTO[]> {
  const { data } = await api.get('/notifications');
  return data;
}

export async function deleteNotification(id: string): Promise<{ message: string }>{
  const { data } = await api.delete(`/notifications/${id}`);
  return data;
}

// User
export async function listMyNotifications(): Promise<NotificationDTO[]> {
  const { data } = await api.get('/notifications/my');
  return data;
}

export async function markNotificationRead(id: string): Promise<NotificationReadDTO> {
  const { data } = await api.post(`/notifications/${id}/read`);
  return data;
}
