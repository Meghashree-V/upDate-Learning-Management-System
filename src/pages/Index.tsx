import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedCourses, courses } from '@/data/courses';

const Index = () => {
  const featuredCourses = getFeaturedCourses();
  const freeCourses = courses.filter(course => course.isFree);

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
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
