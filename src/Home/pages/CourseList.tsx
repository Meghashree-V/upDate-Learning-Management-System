import { useState, useEffect } from "react";
import { Clock, Users, Star, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Course {
  _id: any;
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  thumbnail?: string;
  image?: string
}

const CourseList = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();

        // Ensure proper image URL
        const updated = data.map((course: any) => {
          let imageUrl = course.thumbnail || course.image || "";
          if (imageUrl && !imageUrl.startsWith("http")) {
            imageUrl = `http://localhost:5000${imageUrl.startsWith("/uploads") ? imageUrl : `/uploads/${imageUrl}`}`;
          }
          return { ...course, image: imageUrl };
        });

        setCourses(updated);
        setFilteredCourses(updated);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = [...courses];

    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const category = searchParams.get("category");
    if (category) {
      filtered = filtered.filter(course =>
        course.category.toLowerCase() === category.toLowerCase()
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating": return b.rating - a.rating;
        case "students": return b.students - a.students;
        case "price": return (a.price ?? 0) - (b.price ?? 0);
        default: return a.title.localeCompare(b.title);
      }
    });

    setFilteredCourses(filtered);
  }, [searchParams, sortBy, courses]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Count */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {searchParams.get("search")
            ? `Search Results for "${searchParams.get("search")}"`
            : searchParams.get("category")
            ? `${searchParams.get("category")} Courses`
            : "All Courses"}
        </h1>
        <p className="text-muted-foreground">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Sort */}
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

      {/* Course Cards */}
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
            <Card key={course.id} className="group hover:shadow-medium transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant={course.level === "Beginner" ? "default" : course.level === "Intermediate" ? "secondary" : "destructive"}>
                      {course.level}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                <p className="text-sm font-medium text-foreground mb-3">by {course.instructor}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-primary">₹{course.price}</span>
                  {course.originalPrice && <span className="text-sm line-through">₹{course.originalPrice}</span>}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link to={`/student/courses/${course._id}`} className="w-full">
                  <Button className="w-full bg-gradient-primary:bg-primary-hover text-white">
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
