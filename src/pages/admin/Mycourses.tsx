import { useState, useEffect } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import axios from "axios";

const Mycourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 for AlertDialog
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ["Web Development", "Data Science", "Design", "Marketing", "Mobile Development"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-gray-200 text-gray-800";
      case "review": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-200 text-gray-800";
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

  // 🧹 delete confirmed (called from AlertDialog "Delete")
  const handleConfirmDelete = async () => {
    if (!deleteCourseId) return;
    try {
      setDeleting(true);
      await axios.delete(`http://localhost:5000/api/courses/${deleteCourseId}`);
      setCourses(prev => prev.filter(c => c._id !== deleteCourseId));
      setDeleteCourseId(null);
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete the course. Please try again.");
    } finally {
      setDeleting(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Loading courses...</p>
      </div>
    );
  }

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
          onClick={() => navigate('/admin/addcourses')}
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
                <p className="text-2xl font-bold">
                  {courses.reduce((sum, course) => sum + (course.enrollments || 0), 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${courses.reduce((sum, course) => sum + (course.revenue || 0), 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">
                  {(
                    courses.filter(c => (c.rating || 0) > 0)
                      .reduce((sum, course) => sum + (course.rating || 0), 0) /
                      (courses.filter(c => (c.rating || 0) > 0).length || 1)
                  ).toFixed(1)}
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
      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <Button onClick={() => navigate('/admin/addcourses')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={`http://localhost:5000${course.thumbnail.startsWith("/") ? course.thumbnail : "/" + course.thumbnail}`}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{course.instructor || "Unknown"}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/courses/${course._id}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/admin/editcourse/${course._id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeleteCourseId(course._id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.enrollments || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration || "N/A"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {course.rating || 0}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">${course.price || 0}</span>
                  <Badge className={getStatusColor(course.status)}>
                    {getStatusText(course.status)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog (shadcn/ui) */}
      <AlertDialog open={!!deleteCourseId} onOpenChange={(open) => !open && setDeleteCourseId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} onClick={() => setDeleteCourseId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              disabled={deleting}
              onClick={handleConfirmDelete}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Mycourses;
