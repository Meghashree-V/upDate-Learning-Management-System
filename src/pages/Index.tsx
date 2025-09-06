import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Award, Users, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Course {
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

const API_BASE_URL = 'http://localhost:5000/api';

const Index = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get featured courses (first 6 courses)
  const featuredCourses = courses.slice(0, 6);
  // Get free courses
  const freeCourses = courses.filter(course => course.price === 0).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Featured Courses Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Featured Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hand-picked courses from our expert instructors to accelerate your learning journey
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2 text-muted-foreground">Loading courses...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredCourses.map((course) => (
                <CourseCard 
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  category={course.categories[0] || 'General'}
                  instructor={course.instructor.name}
                  price={course.price}
                  image={course.thumbnail || '/src/assets/course-programming.jpg'}
                  students={0}
                  duration={course.duration}
                  rating={4.5}
                  level={course.level as 'Beginner' | 'Intermediate' | 'Advanced'}
                  isFree={course.price === 0}
                />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/courses">
              <Button variant="outline" size="lg">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">50K+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">1000+</div>
              <div className="text-muted-foreground">Courses Available</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">4.8</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">25K+</div>
              <div className="text-muted-foreground">Certificates Issued</div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Courses Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              Free Courses
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Start Learning for Free
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with our completely free courses and discover the quality of our content
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2 text-muted-foreground">Loading free courses...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : freeCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {freeCourses.map((course) => (
                <CourseCard 
                  key={course._id}
                  id={course._id}
                  title={course.title}
                  category={course.categories[0] || 'General'}
                  instructor={course.instructor.name}
                  price={course.price}
                  image={course.thumbnail || '/src/assets/course-programming.jpg'}
                  students={0}
                  duration={course.duration}
                  rating={4.5}
                  level={course.level as 'Beginner' | 'Intermediate' | 'Advanced'}
                  isFree={course.price === 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No free courses available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Explore by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find courses that match your interests and career goals
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Web Development',
              'Data Science', 
              'Digital Marketing',
              'UI/UX Design',
              'Mobile Development',
              'Business Analytics',
              'Artificial Intelligence',
              'Cybersecurity'
            ].map((category, index) => (
              <Link key={category} to={`/courses?category=${encodeURIComponent(category)}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      index % 4 === 0 ? 'bg-primary/10' :
                      index % 4 === 1 ? 'bg-green-100' :
                      index % 4 === 2 ? 'bg-blue-100' :
                      'bg-purple-100'
                    }`}>
                      <TrendingUp className={`h-6 w-6 ${
                        index % 4 === 0 ? 'text-primary' :
                        index % 4 === 1 ? 'text-green-600' :
                        index % 4 === 2 ? 'text-blue-600' :
                        'text-purple-600'
                      }`} />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-hover">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of professionals who have already upgraded their skills with upDate. 
            Start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-3">
              Browse Free Courses
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              View All Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
