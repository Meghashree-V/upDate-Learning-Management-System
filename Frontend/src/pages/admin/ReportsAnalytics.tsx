import { useEffect, useState } from "react";
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
import { log } from "console";

// 👇 Map backend string icon names to actual components
const iconMap: Record<string, any> = {
  DollarSign,
  Users,
  BookOpen,
  Clock,
};

const ReportsAnalytics = () => {
// ---- STATE ----
const [enrollmentData, setEnrollmentData] = useState<any[]>([]);
const [coursePerformanceData, setCoursePerformanceData] = useState<any[]>([]);
const [categoryData, setCategoryData] = useState<any[]>([]);
const [userActivityData, setUserActivityData] = useState<any[]>([]);
const [revenueData, setRevenueData] = useState<any[]>([]);
const [kpiCards, setKpiCards] = useState<any[]>([]);
const [revenueBreakdown, setRevenueBreakdown] = useState<any>({});
const [topCourses, setTopCourses] = useState<any[]>([]);
const [days, setDays] = useState("30");

// ---- FETCH ANALYTICS ----
useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const [
        enrollmentsRes,
        coursesRes,
        categoriesRes,
        userActRes,
        revenueRes,
        kpiRes,
        breakdownRes,
        topCoursesRes,
      ] = await Promise.all([
        fetch(`http://localhost:5000/api/enrollments?days=${days}`).then((r) => r.json()),
        fetch(`http://localhost:5000/api/courses?days=${days}`).then((r) => r.json()),
        fetch(`http://localhost:5000/api/categories?days=${days}`).then((r) => r.json()),
        fetch(`http://localhost:5000/api/user-activity?days=${days}`).then((r) => r.json()),
        fetch(`http://localhost:5000/api/revenue?days=${days}`).then((r) => r.json()),
        fetch(`http://localhost:5000/api/kpis?days=${days}`).then((r) => r.json()),
        fetch(`http://localhost:5000/api/revenue/breakdown?days=${days}`).then((r) => r.json()),
        fetch(`http://localhost:5000/api/revenue/top-courses?days=${days}&limit=3`).then((r) => r.json()),
      ]);

      setEnrollmentData(enrollmentsRes);
      setCoursePerformanceData(coursesRes);
      setCategoryData(categoriesRes);
      setUserActivityData(userActRes);
      setRevenueData(revenueRes);
      setKpiCards(kpiRes);
      setRevenueBreakdown(breakdownRes);
      setTopCourses(topCoursesRes);

      console.log("✅ Analytics fetched");
    } catch (err) {
      console.error("❌ Error fetching analytics:", err);
    }
  };

  fetchAnalytics();
}, [days]); // refetch whenever filter changes

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
          <Select value={days} onValueChange={(val) => setDays(val)}>
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


          <Button variant="outline" onClick={() => window.open(`http://localhost:5000/api/reports/export?days=${days}`)}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>

        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, index) => {
          const Icon = iconMap[kpi.icon] || DollarSign;
          return (
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
                      <span
                        className={`text-sm ${kpi.trend === "up" ? "text-success" : "text-destructive"
                          }`}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        {/* ---- Overview ---- */}
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
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
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

        {/* ---- Courses ---- */}
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

        {/* ---- Students ---- */}
        <TabsContent value="students" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">New Students</p>
                  <p className="text-3xl font-bold">1,847</p>
                  <Badge variant="outline" className="mt-2">
                    +12% this month
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-3xl font-bold">2,234</p>
                  <Badge variant="outline" className="mt-2">
                    +8% this month
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                  <p className="text-3xl font-bold">87%</p>
                  <Badge variant="outline" className="mt-2">
                    +3% this month
                  </Badge>
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

        {/* ---- Revenue ---- */}
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
                  <Bar
                    dataKey="revenue"
                    fill="hsl(var(--primary))"
                    name="Actual Revenue"
                  />
                  <Bar
                    dataKey="target"
                    fill="hsl(var(--muted))"
                    name="Target Revenue"
                  />
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
      <span className="font-bold">
        ${ (revenueBreakdown.courseSales ?? 0).toLocaleString() }
      </span>
    </div>
    <div className="flex justify-between items-center">
      <span>Subscriptions</span>
      <span className="font-bold">
        ${ (revenueBreakdown.subscriptions ?? 0).toLocaleString() }
      </span>
    </div>
    <div className="flex justify-between items-center">
      <span>Certifications</span>
      <span className="font-bold">
        ${ (revenueBreakdown.certifications ?? 0).toLocaleString() }
      </span>
    </div>
    <div className="flex justify-between items-center border-t pt-2">
      <span className="font-bold">Total</span>
      <span className="font-bold text-primary">
        ${ (revenueBreakdown.total ?? 0).toLocaleString() }
      </span>
    </div>
  </CardContent>
</Card>


            <Card>
              <CardHeader>
                <CardTitle>Top Revenue Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topCourses.map((course, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{course.course}</span>
                    <Badge variant="outline">
                      ${course.revenue.toLocaleString()}
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
