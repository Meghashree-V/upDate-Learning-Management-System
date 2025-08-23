export const fetchEnrollmentData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { month: "Jan", enrollments: 120, revenue: 8400 },
    { month: "Feb", enrollments: 180, revenue: 12600 },
    { month: "Mar", enrollments: 240, revenue: 16800 },
    { month: "Apr", enrollments: 190, revenue: 13300 },
    { month: "May", enrollments: 280, revenue: 19600 },
    { month: "Jun", enrollments: 320, revenue: 22400 },
  ];
};

export const fetchCoursePerformanceData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { course: "React Dev", enrollments: 342, completion: 85, rating: 4.8 },
    { course: "Python DS", enrollments: 289, completion: 78, rating: 4.7 },
    { course: "UI/UX Design", enrollments: 234, completion: 92, rating: 4.6 },
    { course: "Marketing", enrollments: 156, completion: 67, rating: 4.5 },
    { course: "Machine Learning", enrollments: 198, completion: 74, rating: 4.9 },
  ];
};

export const fetchCategoryDistributionData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { name: "Web Development", value: 35, color: "#DC2626" },
    { name: "Data Science", value: 25, color: "#EA580C" },
    { name: "Design", value: 20, color: "#CA8A04" },
    { name: "Marketing", value: 15, color: "#65A30D" },
    { name: "Mobile Dev", value: 5, color: "#0D9488" },
  ];
};

export const fetchUserActivityData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { time: "00:00", active: 12 },
    { time: "04:00", active: 8 },
    { time: "08:00", active: 145 },
    { time: "12:00", active: 280 },
    { time: "16:00", active: 320 },
    { time: "20:00", active: 180 },
  ];
};

export const fetchRevenueData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { month: "Jan", revenue: 8400, target: 10000 },
    { month: "Feb", revenue: 12600, target: 12000 },
    { month: "Mar", revenue: 16800, target: 15000 },
    { month: "Apr", revenue: 13300, target: 14000 },
    { month: "May", revenue: 19600, target: 18000 },
    { month: "Jun", revenue: 22400, target: 20000 },
  ];
};

export const fetchKpiCardsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      title: "Total Revenue",
      value: "$142,800",
      change: "+15.2%",
      trend: "up",
      icon: "DollarSign",
      color: "text-success",
    },
    {
      title: "Active Students",
      value: "2,847",
      change: "+8.1%",
      trend: "up",
      icon: "Users",
      color: "text-primary",
    },
    {
      title: "Course Completions",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: "BookOpen",
      color: "text-warning",
    },
    {
      title: "Avg. Session Time",
      value: "24m 32s",
      change: "-2.3%",
      trend: "down",
      icon: "Clock",
      color: "text-destructive",
    },
  ];
};

export const fetchStudentAnalyticsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    newStudents: 1847,
    activeStudents: 2234,
    retentionRate: 87,
  };
};
