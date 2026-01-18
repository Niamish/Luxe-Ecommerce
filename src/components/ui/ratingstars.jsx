import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const RatingStars = ({ rating, size = 'sm', interactive = false, onRate = () => {} }) => {
    // 1. Call the useTheme hook to get the theme object 't'
    const { t } = useTheme();

    const [hoverRating, setHoverRating] = useState(0);
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => interactive && onRate(i + 1)}
            onMouseEnter={() => interactive && setHoverRating(i + 1)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
            className={interactive ? 'cursor-pointer' : 'cursor-default'}
          >
            <Star
              className={`${sizes[size]} fill-current transition-colors`}
              // 2. Now 't' is defined and can be used for styling.
              style={{ 
                color: i < (hoverRating || Math.floor(rating)) 
                  ? t.warning 
                  : t.textMuted 
              }}
            />
          </button>
        ))}
      </div>
    );
  };

export default RatingStars;
