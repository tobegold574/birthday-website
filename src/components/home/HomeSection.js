"use client"

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import Card from '../shared/Card';

const HomeSection = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 1000);
    setTimeout(() => setShowHearts(true), 2000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="transform hover:scale-105 transition-all duration-500">
        <div className={`text-center transition-opacity duration-1000 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold text-purple-800 mb-6">
            Happy 20th Birthday! 🎂
          </h1>
          <p className="text-xl text-purple-600 mb-8">
            愿你的20岁充满欢笑与美好
          </p>
        </div>

        <div className={`flex justify-center gap-4 transition-all duration-1000 ${showHearts ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`text-pink-500 w-8 h-8 animate-bounce`}
              style={{
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeSection;