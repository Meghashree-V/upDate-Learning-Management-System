import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell } from "lucide-react";

const Notifications = () => {
  const [audience, setAudience] = useState<string>("all");

  // No backend wired yet; render safe UI and disabled submit
  const sentNotifications: Array<{ id: string; title: string; body: string; audience: string; createdAt: string }> = [];

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
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Title</p>
              <Input placeholder="—" disabled />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Message</p>
              <Textarea placeholder="—" rows={5} disabled />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Audience</p>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="educators">Educators</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2">
              <Button disabled className="opacity-60 cursor-not-allowed">Send (backend pending)</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Sent</CardTitle>
          </CardHeader>
          <CardContent>
            {sentNotifications.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">No notifications sent yet.</div>
            ) : (
              <div className="space-y-3">
                {sentNotifications.map((n) => (
                  <div key={n.id} className="border rounded-lg p-3">
                    <div className="font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.audience} • {n.createdAt}</div>
                    <div className="text-sm mt-1">{n.body}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
