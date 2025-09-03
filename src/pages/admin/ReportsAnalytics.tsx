import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Users, BookOpen, DollarSign, Clock, Download, Calendar } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/analytics"; // ✅ backend route

interface KpiCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  color: string;
}
interface EnrollmentData { month: string; enrollments: number; revenue: number; }
interface CoursePerformanceData { course: string; enrollments: number; completion: number; rating: number; }
interface CategoryData { name: string; value: number; color: string; }
interface UserActivityData { time: string; active: number; }
interface RevenueData { month: string; revenue: number; target: number; }
interface StudentAnalyticsData { newStudents: number; activeStudents: number; retentionRate: number; }

const ReportsAnalytics = () => {
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData[]>([]);
  const [coursePerformanceData, setCoursePerformanceData] = useState<CoursePerformanceData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [userActivityData, setUserActivityData] = useState<UserActivityData[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [kpiCards, setKpiCards] = useState<KpiCard[]>([]);
  const [studentAnalytics, setStudentAnalytics] = useState<StudentAnalyticsData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDays, setFilterDays] = useState("30");
  const [revenueBreakdown, setRevenueBreakdown] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [topCourses, setTopCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/top-revenue-courses");
        setTopCourses(res.data);
      } catch (err) {
        console.error("Error fetching top courses:", err);
      }
    };
    fetchTopCourses();
  }, []);


  useEffect(() => {
    const fetchRevenueBreakdown = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/revenue-breakdown");
        setRevenueBreakdown(res.data.breakdown);
        setTotalRevenue(res.data.total);
      } catch (err) {
        console.error("Error fetching revenue breakdown:", err);
      }
    };
    fetchRevenueBreakdown();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [enrollments, coursePerformance, categories, userActivity, revenue, kpis, students] =
          await Promise.all([
            axios.get(`${API}/enrollments`).then(res => res.data),
            axios.get(`${API}/course-performance`).then(res => res.data),
            axios.get(`${API}/categories`).then(res => res.data),
            axios.get(`${API}/user-activity`).then(res => res.data),
            axios.get(`${API}/revenue`).then(res => res.data),
            axios.get(`${API}/kpis`).then(res => res.data),
            axios.get(`${API}/students?days=${filterDays}`).then(res => res.data),
          ]);
        setEnrollmentData(enrollments);
        setCoursePerformanceData(coursePerformance);
        setCategoryData(categories);
        setUserActivityData(userActivity);
        setRevenueData(revenue);
        setKpiCards(kpis);
        setStudentAnalytics(students);
      } catch (err) {
        setError("Failed to fetch analytics data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filterDays]);

  const iconMap: { [key: string]: React.ElementType } = { DollarSign, Users, BookOpen, Clock };

  if (loading) return <div className="text-center py-10">Loading analytics data...</div>;
  if (error) return <div className="text-center py-10 text-destructive">Error: {error}</div>;

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
          <Select value={filterDays} onValueChange={(value) => setFilterDays(value)}>
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

          <Button variant="outline" onClick={() => {
            window.open("http://localhost:5000/api/analytics/export-report", "_blank");
          }}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>


        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((kpi, index) => {
          const IconComponent = iconMap[kpi.icon];
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
                      <span className={`text-sm ${kpi.trend === "up" ? "text-success" : "text-destructive"}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  {IconComponent && <IconComponent className={`h-8 w-8 ${kpi.color}`} />}
                </div>
              </CardContent>
            </Card>
          );
        })}
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
                  <p className="text-3xl font-bold">{studentAnalytics?.newStudents.toLocaleString()}</p>
                  <Badge variant="outline" className="mt-2">+12% this month</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-3xl font-bold">{studentAnalytics?.activeStudents.toLocaleString()}</p>
                  <Badge variant="outline" className="mt-2">+8% this month</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                  <p className="text-3xl font-bold">{studentAnalytics?.retentionRate}%</p>
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
                {revenueBreakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item._id || "Uncategorized"}</span>
                    <span className="font-bold">${item.totalRevenue.toLocaleString()}</span>
                  </div>
                ))}

                <div className="flex justify-between items-center border-t pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">${totalRevenue.toLocaleString()}</span>
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
                    <span className="text-sm">{course.title}</span>
                    <Badge variant="outline">
                      ${course.totalRevenue.toLocaleString()}
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