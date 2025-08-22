import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchAllCourses = async () => {
  const res = await fetch("http://localhost:5000/api/courses");
  return res.json();
};

const Courses = () => {
 const { data: courses = [], isLoading } = useQuery({
  queryKey: ["allCourses"],
  queryFn: fetchAllCourses,
});

  if (isLoading) return <p>Loading all courses...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📚 Browse All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course: any) => (
          <div key={course.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p>Price: {course.price === 0 ? "Free" : `$${course.price}`}</p>
            <Link to={`/student/courses/${course.id}`} className="text-blue-500">View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
