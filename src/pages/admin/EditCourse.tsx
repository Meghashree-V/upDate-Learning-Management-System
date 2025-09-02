import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const dummyCourses = [
  {
    _id: "d1",
    title: "Modern React Bootcamp",
    instructor: { name: "Sarah Lee" },
    price: 1499,
    category: "Web Development",
    status: "published",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
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
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
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
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
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
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    enrollments: 200,
    duration: "6h 10m",
    rating: 4.6,
  },
];

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        let found = null;
        // Try fetch from backend by id
        if (id && !id.startsWith('d')) {
          const res = await axios.get(`http://localhost:5000/api/courses`);
          found = res.data.find((c: any) => c._id === id);
        }
        if (!found) {
          found = dummyCourses.find((c: any) => c._id === id);
        }
        if (!found) throw new Error("Course not found");
        setCourse(found);
        setForm({
          title: found.title || "",
          price: found.price || 0,
          category: found.category || "",
          status: found.status || "",
          instructor: typeof found.instructor === "object" ? found.instructor.name : found.instructor || "",
          duration: found.duration || "",
          thumbnail: found.thumbnail || "",
        });
      } catch (err) {
        setError("Course not found or failed to fetch.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (course._id.startsWith("d")) {
        // Dummy: just update local state (simulate save)
        alert("Dummy course updated (frontend only)");
      } else {
        // Real: update backend
        await axios.put(`http://localhost:5000/api/courses/${course._id}`,
          { ...course, ...form }
        );
        alert("Course updated successfully");
      }
      navigate("/admin/mycourses");
    } catch (err) {
      alert("Failed to save course");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error || !course) return <div className="p-8 text-center text-red-600">{error || "Course not found."}</div>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {form.thumbnail && (
            <img
              src={form.thumbnail}
              alt="Course thumbnail"
              className="w-full h-48 object-cover rounded mb-4"
            />
          )}
          <div>
            <label className="block mb-1">Title</label>
            <Input name="title" value={form.title} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Price (₹)</label>
            <Input name="price" value={form.price} onChange={handleChange} type="number" />
          </div>
          <div>
            <label className="block mb-1">Category</label>
            <Input name="category" value={form.category} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <Input name="status" value={form.status} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Instructor</label>
            <Input name="instructor" value={form.instructor} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1">Duration</label>
            <Input name="duration" value={form.duration} onChange={handleChange} />
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full mt-4">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCourse;
