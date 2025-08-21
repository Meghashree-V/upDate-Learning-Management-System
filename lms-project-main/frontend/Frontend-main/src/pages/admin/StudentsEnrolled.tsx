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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Mail,
  UserCheck,
  UserX,
  Calendar,
  Clock,
  Award,
} from "lucide-react";

const StudentsEnrolled = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      course: "React Development Masterclass",
      enrollDate: "2024-01-15",
      progress: 85,
      status: "active",
      lastAccess: "2024-01-20",
      completedLessons: 24,
      totalLessons: 28,
      grade: "A",
      timeSpent: "32h 15m",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@email.com",
      course: "Python for Data Science",
      enrollDate: "2024-01-10",
      progress: 62,
      status: "active",
      lastAccess: "2024-01-19",
      completedLessons: 15,
      totalLessons: 24,
      grade: "B+",
      timeSpent: "28h 45m",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@email.com",
      course: "UI/UX Design Fundamentals",
      enrollDate: "2024-01-08",
      progress: 100,
      status: "completed",
      lastAccess: "2024-01-18",
      completedLessons: 18,
      totalLessons: 18,
      grade: "A+",
      timeSpent: "22h 30m",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@email.com",
      course: "Digital Marketing Strategy",
      enrollDate: "2024-01-12",
      progress: 35,
      status: "inactive",
      lastAccess: "2024-01-16",
      completedLessons: 8,
      totalLessons: 22,
      grade: "C",
      timeSpent: "12h 20m",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Eva Martinez",
      email: "eva.martinez@email.com",
      course: "React Development Masterclass",
      enrollDate: "2024-01-14",
      progress: 92,
      status: "active",
      lastAccess: "2024-01-20",
      completedLessons: 26,
      totalLessons: 28,
      grade: "A",
      timeSpent: "35h 10m",
      avatar: "/placeholder.svg",
    },
  ];

  const courses = ["React Development Masterclass", "Python for Data Science", "UI/UX Design Fundamentals", "Digital Marketing Strategy"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" || student.course === filterCourse;
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "completed": return "bg-primary text-primary-foreground";
      case "inactive": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-success";
    if (grade.startsWith("B")) return "text-primary";
    if (grade.startsWith("C")) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students Enrolled</h1>
          <p className="text-muted-foreground">
            Track student progress and engagement
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'active').length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'completed').length}</p>
              </div>
              <Award className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
                </p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Last Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{student.course}</p>
                      <p className="text-xs text-muted-foreground">
                        {student.completedLessons}/{student.totalLessons} lessons
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{student.progress}%</span>
                        <span className="text-muted-foreground">{student.timeSpent}</span>
                      </div>
                      <Progress value={student.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getGradeColor(student.grade)}`}>
                      {student.grade}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(student.lastAccess).toLocaleDateString()}</p>
                      <p className="text-muted-foreground">
                        {Math.floor((Date.now() - new Date(student.lastAccess).getTime()) / (1000 * 60 * 60 * 24))} days ago
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <UserX className="h-4 w-4 mr-2" />
                          Unenroll
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No students found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentsEnrolled;