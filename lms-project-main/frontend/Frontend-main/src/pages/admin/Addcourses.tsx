import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Upload,
  X,
  Video,
  FileText,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Addcourses = () => {
  const { toast } = useToast();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [lessons, setLessons] = useState([
    { id: 1, title: "", duration: "", type: "video" }
  ]);

  const categories = [
    "Programming", "Design", "Marketing", "Business", "Data Science", 
    "Mobile Development", "Web Development", "AI/ML", "DevOps", "Cybersecurity"
  ];

  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter(cat => cat !== category));
  };

  const addLesson = () => {
    setLessons([...lessons, { 
      id: lessons.length + 1, 
      title: "", 
      duration: "", 
      type: "video" 
    }]);
  };

  const removeLesson = (id: number) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Course Created Successfully!",
      description: "Your new course has been added to the platform.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Course</h1>
          <p className="text-muted-foreground">
            Create engaging courses for your students
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Course Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter course title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Course Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn in this course"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="e.g., 40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {category}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeCategory(category)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={addCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Course Thumbnail</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop an image here, or click to select
                    </p>
                    <Button type="button" variant="outline">
                      Choose File
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Course Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Lesson {index + 1}</h4>
                      {lessons.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLesson(lesson.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Lesson Title</Label>
                        <Input placeholder="Enter lesson title" />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration (minutes)</Label>
                        <Input type="number" placeholder="e.g., 30" />
                      </div>
                      <div className="space-y-2">
                        <Label>Content Type</Label>
                        <Select defaultValue="video">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="assignment">Assignment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addLesson}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Lesson
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Enrollment Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Maximum Students</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="e.g., 100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Enrollment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select enrollment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open Enrollment</SelectItem>
                        <SelectItem value="approval">Requires Approval</SelectItem>
                        <SelectItem value="invite">Invite Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Schedule Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Course thumbnail preview</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Course Title Preview</h3>
                    <p className="text-muted-foreground">Course description will appear here...</p>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Duration: -- hours</span>
                    <span>Level: --</span>
                    <span>Price: $--</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 pt-6 border-t">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary-hover">
            Publish Course
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Addcourses;