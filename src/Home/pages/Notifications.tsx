import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Notifications = () => {
  // No notifications wired yet; show safe empty state
  const notifications: Array<{ id: string; title: string; body: string; createdAt: string; read?: boolean }> = [];

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
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No notifications yet.
              <div className="mt-4">
                <Button variant="outline" disabled className="opacity-60 cursor-not-allowed">Mark all as read</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map(n => (
                <div key={n.id} className="p-4 border rounded-lg">
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-muted-foreground">{n.body}</div>
                  <div className="text-xs text-muted-foreground mt-1">{n.createdAt}</div>
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
