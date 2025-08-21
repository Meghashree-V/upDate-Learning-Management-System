import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Award, Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
            About upDate
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
            Empowering Your{' '}
            <span className="text-primary">Professional Growth</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            upDate is an industry-oriented learning management system designed to bridge the gap between 
            academic knowledge and real-world professional skills. We provide cutting-edge courses that 
            prepare you for today's competitive job market.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To democratize quality education and make industry-relevant skills accessible to everyone, 
                regardless of their background or location. We believe in practical learning that translates 
                directly into career success.
              </p>
              
              <div className="space-y-4">
                {[
                  'Industry-focused curriculum designed with professionals',
                  'Hands-on projects and real-world case studies',
                  'Expert instructors with industry experience',
                  'Flexible learning paths for all skill levels'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">50K+</div>
                  <div className="text-muted-foreground">Students</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">1K+</div>
                  <div className="text-muted-foreground">Courses</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">4.8</div>
                  <div className="text-muted-foreground">Rating</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">95%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Quality First</h3>
                <p className="text-muted-foreground">
                  We never compromise on the quality of our content. Every course is crafted by 
                  industry experts and reviewed for accuracy and relevance.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Student-Centric</h3>
                <p className="text-muted-foreground">
                  Our learners are at the heart of everything we do. We design experiences that 
                  maximize learning outcomes and career advancement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously evolve our platform and courses to stay ahead of industry trends 
                  and provide cutting-edge learning experiences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with upDate. 
            Start learning today and unlock your potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button variant="hero" size="lg" className="text-lg px-8 py-3">
                Explore Courses
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;