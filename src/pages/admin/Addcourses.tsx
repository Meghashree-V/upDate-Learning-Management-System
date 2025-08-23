import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Addcourses = () => {
  const { toast } = useToast();

  // Basic course info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [duration, setDuration] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [price, setPrice] = useState("");
  const [instructor, setInstructor] = useState("");
  const [level, setLevel] = useState("");
  const [enrollmentType, setEnrollmentType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFree, setIsFree] = useState(false); // NEW: Free or Paid

  // Categories and lessons
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [lessons, setLessons] = useState([{ id: 1, title: "", duration: "", type: "video" }]);

  // Thumbnail
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

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
    setLessons([...lessons, { id: lessons.length + 1, title: "", duration: "", type: "video" }]);
  };

  const removeLesson = (id: number) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const updateLesson = (id: number, field: string, value: string) => {
    setLessons(lessons.map(lesson =>
      lesson.id === id ? { ...lesson, [field]: value } : lesson
    ));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    // formData.append("duration", duration);
    const formattedDuration = `${durationHours}h ${durationMinutes}m`;
    formData.append("duration", formattedDuration);
    formData.append("price", price);
    formData.append("instructor", instructor);
    formData.append("level", level);
    formData.append("enrollmentType", enrollmentType);
    formData.append("capacity", capacity);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("isFree", isFree ? "true" : "false"); // ✅ Free/Paid

    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("lessons", JSON.stringify(lessons));

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      await axios.post("http://localhost:5000/api/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({ title: "Success", description: "Course created successfully!" });
      // Reset form
      setTitle("");
      setDescription("");
      setDurationHours("");
      setDurationMinutes("");
      setPrice("");
      setInstructor("");
      setLevel("");
      setEnrollmentType("");
      setCapacity("");
      setStartDate("");
      setEndDate("");
      setIsFree(false);
      setSelectedCategories([]);
      setLessons([{ id: 1, title: "", duration: "", type: "video" }]);
      setThumbnail(null);
      setThumbnailPreview(null);
    } catch (err: any) {
      console.error("Error creating course:", err);
      toast({ title: "Error", description: err.response?.data?.error || "Failed to create course" });
    }
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Basic Info */}
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor *</Label>
                    <Select onValueChange={setInstructor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>No instructors available</SelectItem>
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Duration *</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min={0}
                        placeholder="Hours"
                        value={durationHours}
                        onChange={(e) => setDurationHours(e.target.value)}
                        required
                      />
                      <Input
                        type="number"
                        min={0}
                        max={59}
                        placeholder="Minutes"
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 99.99"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required={!isFree} // Disable required if free
                      disabled={isFree} // disable editing if free
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Course Type</Label>
                    <Select onValueChange={(value) => setIsFree(value === "free")}>
                      <SelectTrigger>
                        <SelectValue placeholder={isFree ? "Free" : "Paid"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Categories */}
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

                {/* Thumbnail */}
                <div className="space-y-2">
                  <Label>Course Thumbnail</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag & drop an image here, or click to select
                    </p>
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                    {thumbnailPreview && (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Content */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Course Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex flex-col md:flex-row gap-4 items-center border p-4 rounded-lg"
                  >
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Lesson Title"
                        value={lesson.title}
                        onChange={(e) =>
                          updateLesson(lesson.id, "title", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Duration (mins)"
                        type="number"
                        value={lesson.duration}
                        onChange={(e) =>
                          updateLesson(lesson.id, "duration", e.target.value)
                        }
                      />
                      <Select
                        value={lesson.type}
                        onValueChange={(value) =>
                          updateLesson(lesson.id, "type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Lesson type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeLesson(lesson.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addLesson} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Lesson
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Course Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Level *</Label>
                    <Select onValueChange={setLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Enrollment Type *</Label>
                    <Select onValueChange={setEnrollmentType}>
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
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Capacity *</Label>
                    <Input
                      type="number"
                      placeholder="Max students"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h2 className="text-xl font-bold">{title || "Course Title"}</h2>
                <p className="text-muted-foreground">{description || "Course description will appear here."}</p>
                <p><strong>Instructor:</strong> {instructor || "N/A"}</p>
                {/* <p><strong>Duration:</strong> {duration || "N/A"} hours</p> */}
               <p><strong>Duration:</strong> {durationHours || "0"}h {durationMinutes || "0"}m</p>
                <p><strong>Price:</strong> {isFree ? "Free" : `₹${price || "0.00"}`}</p>
                <p><strong>Level:</strong> {level || "N/A"}</p>
                <p><strong>Enrollment Type:</strong> {enrollmentType || "N/A"}</p>
                <p><strong>Capacity:</strong> {capacity || "N/A"}</p>
                <p><strong>Start:</strong> {startDate || "N/A"} - <strong>End:</strong> {endDate || "N/A"}</p>
                <div>
                  <strong>Categories:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((cat, i) => (
                      <Badge key={i}>{cat}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Lessons:</strong>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    {lessons.map((lesson) => (
                      <li key={lesson.id}>
                        {lesson.title || "Untitled"} - {lesson.duration || "0"} mins ({lesson.type})
                      </li>
                    ))}
                  </ul>
                </div>
                {thumbnailPreview && (
                  <div className="mt-4">
                    <img
                      src={thumbnailPreview}
                      alt="Course Thumbnail"
                      className="h-40 w-40 object-cover rounded-md"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <Button type="submit" className="px-6">Create Course</Button>
        </div>
      </form>
    </div>
  );
};

export default Addcourses;
