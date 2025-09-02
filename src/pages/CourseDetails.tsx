import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      // Dummy courses (same as in Mycourses)
      const dummyCourses = [
        {
          _id: "d1",
          title: "Modern React Bootcamp",
          instructor: { name: "Sarah Lee" },
          price: 1499,
          category: "Web Development",
          status: "published",
          thumbnail: "/src/assets/course-programming.jpg",
          enrollments: 120,
          duration: "12h 30m",
          rating: 4.8,
        },
        {
          _id: "d2",
          title: "Data Science Masterclass",
          instructor: { name: "Dr. Amit Kumar" },
          price: 1799,
          category: "Data Science",
          status: "published",
          thumbnail: "/src/assets/course-data-science.jpg",
          enrollments: 85,
          duration: "9h 15m",
          rating: 4.7,
        },
        {
          _id: "d3",
          title: "UI/UX Design Essentials",
          instructor: { name: "Jessica Park" },
          price: 1299,
          category: "Design",
          status: "draft",
          thumbnail: "/src/assets/course-design.jpg",
          enrollments: 40,
          duration: "7h 45m",
          rating: 4.5,
        },
        {
          _id: "d4",
          title: "Digital Marketing 2024",
          instructor: { name: "Ravi Singh" },
          price: 999,
          category: "Marketing",
          status: "published",
          thumbnail: "/src/assets/course-marketing.jpg",
          enrollments: 200,
          duration: "6h 10m",
          rating: 4.6,
        },
        {
          _id: "d5",
          title: "The Complete Python Pro Bootcamp",
          instructor: { name: "Angela Yu" },
          price: 1999,
          category: "Web Development",
          status: "published",
          thumbnail: "/src/assets/course-programming.jpg",
          enrollments: 350,
          duration: "24h",
          rating: 4.9,
        },
        {
          _id: "d6",
          title: "Flutter & Dart - The Complete Guide",
          instructor: { name: "Maximilian Schwarzmüller" },
          price: 2499,
          category: "Mobile Development",
          status: "review",
          thumbnail: "/src/assets/course-programming.jpg",
          enrollments: 150,
          duration: "40h",
          rating: 4.8,
        },
        {
          _id: "d7",
          title: "AWS Certified Cloud Practitioner",
          instructor: { name: "Stephane Maarek" },
          price: 899,
          category: "Data Science",
          status: "published",
          thumbnail: "/src/assets/course-data-science.jpg",
          enrollments: 500,
          duration: "14h",
          rating: 4.7,
        },
      ];
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        let found = res.data.find((c: any) => c._id === id);
        if (!found) {
          found = dummyCourses.find((c: any) => c._id === id);
        }
        if (!found) throw new Error("Course not found");
        setCourse(found);
      } catch (err: any) {
        // fallback to dummy if backend fails
        const found = dummyCourses.find((c: any) => c._id === id);
        if (found) setCourse(found);
        else setError("Course not found or failed to fetch.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error || !course) return <div className="p-8 text-center text-red-600">{error || "Course not found."}</div>;

  const handleEnroll = async () => {
    // Simulate enrollment logic (replace with real API call later)
    alert("Enrolled in this course! (Simulated)");
    // Optionally, update UI or state here
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {course.thumbnail && (
            <img
              src={`http://localhost:5000${course.thumbnail.startsWith("/") ? course.thumbnail : "/" + course.thumbnail}`}
              alt={course.title}
              className="mb-4 w-full h-64 object-cover rounded"
            />
          )}
          <p className="mb-2 text-muted-foreground">Instructor: {typeof course.instructor === "object" ? course.instructor?.name : course.instructor || "Unknown"}</p>
          <p className="mb-2">Price: ₹{course.price || 0}</p>
          <p className="mb-2">Category: {course.category || "-"}</p>
          <p className="mb-2">Status: {course.status || "-"}</p>
          <p className="mb-2">Duration: {course.duration || "N/A"}</p>
          <p className="mb-2">Rating: {course.rating || 0}</p>
          <p className="mb-2">Enrollments: {course.enrollments || 0}</p>
          <div className="flex gap-4 mt-6">
            <Button className="bg-primary" onClick={handleEnroll}>Enroll Now</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>Back to Courses</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetails;
