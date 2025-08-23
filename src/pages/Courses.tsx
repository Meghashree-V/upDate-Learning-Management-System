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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`${API_BASE_URL}/api/courses`);
        if (!res.ok) {
          throw new Error(`Failed to fetch courses: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong while fetching courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);
  // Filter courses based on all criteria
  useEffect(() => {
    let filtered = [...courses];

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
      filtered = filtered.filter(course => 
        Array.isArray(course.categories) && course.categories.includes(selectedCategory)
      );
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
  }, [courses, searchTerm, selectedCategory, selectedLevel, priceFilter]);
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
                {/* You can replace the below categories with dynamic ones from backend if needed */}
                {['Programming', 'Design', 'Marketing', 'Business', 'Data Science', 
                  'Mobile Development', 'Web Development', 'AI/ML', 'DevOps', 'Cybersecurity']
                  .map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
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

        {/* Results Info */}
        <div className="mb-6">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading courses...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <p className="text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          )}
        </div>

        {/* Courses Grid */}
        {loading || error ? null : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id || course.id} {...course} />
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
