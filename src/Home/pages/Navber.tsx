import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, User, ChevronDown, BookOpen, Code, Palette, TrendingUp, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { name: "Web Development", icon: Code, courses: 45 },
  { name: "Design", icon: Palette, courses: 32 },
  { name: "Business", icon: TrendingUp, courses: 28 },
  { name: "Marketing", icon: Globe, courses: 22 },
  { name: "Data Science", icon: Zap, courses: 18 },
];

const Navber = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/student/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/student/courses?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Categories */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-red-600">upDate</span>
                <p className="text-xs text-muted-foreground">Industry Oriented Learning</p>
              </div>
            </Link>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1 hover:bg-lms-red-light">
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2 bg-background border shadow-medium">
                {categories.map((category, index) => (
                  <DropdownMenuItem 
                    key={index} 
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-lms-red-light cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <category.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.courses} courses</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/student/courses">
              <Button variant="ghost" className="hover:bg-lms-red-light">
                All Courses
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full focus:ring-primary"
              />
            </form>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-4">
            <Link to="/student/myenrollments">
              <Button variant="ghost" className="hover:bg-lms-red-light">
                My Learning
              </Button>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-lms-red-light">
                  <User  className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background border shadow-medium">
                <DropdownMenuItem>
                  <Link to="/student/profile" className="w-full">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/student/certificate" className="w-full">
                    Certificates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
