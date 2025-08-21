import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  Clock, 
  Users, 
  Play, 
  CheckCircle, 
  Award,
  BookOpen,
  Target
} from 'lucide-react';
import { getCourseById } from '@/data/courses';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const course = id ? getCourseById(id) : null;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Course not found</h1>
          <p className="text-muted-foreground">The course you're looking for doesn't exist.</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {course.category}
                  </Badge>
                  <Badge variant="secondary">
                    {course.level}
                  </Badge>
                  {course.isFree && (
                    <Badge className="bg-green-500 text-white">Free</Badge>
                  )}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {course.title}
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  {course.description}
                </p>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">({course.students.toLocaleString()} students)</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students.toLocaleString()} enrolled</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground">
                  Created by <span className="font-medium text-foreground">{course.instructor}</span>
                </p>
              </div>
            </div>

            {/* Right Sidebar - Course Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-t-lg flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary ml-1" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    {course.isFree ? (
                      <div className="text-3xl font-bold text-green-600">Free</div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-foreground">₹{course.price}</div>
                        {course.originalPrice && (
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-lg text-muted-foreground line-through">
                              ₹{course.originalPrice}
                            </span>
                            <Badge variant="destructive">
                              {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <Button variant="hero" size="lg" className="w-full">
                    {course.isFree ? 'Enroll Free' : 'Enroll Now'}
                  </Button>
                  
                  <Button variant="outline" size="lg" className="w-full">
                    Add to Wishlist
                  </Button>
                  
                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Students</span>
                      <span className="font-medium">{course.students.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Certificate</span>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-medium">Yes</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span>What You'll Learn</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Prerequisites</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                          <span className="text-sm">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {course.curriculum.map((module, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                            {index + 1}
                          </div>
                          <span className="flex-1">{module}</span>
                          <Play className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">
                            {course.instructor.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{course.instructor}</h3>
                          <p className="text-muted-foreground">Industry Expert & Educator</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground">
                        Experienced instructor with years of industry experience and a passion for teaching. 
                        Known for creating practical, hands-on courses that prepare students for real-world challenges.
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">4.8</div>
                          <div className="text-sm text-muted-foreground">Instructor Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">50k+</div>
                          <div className="text-sm text-muted-foreground">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">15</div>
                          <div className="text-sm text-muted-foreground">Courses</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary">{course.rating}</div>
                          <div className="flex items-center justify-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(course.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Course Rating</div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center space-x-2">
                              <span className="text-sm w-2">{stars}</span>
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${stars === 5 ? 75 : stars === 4 ? 20 : 5}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-8">
                                {stars === 5 ? '75%' : stars === 4 ? '20%' : '5%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-center text-muted-foreground">
                        Detailed reviews will be available once you enroll in the course.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;