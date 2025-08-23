import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface CourseCardProps {
  // Original props (kept for compatibility)
  id?: string;
  title: string;
  instructor: string;
  rating?: number;
  students?: number;
  duration: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  isFree?: boolean;

  // Backend (MongoDB) props
  _id?: string;
  thumbnail?: string;       // e.g. "/uploads/abc.jpg"
  categories?: string[];    // array of category names
  capacity?: number;        // optional, if you want to show as students
}

export const CourseCard = ({
  id,
  _id,
  title,
  instructor,
  rating,
  students,
  duration,
  price,
  originalPrice,
  image,
  category,
  level = 'Beginner',
  isFree,
  thumbnail,
  categories = [],
  capacity,
}: CourseCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Prefer backend thumbnail; fall back to provided image prop
  const imageSrc = thumbnail ? `${API_BASE_URL}${thumbnail}` : image || '';

  // Prefer single string category; else first from categories[]
  const categoryLabel =
    category || (Array.isArray(categories) && categories.length > 0 ? categories[0] : 'General');

  // Determine free from price if not explicitly passed
  const computedIsFree = typeof isFree === 'boolean' ? isFree : Number(price) === 0;

  // Use backend capacity as students if students not provided
  const studentsCount = typeof students === 'number' ? students : (capacity ?? 0);
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-card border-border overflow-hidden">
      <div className="relative overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {categoryLabel}
        </Badge>

        {/* Level Badge */}
        <Badge
          variant="secondary"
          className={`absolute top-3 right-3 ${
            level === 'Beginner'
              ? 'bg-green-100 text-green-800'
              : level === 'Intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
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
            {/* Show rating block only if rating is available */}
            {typeof rating === 'number' ? (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span>({studentsCount.toLocaleString()})</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{studentsCount.toLocaleString()} enrolled</span>
              </div>
            )}

            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {studentsCount.toLocaleString()} students enrolled
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {computedIsFree ? (
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

        {/* Keep your existing enroll flow; change only the Link wrapper (no nested <a>) */}
        <Link to={`/signin`}>
          <Button variant="cta" size="sm">
                        {computedIsFree ? 'Enroll Free' : 'Enroll Now'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
