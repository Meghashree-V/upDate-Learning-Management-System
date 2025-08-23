import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Display Name</p>
              <Input placeholder="—" disabled />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <Input placeholder="—" disabled />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button disabled className="opacity-60 cursor-not-allowed">Save Changes (coming soon)</Button>
            <Button variant="outline" disabled className="opacity-60 cursor-not-allowed">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
