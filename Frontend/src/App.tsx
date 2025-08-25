import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import SignIn from "./pages/auth/SiginIn";
import SignUp from "./pages/auth/Signup";
import { AdminLayout } from "./Component/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Addcourses from "./pages/admin/Addcourses";
import Educator from "./pages/admin/Educator";
import Mycourses from "./pages/admin/Mycourses";
import StudentsEnrolled from "./pages/admin/StudentsEnrolled";
import ReportsAnalytics from "./pages/admin/ReportsAnalytics";
import Settings from "./pages/admin/Settings";
import HelpSupport from "./pages/admin/HelpSupport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/addcourses" element={<AdminLayout><Addcourses /></AdminLayout>} />
          <Route path="/admin/educator" element={<AdminLayout><Educator /></AdminLayout>} />
          <Route path="/admin/mycourses" element={<AdminLayout><Mycourses /></AdminLayout>} />
          <Route path="/admin/studentsenrolled" element={<AdminLayout><StudentsEnrolled /></AdminLayout>} />
          <Route path="/admin/reportsanalytics" element={<AdminLayout><ReportsAnalytics /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />
          <Route path="/admin/helpsupport" element={<AdminLayout><HelpSupport /></AdminLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
