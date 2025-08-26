import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell } from "lucide-react";
import { createNotification, deleteNotification, listNotifications, type CreateNotificationInput, type NotificationDTO } from "@/api/notifications";

const AdminNotifications = () => {
  const qc = useQueryClient();
  const [form, setForm] = useState<CreateNotificationInput>({ title: "", message: "", target: "all" });
  const [userIdsRaw, setUserIdsRaw] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const { data: notifications = [], isLoading } = useQuery({ queryKey: ["notifications"], queryFn: listNotifications });

  const createMut = useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      setForm({ title: "", message: "", target: "all" });
      setUserIdsRaw("");
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteNotification(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return notifications;
    return notifications.filter(n => `${n.title} ${n.message}`.toLowerCase().includes(q));
  }, [filter, notifications]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateNotificationInput = {
      ...form,
      target: form.target,
      userIds: form.target === "specific" ? userIdsRaw.split(",").map(s => s.trim()).filter(Boolean) : undefined,
      courseId: form.courseId?.trim() ? form.courseId.trim() : undefined,
    };
    createMut.mutate(payload);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Title</p>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Message</p>
                <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Audience</p>
                <Select value={form.target} onValueChange={(v) => setForm({ ...form, target: v as any })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="admins">Admins</SelectItem>
                    <SelectItem value="specific">Specific Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.target === "specific" && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">User IDs (comma separated)</p>
                  <Input placeholder="64af..., 64be..." value={userIdsRaw} onChange={(e) => setUserIdsRaw(e.target.value)} />
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Course ID (optional)</p>
                <Input placeholder="courseId" value={form.courseId || ""} onChange={(e) => setForm({ ...form, courseId: e.target.value || undefined })} />
              </div>
              <div className="pt-2">
                <Button type="submit" disabled={createMut.isPending}>Send</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Sent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Input placeholder="Search title/message" value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>
            <div className="overflow-x-auto rounded border">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Target</th>
                    <th className="text-left p-2">Created</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td className="p-3" colSpan={4}>Loading...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td className="p-3" colSpan={4}>No notifications</td></tr>
                  ) : (
                    filtered.map((n: NotificationDTO) => (
                      <tr key={n._id} className="border-t">
                        <td className="p-2">
                          <div className="font-medium">{n.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{n.message}</div>
                        </td>
                        <td className="p-2 uppercase text-xs">{n.target}</td>
                        <td className="p-2">{new Date(n.createdAt).toLocaleString()}</td>
                        <td className="p-2">
                          <Button variant="destructive" size="sm" onClick={() => { if (confirm('Delete notification?')) deleteMut.mutate(n._id); }}>Delete</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminNotifications;
