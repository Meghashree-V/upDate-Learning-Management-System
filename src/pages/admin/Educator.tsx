import { useState } from "react";
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

  const educators = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@update.com",
      phone: "+1 (555) 123-4567",
      specialization: "Data Science",
      status: "active",
      coursesCount: 8,
      studentsCount: 342,
      rating: 4.9,
      joinDate: "2023-01-15",
      avatar: "/placeholder.svg",
      bio: "Expert in machine learning and data analytics with 10+ years of experience."
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@update.com",
      phone: "+1 (555) 234-5678",
      specialization: "Web Development",
      status: "active",
      coursesCount: 12,
      studentsCount: 567,
      rating: 4.8,
      joinDate: "2022-08-22",
      avatar: "/placeholder.svg",
      bio: "Full-stack developer with expertise in React, Node.js, and modern web technologies."
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily.chen@update.com",
      phone: "+1 (555) 345-6789",
      specialization: "UI/UX Design",
      status: "inactive",
      coursesCount: 6,
      studentsCount: 234,
      rating: 4.7,
      joinDate: "2023-03-10",
      avatar: "/placeholder.svg",
      bio: "Creative designer focused on user experience and interface design."
    },
    {
      id: 4,
      name: "Michael Rodriguez",
      email: "michael.r@update.com",
      phone: "+1 (555) 456-7890",
      specialization: "Digital Marketing",
      status: "active",
      coursesCount: 10,
      studentsCount: 445,
      rating: 4.6,
      joinDate: "2022-11-05",
      avatar: "/placeholder.svg",
      bio: "Marketing strategist with extensive experience in digital campaigns and analytics."
    },
  ];

  const filteredEducators = educators.filter(educator => {
    const matchesSearch = educator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         educator.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || educator.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddEducator = () => {
    toast({
      title: "Educator Added Successfully!",
      description: "New educator has been added to the platform.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Educators</h1>
          <p className="text-muted-foreground">
            Manage instructors and teaching staff
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover">
              <Plus className="h-4 w-4 mr-2" />
              Add Educator
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Educator</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter educator's name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-dev">Web Development</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="design">UI/UX Design</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Enter educator's bio" />
              </div>
              <Button onClick={handleAddEducator} className="bg-primary hover:bg-primary-hover">
                Add Educator
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search educators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Educators Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEducators.map((educator) => (
          <Card key={educator.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={educator.avatar} />
                    <AvatarFallback>
                      {educator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{educator.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{educator.specialization}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>View Courses</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Deactivate
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant={educator.status === 'active' ? 'default' : 'secondary'}>
                  {educator.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{educator.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{educator.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{educator.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-bold">{educator.coursesCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Users className="h-4 w-4" />
                    <span className="font-bold">{educator.studentsCount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                <Calendar className="h-3 w-3" />
                <span>Joined: {new Date(educator.joinDate).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEducators.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No educators found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Educator;