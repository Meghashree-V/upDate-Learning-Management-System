import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  Globe,
  Mail,
  Shield,
  CreditCard,
  Bell,
  Users,
  Save,
  Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Manage your LMS platform configuration
          </p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="upDate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-url">Platform URL</Label>
                  <Input id="platform-url" defaultValue="https://update-lms.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-description">Platform Description</Label>
                <Textarea
                  id="platform-description"
                  defaultValue="Industry Oriented Learning Management System"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Platform Logo</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    U
                  </div>
                  <div className="space-y-2">
                    <Label>Upload New Logo</Label>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-enroll new users</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically enroll new users in welcome courses
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow course previews</Label>
                  <p className="text-sm text-muted-foreground">
                    Let users preview course content before enrolling
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable course ratings</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow students to rate and review courses
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input id="smtp-host" placeholder="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" placeholder="587" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Username</Label>
                  <Input id="smtp-username" placeholder="your-email@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Password</Label>
                  <Input id="smtp-password" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-email">From Email Address</Label>
                <Input id="from-email" placeholder="noreply@update-lms.com" />
              </div>

              <Button variant="outline">
                Test Email Configuration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Welcome Email</Label>
                <Button variant="outline" size="sm">Edit Template</Button>
              </div>
              <div className="space-y-2">
                <Label>Course Enrollment</Label>
                <Button variant="outline" size="sm">Edit Template</Button>
              </div>
              <div className="space-y-2">
                <Label>Password Reset</Label>
                <Button variant="outline" size="sm">Edit Template</Button>
              </div>
              <div className="space-y-2">
                <Label>Certificate Award</Label>
                <Button variant="outline" size="sm">Edit Template</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for admin accounts
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Force Password Reset</Label>
                  <p className="text-sm text-muted-foreground">
                    Require users to reset passwords every 90 days
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Login Attempt Limits</Label>
                  <p className="text-sm text-muted-foreground">
                    Lock accounts after 5 failed login attempts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Password Requirements</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="min-length">Minimum Length</Label>
                    <Input id="min-length" type="number" defaultValue="8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="complexity">Complexity</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New User Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify admins when new users register
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Course Completion</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify instructors when students complete courses
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Maintenance</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify users about scheduled maintenance
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Assignment Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Remind students about upcoming deadlines
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Course Announcements</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify users about new course releases
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Open Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to register without admin approval
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require email verification for new accounts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-assign Role</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically assign student role to new users
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="default-role">Default User Role</Label>
                  <Select defaultValue="student">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                  <Input id="session-timeout" type="number" defaultValue="24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Third-party Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-blue-500 flex items-center justify-center text-white font-bold">
                      Z
                    </div>
                    <div>
                      <p className="font-medium">Zoom Integration</p>
                      <p className="text-sm text-muted-foreground">Connect with Zoom for live classes</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-green-500 flex items-center justify-center text-white font-bold">
                      $
                    </div>
                    <div>
                      <p className="font-medium">Stripe Payment</p>
                      <p className="text-sm text-muted-foreground">Process course payments</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-purple-500 flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <p className="font-medium">Slack Integration</p>
                      <p className="text-sm text-muted-foreground">Send notifications to Slack</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-orange-500 flex items-center justify-center text-white font-bold">
                      G
                    </div>
                    <div>
                      <p className="font-medium">Google Analytics</p>
                      <p className="text-sm text-muted-foreground">Track platform usage</p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;