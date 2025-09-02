import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Star,
  BookOpen,
  Users,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Educator = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");


  const [educators, setEducators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    status: "active",
    avatar: "",
    bio: ""
  });

  useEffect(() => {
    fetchEducators();
  }, []);

  const fetchEducators = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/educators");
      setEducators(res.data);
    } catch (err) {
      toast({ title: "Error", description: "Failed to load educators." });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEducator = async () => {
    try {
      await axios.post("http://localhost:5000/api/educators", addForm);
      toast({ title: "Educator Added Successfully!", description: "New educator has been added to the platform." });
      setAddForm({ name: "", email: "", phone: "", specialization: "", status: "active", avatar: "", bio: "" });
      fetchEducators();
    } catch (err) {
      toast({ title: "Error", description: "Failed to add educator." });
    }
  };

  const filteredEducators = Array.isArray(educators) ? educators.filter(educator => {
    const name = educator.name || "";
    const specialization = educator.specialization || "";
    const status = educator.status || "";
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || status === filterStatus;
    return matchesSearch && matchesStatus;
  }) : [];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Educators</h1>
          <p className="text-muted-foreground">
            Manage instructors and teaching staff
          </p>
        </div>
        <div>
          <Input
            placeholder="Search by name or specialization"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>
      {/* Add Educator Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Educator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Input
              placeholder="Name"
              value={addForm.name}
              onChange={e => setAddForm({ ...addForm, name: e.target.value })}
              className="w-48"
            />
            <Input
              placeholder="Email"
              value={addForm.email}
              onChange={e => setAddForm({ ...addForm, email: e.target.value })}
              className="w-48"
            />
            <Input
              placeholder="Phone"
              value={addForm.phone}
              onChange={e => setAddForm({ ...addForm, phone: e.target.value })}
              className="w-40"
            />
            <Input
              placeholder="Specialization"
              value={addForm.specialization}
              onChange={e => setAddForm({ ...addForm, specialization: e.target.value })}
              className="w-40"
            />
            <Select value={addForm.status} onValueChange={v => setAddForm({ ...addForm, status: v })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Avatar URL (optional)"
              value={addForm.avatar}
              onChange={e => setAddForm({ ...addForm, avatar: e.target.value })}
              className="w-48"
            />
            <Input
              placeholder="Bio (optional)"
              value={addForm.bio}
              onChange={e => setAddForm({ ...addForm, bio: e.target.value })}
              className="w-64"
            />
            <Button className="self-end" onClick={handleAddEducator} disabled={loading || !addForm.name || !addForm.email}>
              Add Educator
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Educators List */}
      <Card>
        <CardHeader>
          <CardTitle>Educator List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEducators.map(educator => (
                <Card key={educator._id} className="p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={educator.avatar} />
                      <AvatarFallback>{educator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{educator.name}</div>
                      <div className="text-xs text-muted-foreground">{educator.email}</div>
                      <div className="text-xs text-muted-foreground">{educator.specialization}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge>{educator.status}</Badge>
                    <Badge variant="secondary">Courses: {educator.coursesCount || 0}</Badge>
                    <Badge variant="secondary">Students: {educator.studentsCount || 0}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">Joined: {educator.joinDate ? new Date(educator.joinDate).toLocaleDateString() : "-"}</div>
                  <div className="text-xs">{educator.bio}</div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Educator;