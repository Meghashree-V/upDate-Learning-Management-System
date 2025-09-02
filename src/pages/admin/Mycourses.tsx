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
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Mycourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 for AlertDialog
  const [deleteCourseId, setDeleteCourseId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchAndCombineCourses = async () => {
      setLoading(true);
      // Dummy courses
      const dummyCourses = [
        {
          _id: "d1",
          title: "Modern React Bootcamp",
          instructor: { name: "Sarah Lee" },
          price: 1499,
          category: "Web Development",
          status: "published",
          thumbnail: "/src/assets/course-programming.jpg",
          enrollments: 120,
          duration: "12h 30m",
          rating: 4.8,
        },
        {
          _id: "d2",
          title: "Data Science Masterclass",
          instructor: { name: "Dr. Amit Kumar" },
          price: 1799,
          category: "Data Science",
          status: "published",
          thumbnail: "/src/assets/course-data-science.jpg",
          enrollments: 85,
          duration: "9h 15m",
          rating: 4.7,
        },
        {
          _id: "d3",
          title: "UI/UX Design Essentials",
          instructor: { name: "Jessica Park" },
          price: 1299,
          category: "Design",
          status: "draft",
          thumbnail: "/src/assets/course-design.jpg",
          enrollments: 40,
          duration: "7h 45m",
          rating: 4.5,
        },
        {
          _id: "d4",
          title: "Digital Marketing 2024",
          instructor: { name: "Ravi Singh" },
          price: 999,
          category: "Marketing",
          status: "published",
          thumbnail: "/src/assets/course-marketing.jpg",
          enrollments: 200,
          duration: "6h 10m",
          rating: 4.6,
        },
        {
          _id: "d5",
          title: "The Complete Python Pro Bootcamp",
          instructor: { name: "Angela Yu" },
          price: 1999,
          category: "Web Development",
          status: "published",
          thumbnail: "/src/assets/course-programming.jpg",
          enrollments: 350,
          duration: "24h",
          rating: 4.9,
        },
        {
          _id: "d6",
          title: "Flutter & Dart - The Complete Guide",
          instructor: { name: "Maximilian Schwarzmüller" },
          price: 2499,
          category: "Mobile Development",
          status: "review",
          thumbnail: "/src/assets/course-programming.jpg",
          enrollments: 150,
          duration: "40h",
          rating: 4.8,
        },
        {
          _id: "d7",
          title: "AWS Certified Cloud Practitioner",
          instructor: { name: "Stephane Maarek" },
          price: 899,
          category: "Data Science",
          status: "published",
          thumbnail: "/src/assets/course-data-science.jpg",
          enrollments: 500,
          duration: "14h",
          rating: 4.7,
        },
      ];
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        // Mark real courses with a property to distinguish
        const realCourses = (res.data || []).map((c: any) => ({ ...c, _isReal: true }));
        setCourses([...realCourses, ...dummyCourses]);
      } catch (err) {
        setCourses([...dummyCourses]);
      } finally {
        setLoading(false);
      }
    };
    fetchAndCombineCourses();
  }, []);

  const categories = ["Web Development", "Data Science", "Design", "Marketing", "Mobile Development"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      (course.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      ((typeof course.instructor === "string" ? course.instructor : (course.instructor?.name || ""))
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
      default: return status;
    }
  };

  // 🧹 delete confirmed (called from AlertDialog "Delete")
  const handleConfirmDelete = async () => {
    if (!deleteCourseId) return;
    setDeleting(true);
    const courseToDelete = courses.find(c => c._id === deleteCourseId);
    if (courseToDelete && courseToDelete._isReal) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${deleteCourseId}`);
      } catch (err) {
        alert("Failed to delete real course from backend.");
      }
    }
    setCourses(prev => prev.filter(c => c._id !== deleteCourseId));
    setDeleteCourseId(null);
    setDeleting(false);
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
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
                {course.thumbnail ? (
                  <img
                    src={`http://localhost:5000${course.thumbnail.startsWith("/") ? course.thumbnail : "/" + course.thumbnail}`}
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
                    <p className="text-sm text-muted-foreground">{
  typeof course.instructor === "object"
    ? course.instructor?.name || "Unknown"
    : course.instructor || "Unknown"
}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => navigate(`/courses/${course._id}`)}
                        disabled={!course._id}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => navigate(`/admin/editcourse/${course._id}`)}
                        disabled={!course._id}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => {
                        // Defensive: don't duplicate if missing required fields
                        if (!course.title) return alert("Cannot duplicate: missing course title");
                        const { _id, ...rest } = course;
                        const duplicated = { ...rest, title: `Copy of ${course.title}` };
                        try {
                          await axios.post("http://localhost:5000/api/courses", duplicated);
                          window.location.reload();
                        } catch (err) {
                          alert("Failed to duplicate course");
                        }
                      }}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        disabled={!course._id}
                        onClick={() => course._id && setDeleteCourseId(course._id)}
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
                  <span className="text-lg font-bold">₹{course.price || 0}</span>
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
