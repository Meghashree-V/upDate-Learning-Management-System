// Images removed since no static courses are defined; import when adding real data dynamically

export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isFree?: boolean;
  description: string;
  curriculum: string[];
  prerequisites: string[];
  objectives: string[];
}

export const courses: Course[] = [];

export const categories = [
  'Web Development',
  'Data Science',
  'Digital Marketing',
  'Mobile Development',
  'UI/UX Design',
  'Business Analytics',
  'Artificial Intelligence',
  'Cybersecurity'
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return courses.filter(course => 
    course.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedCourses = (): Course[] => {
  return courses.slice(0, 3);
};