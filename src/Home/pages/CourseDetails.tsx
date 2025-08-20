import { useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Clock, Users, Star, BookOpen, Award, CheckCircle, FileText, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const courseData = {
  id: 1,
  title: "Complete React Development Bootcamp",
  instructor: "Sarah Johnson",
  rating: 4.8,
  students: 12543,
  duration: "40h 30m",
  price: "$89.99",
  originalPrice: "$199.99",
  image: "/api/placeholder/800/400",
  category: "Web Development",
  level: "Beginner",
  description: "Master React development from basics to advanced concepts with hands-on projects and real-world applications. This comprehensive course covers React fundamentals, hooks, state management, and modern development practices.",
  whatYouLearn: [
    "Build dynamic web applications with React",
    "Master React hooks and state management",
    "Implement responsive designs with Tailwind CSS",
    "Work with APIs and handle asynchronous operations",
    "Deploy applications to production",
    "Follow React best practices and patterns"
  ],
  curriculum: [
    {
      title: "Getting Started with React",
      lessons: 8,
      duration: "2h 30m",
      topics: ["Introduction to React", "Setting up development environment", "JSX and components", "Props and state"]
    },
    {
      title: "React Hooks Deep Dive",
      lessons: 12,
      duration: "4h 15m",
      topics: ["useState and useEffect", "Custom hooks", "useContext and useReducer", "Performance optimization"]
    },
    {
      title: "Building Real Projects",
      lessons: 15,
      duration: "6h 45m",
      topics: ["Todo application", "E-commerce dashboard", "Weather app", "Social media feed"]
    },
    {
      title: "Advanced Topics",
      lessons: 10,
      duration: "3h 30m",
      topics: ["Testing with Jest", "TypeScript integration", "Performance optimization", "Deployment strategies"]
    }
  ],
  quiz: {
    id: 1,
    title: "React Fundamentals Assessment",
    description: "Test your understanding of React basics",
    questions: [
      {
        id: 1,
        question: "What is JSX in React?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript",
          "A CSS framework",
          "A database query language"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which hook is used for managing component state?",
        options: [
          "useEffect",
          "useContext",
          "useState",
          "useReducer"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What is the purpose of useEffect hook?",
        options: [
          "To manage state",
          "To handle side effects",
          "To create components",
          "To style components"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "How do you pass data from parent to child component?",
        options: [
          "Using state",
          "Using props",
          "Using context",
          "Using refs"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What does React Virtual DOM provide?",
        options: [
          "Better SEO",
          "Improved performance",
          "Enhanced security",
          "Mobile responsiveness"
        ],
        correctAnswer: 1
      }
    ]
  }
};

const CourseDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < courseData.quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    courseData.quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: courseData.quiz.questions.length,
      percentage: Math.round((correct / courseData.quiz.questions.length) * 100)
    };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-2">
              {courseData.category}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-2">{courseData.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{courseData.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{courseData.rating}</span>
                <span>({courseData.students.toLocaleString()} students)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{courseData.duration}</span>
              </div>
              <Badge variant={courseData.level === 'Beginner' ? 'default' : 'secondary'}>
                {courseData.level}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2">
              Created by <span className="font-medium text-foreground">{courseData.instructor}</span>
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-medium">
            <img
              src={courseData.image}
              alt={courseData.title}
              className="w-full h-64 object-cover"
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
                  <span className="text-3xl font-bold text-primary">{courseData.price}</span>
                  <span className="text-lg text-muted-foreground line-through ml-2">{courseData.originalPrice}</span>
                </div>
                <Badge variant="destructive">55% OFF</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-gradient-primary hover:bg-primary-hover text-white text-lg py-3">
                Enroll Now
              </Button>
              <Button variant="outline" className="w-full">
                Add to Wishlist
              </Button>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{courseData.duration} on-demand video</span>
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

      {/* Course Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {courseData.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="curriculum" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseData.curriculum.map((section, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{section.title}</h3>
                    <div className="text-sm text-muted-foreground">
                      {section.lessons} lessons • {section.duration}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {section.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="text-sm text-muted-foreground pl-4">
                        • {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <CardTitle>{courseData.quiz.title}</CardTitle>
              </div>
              <p className="text-muted-foreground">{courseData.quiz.description}</p>
            </CardHeader>
            <CardContent>
              {!quizStarted ? (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Ready to test your knowledge?</h3>
                    <p className="text-muted-foreground mb-4">
                      This quiz contains {courseData.quiz.questions.length} questions about React fundamentals
                    </p>
                    <ul className="text-sm text-muted-foreground text-left max-w-md mx-auto space-y-1">
                      <li>• {courseData.quiz.questions.length} multiple choice questions</li>
                      <li>• No time limit</li>
                      <li>• You can review and change answers</li>
                      <li>• Passing score: 70%</li>
                    </ul>
                  </div>
                  <Button onClick={startQuiz} size="lg" className="bg-gradient-primary hover:bg-primary-hover text-white">
                    <FileText className="w-5 h-5 mr-2" />
                    Start Quiz
                  </Button>
                </div>
              ) : !showResults ? (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Question {currentQuestion + 1} of {courseData.quiz.questions.length}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {Object.keys(answers).length}/{courseData.quiz.questions.length} answered
                      </span>
                    </div>
                    <Progress 
                      value={((currentQuestion + 1) / courseData.quiz.questions.length) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-6">
                      {courseData.quiz.questions[currentQuestion].question}
                    </h3>
                    
                    <RadioGroup
                      value={answers[courseData.quiz.questions[currentQuestion].id]?.toString()}
                      onValueChange={(value) => 
                        handleAnswerSelect(courseData.quiz.questions[currentQuestion].id, parseInt(value))
                      }
                    >
                      {courseData.quiz.questions[currentQuestion].options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={resetQuiz}
                      >
                        Reset Quiz
                      </Button>
                      <Button
                        onClick={handleNextQuestion}
                        disabled={!answers[courseData.quiz.questions[currentQuestion].id] && answers[courseData.quiz.questions[currentQuestion].id] !== 0}
                        className="bg-gradient-primary hover:bg-primary-hover text-white"
                      >
                        {currentQuestion === courseData.quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  {(() => {
                    const score = calculateScore();
                    const passed = score.percentage >= 70;
                    
                    return (
                      <div>
                        <div className="mb-6">
                          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                            passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            <Trophy className="w-10 h-10" />
                          </div>
                          <h3 className="text-2xl font-bold mb-2">
                            {passed ? 'Congratulations!' : 'Keep Learning!'}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            You scored {score.correct} out of {score.total} questions correctly
                          </p>
                          <div className="text-4xl font-bold text-primary mb-4">
                            {score.percentage}%
                          </div>
                          <p className={`text-sm ${passed ? 'text-green-600' : 'text-red-600'}`}>
                            {passed ? 'You passed the quiz!' : 'You need 70% to pass. Try again!'}
                          </p>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                          <h4 className="font-semibold text-left">Review Your Answers:</h4>
                          {courseData.quiz.questions.map((question, index) => {
                            const userAnswer = answers[question.id];
                            const isCorrect = userAnswer === question.correctAnswer;
                            
                            return (
                              <div key={question.id} className="text-left p-4 rounded-lg border">
                                <p className="font-medium mb-2">
                                  {index + 1}. {question.question}
                                </p>
                                <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                  Your answer: {question.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                                </p>
                                {!isCorrect && (
                                  <p className="text-sm text-green-600">
                                    Correct answer: {question.options[question.correctAnswer]}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-center space-x-4">
                          <Button onClick={resetQuiz} variant="outline">
                            Retake Quiz
                          </Button>
                          {passed && (
                            <Button className="bg-gradient-primary hover:bg-primary-hover text-white">
                              <Award className="w-4 h-4 mr-2" />
                              Get Certificate
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
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
    </div>
  );
};

export default CourseDetails;