import { useState, useEffect } from "react";
import { Clock, Users, Star, BookOpen, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const courses = [
  {
    id: 1,
    title: "Complete React Development Bootcamp",
    instructor: "Sarah Johnson",
    rating: 4.8,
    students: 12543,
    duration: "40h 30m",
    price: "$89.99",
    originalPrice: "$199.99",
    image: "/api/placeholder/300/200",
    category: "Web Development",
    level: "Beginner",
    description: "Learn React from scratch with hands-on projects and real-world applications."
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "David Kim",
    rating: 4.9,
    students: 8765,
    duration: "32h 15m",
    price: "$79.99",
    originalPrice: "$149.99",
    image: "/api/placeholder/300/200",
    category: "Design",
    level: "Intermediate",
    description: "Master the principles of user interface and user experience design."
  },
  {
    id: 3,
    title: "Python for Data Science",
    instructor: "Dr. Maria Rodriguez",
    rating: 4.7,
    students: 15432,
    duration: "45h 20m",
    price: "$99.99",
    originalPrice: "$249.99",
    image: "/api/placeholder/300/200",
    category: "Data Science",
    level: "Intermediate",
    description: "Comprehensive Python course for data analysis and machine learning."
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    instructor: "Alex Thompson",
    rating: 4.6,
    students: 9876,
    duration: "28h 45m",
    price: "$69.99",
    originalPrice: "$129.99",
    image: "/api/placeholder/300/200",
    category: "Marketing",
    level: "Beginner",
    description: "Learn effective digital marketing strategies for modern businesses."
  },
  {
    id: 5,
    title: "JavaScript Advanced Concepts",
    instructor: "Emily Chen",
    rating: 4.8,
    students: 11234,
    duration: "38h 10m",
    price: "$94.99",
    originalPrice: "$189.99",
    image: "/api/placeholder/300/200",
    category: "Web Development",
    level: "Advanced",
    description: "Deep dive into advanced JavaScript concepts and ES6+ features."
  },
  {
    id: 6,
    title: "Business Analytics Fundamentals",
    instructor: "Michael Brown",
    rating: 4.5,
    students: 7654,
    duration: "35h 30m",
    price: "$84.99",
    originalPrice: "$169.99",
    image: "/api/placeholder/300/200",
    category: "Business",
    level: "Beginner",
    description: "Learn to analyze business data and make data-driven decisions."
  }
];

const CourseList = () => {
  const [searchParams] = useSearchParams();
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    let filtered = [...courses];
    
    // Filter by search query
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    const category = searchParams.get("category");
    if (category) {
      filtered = filtered.filter(course =>
        course.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "students":
          return b.students - a.students;
        case "price":
          return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredCourses(filtered);
  }, [searchParams, sortBy]);

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
          <Card key={course.id} className="group hover:shadow-medium transition-all duration-300 border-border">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {course.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={course.level === 'Beginner' ? 'default' : course.level === 'Intermediate' ? 'secondary' : 'destructive'}
                    className={course.level === 'Beginner' ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    {course.level}
                  </Badge>
                </div>
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
                by {course.instructor}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-primary">{course.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Link to={`/student/courses/${course.id}`} className="w-full">
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