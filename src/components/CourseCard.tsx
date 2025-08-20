import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
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
}

export const CourseCard = ({
  id,
  title,
  instructor,
  rating,
  students,
  duration,
  price,
  originalPrice,
  image,
  category,
  level,
  isFree = false
}: CourseCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-card border-border overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {category}
        </Badge>
        
        {/* Level Badge */}
        <Badge 
          variant="secondary" 
          className={`absolute top-3 right-3 ${
            level === 'Beginner' ? 'bg-green-100 text-green-800' :
            level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}
        >
          {level}
        </Badge>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Play className="h-6 w-6 text-primary ml-1" />
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm">by {instructor}</p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span>({students.toLocaleString()})</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {students.toLocaleString()} students enrolled
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isFree ? (
            <span className="text-2xl font-bold text-green-600">Free</span>
          ) : ( 
            <>
              <span className="text-2xl font-bold text-foreground">₹{price}</span>
              {originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{originalPrice}</span>
                  <Badge variant="destructive" className="text-xs">
                    {discount}% OFF
                  </Badge>
                </>
              )}
            </>
          )}
        </div>
        
        <Link to={`/signin`}>
          <Button variant="cta" size="sm">
            <a href="/signin">
            {isFree ? 'Enroll Free' : 'Enroll Now'}
            </a>
            
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};