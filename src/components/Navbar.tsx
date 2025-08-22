import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  'Web Development',
  'Data Science',
  'Digital Marketing',
  'Mobile Development',
  'UI/UX Design',
  'Business Analytics',
  'Artificial Intelligence',
  'Cybersecurity'
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">U</span>
            </div>
            <span className="text-xl font-bold text-foreground">upDate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border border-border shadow-lg z-50">
                {categories.map((category) => (
                  <DropdownMenuItem key={category} asChild>
                    <Link 
                      to={`/courses?category=${encodeURIComponent(category)}`}
                      className="w-full cursor-pointer hover:bg-accent"
                    >
                      {category}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/courses">
              <Button variant="ghost">All Courses</Button>
            </Link>

            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-64 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
             <Link to={"/adminsignin"}>
            <Button variant="outline">For Admin</Button>
            </Link>
             <Link to={"/Signin"}>
            <Button variant="outline">Sign In</Button>
            </Link>
            <Link to ={"/Signup"}>
            <Button variant="cta">Sign up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col space-y-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="justify-start">
                    Categories <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category} asChild>
                      <Link 
                        to={`/courses?category=${encodeURIComponent(category)}`}
                        className="w-full cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="justify-start w-full">All Courses</Button>
              </Link>
              
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="justify-start w-full">About</Button>
              </Link>
              
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="w-full">Sign In</Button>
                <Button variant="cta" className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};