import { Button } from '@/components/ui/button';
import { Search, Play, Users, Star } from 'lucide-react';
import heroImage from '@/assets/hero-learning.jpg';

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-accent/20 to-background py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Learn. Grow.{' '}
                <span className="text-primary">Succeed.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Industry-oriented learning platform designed to boost your career with real-world skills and expert-led courses.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">50k+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">4.8 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">1000+ Courses</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              <Button variant="hero" size="lg" className="text-lg px-8 py-3">
                <a href="/signin">Start Learning Today</a>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                 <a href="/signin">Browse Courses</a>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Students learning online"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-4 -left-4 bg-background rounded-xl p-4 shadow-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">50,000+</p>
                  <p className="text-sm text-muted-foreground">Active Learners</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-background rounded-xl p-4 shadow-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">4.8/5</p>
                  <p className="text-sm text-muted-foreground">Course Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};