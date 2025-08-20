import programmingImage from '@/assets/course-programming.jpg';
import marketingImage from '@/assets/course-marketing.jpg';
import dataScienceImage from '@/assets/course-data-science.jpg';

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

export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2024',
    instructor: 'Dr. Angela Yu',
    rating: 4.7,
    students: 45623,
    duration: '52 hours',
    price: 599,
    originalPrice: 3999,
    image: programmingImage,
    category: 'Web Development',
    level: 'Beginner',
    description: 'Learn HTML, CSS, JavaScript, Node.js, React, PostgreSQL, Web3 and DApps. Become a full-stack web developer with one course.',
    curriculum: [
      'HTML 5 & CSS 3 Fundamentals',
      'JavaScript ES6+ Programming',
      'React.js & Redux',
      'Node.js & Express.js',
      'Database Design with PostgreSQL',
      'Authentication & Security',
      'Deployment & DevOps'
    ],
    prerequisites: ['Basic computer skills', 'No prior programming experience required'],
    objectives: [
      'Build 16+ real-world projects',
      'Master full-stack web development',
      'Deploy applications to production',
      'Understand modern web development workflow'
    ]
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass 2024',
    instructor: 'Neil Patel',
    rating: 4.8,
    students: 38942,
    duration: '35 hours',
    price: 799,
    originalPrice: 4999,
    image: marketingImage,
    category: 'Digital Marketing',
    level: 'Intermediate',
    description: 'Master SEO, Google Ads, Facebook Ads, Content Marketing, Email Marketing, and Analytics to grow any business online.',
    curriculum: [
      'SEO & Keyword Research',
      'Google Ads & PPC',
      'Social Media Marketing',
      'Content Marketing Strategy',
      'Email Marketing Automation',
      'Analytics & Conversion Optimization'
    ],
    prerequisites: ['Basic understanding of business', 'Familiarity with social media'],
    objectives: [
      'Drive qualified traffic to websites',
      'Create effective marketing campaigns',
      'Measure and optimize marketing ROI',
      'Build a comprehensive marketing strategy'
    ]
  },
  {
    id: '3',
    title: 'Data Science with Python & Machine Learning',
    instructor: 'Jose Portilla',
    rating: 4.6,
    students: 52187,
    duration: '42 hours',
    price: 699,
    originalPrice: 5999,
    image: dataScienceImage,
    category: 'Data Science',
    level: 'Intermediate',
    description: 'Learn data analysis, visualization, machine learning, and AI with Python. Perfect for beginners and professionals.',
    curriculum: [
      'Python Programming Fundamentals',
      'Data Analysis with Pandas & NumPy',
      'Data Visualization with Matplotlib & Seaborn',
      'Machine Learning Algorithms',
      'Deep Learning with TensorFlow',
      'Real-world Projects & Case Studies'
    ],
    prerequisites: ['Basic mathematics', 'No prior programming experience required'],
    objectives: [
      'Analyze large datasets effectively',
      'Build predictive models',
      'Create data visualizations',
      'Deploy machine learning models'
    ]
  },
  {
    id: '4',
    title: 'React Native Mobile App Development',
    instructor: 'Stephen Grider',
    rating: 4.5,
    students: 29156,
    duration: '38 hours',
    price: 649,
    originalPrice: 4499,
    image: programmingImage,
    category: 'Mobile Development',
    level: 'Intermediate',
    description: 'Build iOS and Android apps with React Native. Learn navigation, state management, and deployment.',
    curriculum: [
      'React Native Fundamentals',
      'Navigation & Routing',
      'State Management with Redux',
      'Native Device Features',
      'Push Notifications',
      'App Store Deployment'
    ],
    prerequisites: ['JavaScript knowledge', 'Basic React experience helpful'],
    objectives: [
      'Build cross-platform mobile apps',
      'Publish apps to app stores',
      'Integrate device features',
      'Optimize app performance'
    ]
  },
  {
    id: '5',
    title: 'UI/UX Design Complete Course',
    instructor: 'Daniel Schifano',
    rating: 4.9,
    students: 31478,
    duration: '28 hours',
    price: 549,
    originalPrice: 3999,
    image: marketingImage,
    category: 'UI/UX Design',
    level: 'Beginner',
    description: 'Master user interface and experience design with Figma, Adobe XD, and design thinking principles.',
    curriculum: [
      'Design Thinking Process',
      'User Research & Personas',
      'Wireframing & Prototyping',
      'Visual Design Principles',
      'Figma & Adobe XD',
      'Usability Testing'
    ],
    prerequisites: ['Creative mindset', 'No design experience required'],
    objectives: [
      'Create user-centered designs',
      'Build interactive prototypes',
      'Conduct user research',
      'Design responsive interfaces'
    ]
  },
  {
    id: '6',
    title: 'Python for Automation & Scripting',
    instructor: 'Automate Boring Stuff',
    rating: 4.7,
    students: 67892,
    duration: '24 hours',
    price: 0,
    image: dataScienceImage,
    category: 'Web Development',
    level: 'Beginner',
    isFree: true,
    description: 'Learn Python programming by automating tedious tasks. Perfect for beginners who want practical skills.',
    curriculum: [
      'Python Basics & Syntax',
      'File & Folder Manipulation',
      'Web Scraping',
      'Excel & CSV Automation',
      'Email & SMS Automation',
      'GUI Automation'
    ],
    prerequisites: ['Basic computer skills', 'No programming experience required'],
    objectives: [
      'Automate repetitive tasks',
      'Build practical Python scripts',
      'Save time with automation',
      'Foundation for advanced Python'
    ]
  }
];

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