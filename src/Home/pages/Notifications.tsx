import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listMyNotifications, markNotificationRead, type NotificationDTO } from "@/api/notifications";

const Notifications = () => {
  const qc = useQueryClient();
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["my-notifications"],
    queryFn: listMyNotifications,
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });
  const markMut = useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-notifications"] }),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center gap-3">
        <Bell className="w-6 h-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-10 text-muted-foreground">Loading…</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No notifications yet.
              <div className="mt-4">
                <Button disabled className="opacity-60 cursor-not-allowed">Mark all as read</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((n: NotificationDTO) => (
                <div key={n._id} className="p-4 border rounded-lg">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-muted-foreground">{n.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                  <div className="mt-2">
                    <Button onClick={() => markMut.mutate(n._id)} disabled={markMut.isPending} className="h-9 px-3">Mark as read</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
