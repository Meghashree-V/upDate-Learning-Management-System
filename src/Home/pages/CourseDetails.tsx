import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Clock, Users, Star, BookOpen, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  duration: string;
  level: string;
  instructor?: string;
  objectives?: string[];
  curriculum?: string[];
  thumbnail: string; // <-- instead of image
  image?: string;
}
const CourseDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data); // directly setting backend data
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);
  if (loading) {
    return <div className="text-center py-24 text-xl">Loading course...</div>;
  }

  if (error) {
    return <div className="text-center py-24 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!course ? (
        <div className="text-center py-24">
          <h1 className="text-2xl font-semibold mb-2">Course not found</h1>
          <p className="text-muted-foreground">
            The course you are looking for does not exist or has been removed.
          </p>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {course.category?.[0] || "General"}
                </Badge>
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{course.description}</p>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating || 4.5}</span>
                    <span>({course.students || 0} students)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <Badge variant={course.level === "Beginner" ? "default" : "secondary"}>
                    {course.level}
                  </Badge>
                </div>

                <p className="text-sm mt-2">
                  Created by <span className="font-medium">{course.instructor || "Instructor"}</span>
                </p>
              </div>

              {/* SIMPLE IMAGE DISPLAY */}
              <div className="relative rounded-lg overflow-hidden shadow-medium">
                 <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Play className="w-6 h-6 mr-2" />
                    Preview Course
                  </Button>
                </div>
              </div>
            </div>
            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-medium">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-primary">₹{course.price}</span>
                      {course.originalPrice !== undefined && (
                        <span className="text-lg text-muted-foreground line-through ml-2">
                          ₹{course.originalPrice}
                        </span>
                      )}
                    </div>
                    {course.originalPrice && course.originalPrice > course.price ? (
                      <Badge variant="destructive">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    ) : null}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3">
                    Enroll Now
                  </Button>

                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{course.duration} on-demand video</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>Mobile and desktop access</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.objectives?.length ? (
                      course.objectives.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Objectives will appear here once added.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {course.curriculum?.length ? (
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      {course.curriculum.map((topic, idx) => (
                        <li key={idx}>{topic}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Curriculum will be available soon.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Reviews will be displayed here...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default CourseDetails;
