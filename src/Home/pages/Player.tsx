import { useState } from "react";
import { useParams } from "react-router-dom";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const courseContent = {
  id: 1,
  title: "Complete React Development Bootcamp",
  currentLesson: {
    id: 5,
    title: "Understanding React State",
    duration: "18:32",
    videoUrl: "/api/placeholder/800/450"
  },
  chapters: [
    {
      title: "Getting Started",
      lessons: [
        { id: 1, title: "Introduction to React", duration: "12:45", completed: true },
        { id: 2, title: "Setting up Development Environment", duration: "15:30", completed: true },
        { id: 3, title: "Your First React Component", duration: "20:15", completed: true },
        { id: 4, title: "JSX Fundamentals", duration: "16:22", completed: true }
      ]
    },
    {
      title: "React Fundamentals",
      lessons: [
        { id: 5, title: "Understanding React State", duration: "18:32", completed: false, current: true },
        { id: 6, title: "Props and Data Flow", duration: "22:10", completed: false },
        { id: 7, title: "Event Handling", duration: "19:45", completed: false },
        { id: 8, title: "Conditional Rendering", duration: "14:20", completed: false }
      ]
    },
    {
      title: "React Hooks",
      lessons: [
        { id: 9, title: "Introduction to Hooks", duration: "25:30", completed: false },
        { id: 10, title: "useState Hook Deep Dive", duration: "28:15", completed: false },
        { id: 11, title: "useEffect Hook", duration: "32:40", completed: false },
        { id: 12, title: "Custom Hooks", duration: "30:20", completed: false }
      ]
    }
  ],
  resources: [
    { name: "Lesson Notes.pdf", type: "pdf", size: "2.3 MB" },
    { name: "Source Code.zip", type: "zip", size: "1.1 MB" },
    { name: "Practice Exercise.md", type: "markdown", size: "0.5 MB" }
  ]
};

const Player = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const completedLessons = courseContent.chapters.reduce((total, chapter) => 
    total + chapter.lessons.filter(lesson => lesson.completed).length, 0
  );

  const totalLessons = courseContent.chapters.reduce((total, chapter) => 
    total + chapter.lessons.length, 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={courseContent.currentLesson.videoUrl}
                  alt="Video player"
                  className="w-full h-96 object-cover"
                />
                
                {/* Video Controls */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </Button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="space-y-3">
                    <Progress value={progress} className="h-1 bg-white/20" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="bg-primary hover:bg-primary-hover text-white"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <div className="text-white text-sm">
                          6:28 / {courseContent.currentLesson.duration}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Info */}
          <Card>
            <CardHeader>
              <CardTitle>{courseContent.currentLesson.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{courseContent.currentLesson.duration}</span>
                </div>
                <span>Lesson 5 of {totalLessons}</span>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4">
                  <p className="text-muted-foreground">
                    In this lesson, you'll learn the fundamentals of React state management. 
                    We'll cover how to use the useState hook effectively and understand when 
                    and why to use state in your components.
                  </p>
                </TabsContent>
                
                <TabsContent value="notes" className="mt-4">
                  <div className="space-y-3">
                    <div className="p-4 bg-lms-red-light rounded-lg">
                      <h4 className="font-medium mb-2">Key Points:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• State is used to store data that can change over time</li>
                        <li>• useState hook returns an array with current state and setter function</li>
                        <li>• State updates trigger component re-renders</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="mt-4">
                  <div className="space-y-2">
                    {courseContent.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-lms-red-light">
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <p className="text-sm text-muted-foreground">{resource.size}</p>
                        </div>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Course Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Course Content</CardTitle>
              <div className="text-sm text-muted-foreground">
                {completedLessons}/{totalLessons} lessons completed
              </div>
              <Progress value={(completedLessons / totalLessons) * 100} className="h-2" />
            </CardHeader>
            
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {courseContent.chapters.map((chapter, chapterIndex) => (
                <div key={chapterIndex}>
                  <h4 className="font-medium text-sm mb-2">{chapter.title}</h4>
                  <div className="space-y-1">
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                          lesson.current 
                            ? 'bg-primary text-white' 
                            : lesson.completed 
                              ? 'bg-lms-red-light hover:bg-lms-red-light/80' 
                              : 'hover:bg-lms-red-light'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : lesson.current ? (
                            <Play className="w-4 h-4" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{lesson.title}</p>
                          <p className="text-xs opacity-75">{lesson.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Player;