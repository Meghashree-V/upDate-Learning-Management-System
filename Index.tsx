import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchCourses = async () => {
  const res = await fetch("http://localhost:5000/api/courses");
  return res.json();
};

const Index = () => {
  const { data: courses = [], isLoading } = useQuery({
  queryKey: ["courses"],  
  queryFn: fetchCourses,
});

  if (isLoading) return <p>Loading courses...</p>;

  const featured = courses.filter((c: any) => c.category === "Featured");
  const free = courses.filter((c: any) => c.price === 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to LMS</h1>

      {/* Featured Courses */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">🌟 Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((course: any) => (
            <div key={course.id} className="p-4 border rounded-lg shadow">
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p>Price: {course.price === 0 ? "Free" : `$${course.price}`}</p>
              <Link to={`/student/courses/${course.id}`} className="text-blue-500">View</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Free Learning */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🎓 Start Learning for Free</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {free.map((course: any) => (
            <div key={course.id} className="p-4 border rounded-lg shadow">
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p>Free Course</p>
              <Link to={`/student/courses/${course.id}`} className="text-blue-500">Start</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
