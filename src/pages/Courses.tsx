import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import axios from 'axios';

const dummyCourses = [
  {
    id: 'd1',
    title: 'Advanced Python',
    description: 'Advance your Python skills with real-world projects.',
    instructor: 'Instructor',
    price: 350,
    category: 'Web Development',
    thumbnail: '/src/assets/course-programming.jpg',
    status: 'published',
    enrollments: 0,
    duration: '10h 30m',
    rating: 4.7,
    level: 'Beginner',
    isFree: false,
  },
  {
    id: 'd2',
    title: 'Data Analytics',
    description: 'This course introduces students to data analytics concepts, tools, and techniques. Students will learn data wrangling, visualization, and analysis.',
    instructor: 'Neha K',
    price: 98,
    category: 'Data Science',
    thumbnail: '/src/assets/course-data-science.jpg',
    status: 'published',
    enrollments: 0,
    duration: '20h',
    rating: 4.6,
    level: 'Beginner',
    isFree: false,
  },
  {
    id: 'd3',
    title: 'UI/UX Design Essentials',
    description: 'Master the basics of UI/UX design, wireframing, and prototyping.',
    instructor: 'Jessica Park',
    price: 799,
    category: 'Design',
    thumbnail: '/src/assets/course-design.jpg',
    status: 'published',
    enrollments: 0,
    duration: '8h 15m',
    rating: 4.5,
    level: 'Intermediate',
    isFree: false,
  },
  {
    id: 'd4',
    title: 'Digital Marketing 2024',
    description: 'Learn digital marketing strategies, SEO, and social media advertising.',
    instructor: 'Ravi Singh',
    price: 499,
    category: 'Marketing',
    thumbnail: '/src/assets/course-marketing.jpg',
    status: 'published',
    enrollments: 0,
    duration: '12h',
    rating: 4.8,
    level: 'Advanced',
    isFree: false,
  },
  {
    id: 'd5',
    title: 'The Complete Python Pro Bootcamp',
    description: 'Become a Python pro with this comprehensive bootcamp.',
    instructor: 'Angela Yu',
    price: 1999,
    category: 'Web Development',
    thumbnail: '/src/assets/course-programming.jpg',
    status: 'published',
    enrollments: 0,
    duration: '24h',
    rating: 4.9,
    level: 'Intermediate',
    isFree: false,
  },
  {
    id: 'd6',
    title: 'Flutter & Dart - The Complete Guide',
    description: 'Build beautiful native apps for iOS and Android with Flutter & Dart.',
    instructor: 'Maximilian Schwarzmüller',
    price: 2499,
    category: 'Mobile Development',
    thumbnail: '/src/assets/course-programming.jpg',
    status: 'published',
    enrollments: 0,
    duration: '40h',
    rating: 4.8,
    level: 'Advanced',
    isFree: false,
  },
  {
    id: 'd7',
    title: 'AWS Certified Cloud Practitioner',
    description: 'Prepare for the AWS Cloud Practitioner exam with hands-on labs.',
    instructor: 'Stephane Maarek',
    price: 899,
    category: 'Data Science',
    thumbnail: '/src/assets/course-data-science.jpg',
    status: 'published',
    enrollments: 0,
    duration: '14h',
    rating: 4.7,
    level: 'Intermediate',
    isFree: false,
  },
];

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredCourses, setFilteredCourses] = useState(dummyCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  // Get category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter courses based on all criteria
  useEffect(() => {
    const courses = dummyCourses;
let filtered = courses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => (course.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }

    // Level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(course => course.isFree);
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(course => !course.isFree);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, priceFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setPriceFilter('all');
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== 'all' ? selectedCategory : null,
    selectedLevel !== 'all' ? selectedLevel : null,
    priceFilter !== 'all' ? priceFilter : null
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">All Courses</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover industry-oriented courses designed to boost your career
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Array.from(new Set(courses.map((c) => String(c.category)))).map((category) => (
                  <SelectItem key={String(category)} value={String(category)}>
                    {String(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>

            {activeFiltersCount > 0 && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} image={course.thumbnail} students={course.enrollments} level={course.level as 'Beginner' | 'Intermediate' | 'Advanced'} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">No courses found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search criteria or browse our course categories to find what you're looking for.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;