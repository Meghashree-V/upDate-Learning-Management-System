import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const enrolledCourses: Array<{
  id: number;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  timeSpent: string;
  lastAccessed: string;
  image: string;
  category: string;
  status: string;
}> = [];

const MyEnrollments = () => {
  const inProgressCourses = enrolledCourses.filter(course => course.status === "In Progress");
  const completedCourses = enrolledCourses.filter(course => course.status === "Completed");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Learning</h1>
        <p className="text-muted-foreground">Track your progress and continue your learning journey</p>
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Play className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{inProgressCourses.length}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{completedCourses.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">0h</p>
                <p className="text-sm text-muted-foreground">Total Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      {inProgressCourses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-medium transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/90">
                        {course.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        {course.progress}% Complete
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Time spent: {course.timeSpent}</span>
                      <span>Last: {course.lastAccessed}</span>
                    </div>
                  </div>
                </CardContent>
                
                <div className="p-4 pt-0">
                  <Link to={`/student/player/${course.id}`}>
                    <Button className="w-full bg-gradient-primary:bg-primary-hover">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-medium transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/90">
                        {course.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <Award className="w-4 h-4 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>Completed: {course.timeSpent}</span>
                    <span>{course.totalLessons} lessons</span>
                  </div>
                </CardContent>
                
                <div className="p-4 pt-0 space-y-2">
                  <Link to={`/student/certificates/${course.id}`}>
                    <Button variant="outline" className="w-full">
                      <Award className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </Link>
                  <Link to={`/student/player/${course.id}`}>
                    <Button variant="ghost" className="w-full">
                      Review Course
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;