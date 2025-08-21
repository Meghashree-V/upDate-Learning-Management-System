import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Users,
  Clock,
  DollarSign,
  Star,
  Eye,
  Edit,
  Copy,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Mycourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const courses = [
    {
      id: 1,
      title: "React Development Masterclass",
      category: "Web Development",
      status: "published",
      enrollments: 342,
      rating: 4.8,
      revenue: 15680,
      duration: 40,
      lessons: 28,
      lastUpdated: "2024-01-15",
      thumbnail: "/placeholder.svg",
      instructor: "John Smith",
      price: 99.99,
      completionRate: 85,
    },
    {
      id: 2,
      title: "Python for Data Science",
      category: "Data Science",
      status: "published",
      enrollments: 289,
      rating: 4.7,
      revenue: 12450,
      duration: 35,
      lessons: 24,
      lastUpdated: "2024-01-10",
      thumbnail: "/placeholder.svg",
      instructor: "Dr. Sarah Johnson",
      price: 89.99,
      completionRate: 78,
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      status: "draft",
      enrollments: 0,
      rating: 0,
      revenue: 0,
      duration: 25,
      lessons: 18,
      lastUpdated: "2024-01-12",
      thumbnail: "/placeholder.svg",
      instructor: "Emily Chen",
      price: 79.99,
      completionRate: 0,
    },
    {
      id: 4,
      title: "Digital Marketing Strategy",
      category: "Marketing",
      status: "published",
      enrollments: 156,
      rating: 4.6,
      revenue: 8736,
      duration: 30,
      lessons: 22,
      lastUpdated: "2024-01-08",
      thumbnail: "/placeholder.svg",
      instructor: "Michael Rodriguez",
      price: 69.99,
      completionRate: 92,
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      category: "Data Science",
      status: "review",
      enrollments: 0,
      rating: 0,
      revenue: 0,
      duration: 45,
      lessons: 32,
      lastUpdated: "2024-01-14",
      thumbnail: "/placeholder.svg",
      instructor: "Dr. Sarah Johnson",
      price: 119.99,
      completionRate: 0,
    },
  ];

  const categories = ["Web Development", "Data Science", "Design", "Marketing", "Mobile Development"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-success text-success-foreground";
      case "draft": return "bg-muted text-muted-foreground";
      case "review": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published": return "Published";
      case "draft": return "Draft";
      case "review": return "Under Review";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground">
            Manage and track your course content
          </p>
        </div>
        <Button 
          onClick={() => navigate('/addcourses')}
          className="bg-primary hover:bg-primary-hover"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Enrollments</p>
                <p className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.enrollments, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${courses.reduce((sum, course) => sum + course.revenue, 0).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">
                  {(courses.filter(c => c.rating > 0).reduce((sum, course) => sum + course.rating, 0) / 
                    courses.filter(c => c.rating > 0).length || 0).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-primary" />
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
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                <span className="text-muted-foreground">Course Thumbnail</span>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{course.instructor}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(course.status)}>
                  {getStatusText(course.status)}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{course.enrollments} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{course.duration}h content</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${course.price}</span>
                </div>
                {course.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span>{course.rating}</span>
                  </div>
                )}
              </div>

              {course.status === "published" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>{course.completionRate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${course.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                <span>{course.lessons} lessons</span>
                <span>Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Mycourses;