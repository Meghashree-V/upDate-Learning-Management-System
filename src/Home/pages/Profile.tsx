import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/api/users";

const Profile = () => {
  const { data: me, isLoading } = useQuery({ queryKey: ["me"], queryFn: fetchMe });
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">Your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{isLoading ? "…" : `${me?.firstName ?? "-"} ${me?.lastName ?? ""}`}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{isLoading ? "…" : me?.email ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{isLoading ? "…" : me?.role ?? "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium">{isLoading || !me?.createdAt ? "…" : new Date(me.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="pt-2">
              <Button disabled className="opacity-60 cursor-not-allowed">Edit Profile (coming soon)</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Account security settings will appear here when authentication is connected.
            </p>
            <Button variant="outline" disabled className="w-full opacity-60 cursor-not-allowed">
              Change Password (coming soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
