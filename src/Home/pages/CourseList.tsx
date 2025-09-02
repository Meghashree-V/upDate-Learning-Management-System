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
  instructor: { name: string } | string;
  price: number;
  category: string;
  thumbnail: string;
  status: string;
  enrollments: number;
  duration: string;
  rating: number;
  level?: string; // Optional field
}

const CourseList = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<BackendCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<BackendCourse[]>([]);
  const [sortBy, setSortBy] = useState("title");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Dummy courses for a full grid
    const dummyCourses: BackendCourse[] = [
      {
        _id: 'd1',
        title: 'Advanced Python',
        description: 'Advance your Python skills with real-world projects.',
        instructor: { name: 'Instructor' },
        price: 350,
        category: 'Programming',
        thumbnail: '/src/assets/course-programming.jpg',
        status: 'published',
        enrollments: 0,
        duration: '10h 30m',
        rating: 4.7,
        level: 'Beginner',
      },
      {
        _id: 'd2',
        title: 'Data Analytics',
        description: 'This course introduces students to data analytics concepts, tools, and techniques. Students will learn data wrangling, visualization, and analysis.',
        instructor: { name: 'Neha K' },
        price: 98,
        category: 'Data Science',
        thumbnail: '/src/assets/course-data-science.jpg',
        status: 'published',
        enrollments: 0,
        duration: '20h',
        rating: 4.6,
        level: 'Beginner',
      },
      {
        _id: 'd3',
        title: 'UI/UX Design Essentials',
        description: 'Master the basics of UI/UX design, wireframing, and prototyping.',
        instructor: { name: 'Jessica Park' },
        price: 799,
        category: 'Design',
        thumbnail: '/src/assets/course-design.jpg',
        status: 'published',
        enrollments: 0,
        duration: '8h 15m',
        rating: 4.5,
        level: 'Intermediate',
      },
      {
        _id: 'd4',
        title: 'Digital Marketing 2024',
        description: 'Learn digital marketing strategies, SEO, and social media advertising.',
        instructor: { name: 'Ravi Singh' },
        price: 499,
        category: 'Marketing',
        thumbnail: '/src/assets/course-marketing.jpg',
        status: 'published',
        enrollments: 0,
        duration: '12h',
        rating: 4.8,
        level: 'Advanced',
      },
      {
        _id: 'd5',
        title: 'The Complete Python Pro Bootcamp',
        description: 'Become a Python pro with this comprehensive bootcamp.',
        instructor: { name: 'Angela Yu' },
        price: 1999,
        category: 'Programming',
        thumbnail: '/src/assets/course-programming.jpg',
        status: 'published',
        enrollments: 0,
        duration: '24h',
        rating: 4.9,
        level: 'Intermediate',
      },
      {
        _id: 'd6',
        title: 'Flutter & Dart - The Complete Guide',
        description: 'Build beautiful native apps for iOS and Android with Flutter & Dart.',
        instructor: { name: 'Maximilian Schwarzmüller' },
        price: 2499,
        category: 'Mobile Development',
        thumbnail: '/src/assets/course-programming.jpg',
        status: 'published',
        enrollments: 0,
        duration: '40h',
        rating: 4.8,
        level: 'Advanced',
      },
      {
        _id: 'd7',
        title: 'AWS Certified Cloud Practitioner',
        description: 'Prepare for the AWS Cloud Practitioner exam with hands-on labs.',
        instructor: { name: 'Stephane Maarek' },
        price: 899,
        category: 'Data Science',
        thumbnail: '/src/assets/course-data-science.jpg',
        status: 'published',
        enrollments: 0,
        duration: '14h',
        rating: 4.7,
        level: 'Intermediate',
      },
    ];
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses([...(res.data || []), ...dummyCourses]);
        setError(null);
      } catch (err) {
        setCourses([...dummyCourses]);
        setError("Failed to fetch courses. Showing demo courses.");
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
        (typeof course.instructor === 'string' ? course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) : course.instructor?.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
          return b.enrollments - a.enrollments;
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
                  src={`http://localhost:5000${course.thumbnail.startsWith("/") ? course.thumbnail : "/" + course.thumbnail}`}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {course.category}
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
                by {typeof course.instructor === 'string' ? course.instructor : course.instructor?.name || "Instructor"}
              </p>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{(course.enrollments || 0).toLocaleString()}</span>
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
  onClick={() => {
    // Prepare course object for enrollment
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    // Avoid duplicate enrollments
    if (enrolled.some((c: any) => c._id === course._id)) {
      alert('You are already enrolled in this course!');
      return;
    }
    // Add progress tracking fields
    const enrolledCourse = {
      ...course,
      progress: 0,
      totalLessons: 12,
      completedLessons: 0,
      timeSpent: '0h',
      lastAccessed: new Date().toLocaleDateString(),
      status: 'In Progress',
      image: course.thumbnail || '/src/assets/course-programming.jpg',
    };
    localStorage.setItem('enrolledCourses', JSON.stringify([...enrolled, enrolledCourse]));
    alert('Enrolled! This course will now show up in My Learning.');
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