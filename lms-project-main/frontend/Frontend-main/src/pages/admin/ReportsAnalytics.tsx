import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  DollarSign,
  Clock,
  Download,
  Calendar,
} from "lucide-react";

const ReportsAnalytics = () => {
  const enrollmentData = [
    { month: "Jan", enrollments: 120, revenue: 8400 },
    { month: "Feb", enrollments: 180, revenue: 12600 },
    { month: "Mar", enrollments: 240, revenue: 16800 },
    { month: "Apr", enrollments: 190, revenue: 13300 },
    { month: "May", enrollments: 280, revenue: 19600 },
    { month: "Jun", enrollments: 320, revenue: 22400 },
  ];

  const coursePerformanceData = [
    { course: "React Dev", enrollments: 342, completion: 85, rating: 4.8 },
    { course: "Python DS", enrollments: 289, completion: 78, rating: 4.7 },
    { course: "UI/UX Design", enrollments: 234, completion: 92, rating: 4.6 },
    { course: "Marketing", enrollments: 156, completion: 67, rating: 4.5 },
    { course: "Machine Learning", enrollments: 198, completion: 74, rating: 4.9 },
  ];

  const categoryData = [
    { name: "Web Development", value: 35, color: "#DC2626" },
    { name: "Data Science", value: 25, color: "#EA580C" },
    { name: "Design", value: 20, color: "#CA8A04" },
    { name: "Marketing", value: 15, color: "#65A30D" },
    { name: "Mobile Dev", value: 5, color: "#0D9488" },
  ];

  const userActivityData = [
    { time: "00:00", active: 12 },
    { time: "04:00", active: 8 },
    { time: "08:00", active: 145 },
    { time: "12:00", active: 280 },
    { time: "16:00", active: 320 },
    { time: "20:00", active: 180 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 8400, target: 10000 },
    { month: "Feb", revenue: 12600, target: 12000 },
    { month: "Mar", revenue: 16800, target: 15000 },
    { month: "Apr", revenue: 13300, target: 14000 },
    { month: "May", revenue: 19600, target: 18000 },
    { month: "Jun", revenue: 22400, target: 20000 },
  ];

  const kpiCards = [
    {
      title: "Total Revenue",
      value: "$142,800",
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Active Students",
      value: "2,847",
      change: "+8.1%",
      trend: "up",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Course Completions",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: BookOpen,
      color: "text-warning",
    },
    {
      title: "Avg. Session Time",
      value: "24m 32s",
      change: "-2.3%",
      trend: "down",
      icon: Clock,
      color: "text-destructive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your LMS performance
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`text-sm ${kpi.trend === "up" ? "text-success" : "text-destructive"}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Analytics</TabsTrigger>
          <TabsTrigger value="students">Student Analytics</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="enrollments" 
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Categories Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity by Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="active" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={coursePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="course" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrollments" fill="hsl(var(--primary))" />
                  <Bar dataKey="completion" fill="hsl(var(--success))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coursePerformanceData.map((course, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{course.course}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Enrollments</p>
                      <p className="text-xl font-bold">{course.enrollments}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completion</p>
                      <p className="text-xl font-bold">{course.completion}%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <Badge variant="outline">{course.rating}/5.0</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">New Students</p>
                  <p className="text-3xl font-bold">1,847</p>
                  <Badge variant="outline" className="mt-2">+12% this month</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-3xl font-bold">2,234</p>
                  <Badge variant="outline" className="mt-2">+8% this month</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                  <p className="text-3xl font-bold">87%</p>
                  <Badge variant="outline" className="mt-2">+3% this month</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="enrollments" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Target</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Actual Revenue" />
                  <Bar dataKey="target" fill="hsl(var(--muted))" name="Target Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Course Sales</span>
                  <span className="font-bold">$128,400</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Subscriptions</span>
                  <span className="font-bold">$14,400</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Certifications</span>
                  <span className="font-bold">$6,800</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">$149,600</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Revenue Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {coursePerformanceData.slice(0, 3).map((course, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{course.course}</span>
                    <Badge variant="outline">
                      ${(course.enrollments * 89.99).toLocaleString()}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;