import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";
import {
  Input
} from "@/components/ui/input";
import {
  Badge
} from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Search, Plus, Users, DollarSign, Star, MoreHorizontal,
  Eye, Edit, Copy, Trash, Clock
} from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  instructor: { name: string } | string;
  level: string;
  enrollmentType: string;
  capacity: number;
  startDate: string;
  endDate: string;
  lessons: any[];
  thumbnail?: string;
  createdAt?: string;
  status?: string;
  enrollments?: number;
  revenue?: number;
  rating?: number;
  category?: string;
}

const Mycourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ✅ fetch real courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ["Web Development", "Data Science", "Design", "Marketing", "Mobile Development"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      (course.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      ((typeof course.instructor === "string"
        ? course.instructor
        : (course.instructor?.name || ""))
        .toLowerCase()
        .includes(searchTerm.toLowerCase()));
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
      default: return status || "Draft";
    }
  };

  // 🗑️ delete course
  const handleConfirmDelete = async () => {
    if (!deleteCourseId) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/courses/${deleteCourseId}`);
      setCourses(prev => prev.filter(c => c._id !== deleteCourseId));
    } catch (err) {
      alert("Failed to delete course.");
    } finally {
      setDeleteCourseId(null);
      setDeleting(false);
    }
  };

  // 📄 duplicate course (with FormData to preserve lessons + thumbnail)
  const handleDuplicate = async (course: Course) => {
    try {
      const formData = new FormData();
      formData.append("title", `Copy of ${course.title}`);
      formData.append("description", course.description);
      formData.append("duration", course.duration);
      formData.append("price", String(course.price));
      formData.append("instructor", typeof course.instructor === "string" ? course.instructor : "");
      formData.append("level", course.level);
      formData.append("enrollmentType", course.enrollmentType);
      formData.append("capacity", String(course.capacity));
      formData.append("startDate", course.startDate);
      formData.append("endDate", course.endDate);
      formData.append("lessons", JSON.stringify(course.lessons || []));
      if (course.thumbnail) {
        formData.append("thumbnail", course.thumbnail);
      }
      await axios.post("http://localhost:5000/api/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      window.location.reload();
    } catch (err) {
      console.error("Duplicate error", err);
      alert("Failed to duplicate course");
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground">Manage and track your course content</p>
        </div>
        <Button onClick={() => navigate('/admin/addcourses')} className="bg-primary hover:bg-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
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
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button onClick={() => navigate('/admin/addcourses')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <img
                    src="/placeholder.svg"
                    alt="No thumbnail"
                    className="w-24 h-24 opacity-60"
                  />
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {typeof course.instructor === "object"
                        ? course.instructor?.name || "Unknown"
                        : course.instructor || "Unknown"}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/courses/${course._id}`)}>
                        <Eye className="h-4 w-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/admin/editcourse/${course._id}`)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(course)}>
                        <Copy className="h-4 w-4 mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeleteCourseId(course._id)}
                      >
                        <Trash className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {course.enrollments || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {course.duration || "N/A"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" /> {course.rating || 0}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">₹{course.price || 0}</span>
                  <Badge className={getStatusColor(course.status || "draft")}>
                    {getStatusText(course.status || "draft")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
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
