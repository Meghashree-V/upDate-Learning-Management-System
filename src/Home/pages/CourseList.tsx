import { useState, useEffect } from "react";
import { Clock, Users, Star, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

// Define a type for the course data from the backend
interface BackendCourse {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
  };
  price: number;
  level: string;
  duration: string;
  thumbnail?: string;
  categories: string[];
  enrollmentType: string;
  capacity: number;
  startDate: string;
  endDate: string;
  createdAt: string;
}

const CourseList = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<BackendCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<BackendCourse[]>([]);
  const [sortBy, setSortBy] = useState("title");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError("Failed to fetch courses. Please try again later.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    // Filter by search query
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    const category = searchParams.get("category");
    if (category) {
      filtered = filtered.filter(course =>
        course.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
      );
    }

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return 4.5 - 4.5; // Default rating since not in API
        case "students":
          return b.capacity - a.capacity; // Use capacity instead
        case "price":
          return (a.price ?? 0) - (b.price ?? 0);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredCourses(filtered);
  }, [searchParams, sortBy, courses]);

  if (loading) {
    return <div className="text-center py-12">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {searchParams.get("search") ? `Search Results for "${searchParams.get("search")}"` :
            searchParams.get("category") ? `${searchParams.get("category")} Courses` :
              "All Courses"}
        </h1>
        <p className="text-muted-foreground">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Sort by:</span>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title (A-Z)</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="students">Most Popular</SelectItem>
            <SelectItem value="price">Price (Low to High)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
            <Link to="/student/courses">
              <Button variant="outline" className="mt-4">View All Courses</Button>
            </Link>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course._id} className="group hover:shadow-medium transition-all duration-300 border-border">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.thumbnail || '/src/assets/course-programming.jpg'}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-background/90 text-foreground">
                      {course.categories[0] || 'General'}
                    </Badge>
                  </div>
                  {course.level && (
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}
                        className={course.level === 'Beginner' ? 'bg-green-500 hover:bg-green-600' : ''}
                      >
                        {course.level}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {course.description}
                </p>
                <p className="text-sm font-medium text-foreground mb-3">
                  by {course.instructor.name}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">₹{course.price}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                  className="w-1/2 bg-primary text-white"
                  onClick={async () => {
                    try {
                      const userId = localStorage.getItem("userId");
                      if (!userId) {
                        alert("⚠️ Please login first");
                        return;
                      }

                      const res = await axios.post("http://localhost:5000/api/enrollments", {
                        userId,
                        courseId: course._id,
                        price: course.price,
                      });

                      alert("✅ " + res.data.message);
                    } catch (err: any) {
                      alert("❌ " + (err.response?.data?.message || "Enrollment failed"));
                    }
                  }}
                >
                  Enroll
                </Button>


                <Link to={`/student/courses/${course._id}`} className="w-1/2">
                  <Button className="w-full bg-primary text-white">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Course
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;