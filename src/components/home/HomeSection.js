"use client"

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import Card from '../shared/Card';

const FallingRibbon = ({ delay, color }) => (
    <div
        className="absolute h-16 w-2 opacity-50 animate-fall"
        style={{
          backgroundColor: color,
          right: `${Math.random() * 100}%`,
          top: `-64px`,
          animationDelay: `${delay}s`,
          transform: 'rotate(-45deg)',
        }}
    />
);

const HomeSection = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const ribbonColors = ['#FF69B4', '#87CEEB', '#DDA0DD', '#98FB98', '#FFB6C1'];

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 1000);
    setTimeout(() => setShowHearts(true), 2000);
  }, []);

  return (
      <div className="relative overflow-hidden min-h-[80vh]">
        {/* Falling Ribbons */}
        <div className="absolute inset-0 z-0" style={{zIndex: 999}}>
          {[...Array(15)].map((_, i) => (
              <FallingRibbon
                  key={i}
                  delay={i * 0.5}
                  color={ribbonColors[i % ribbonColors.length]}
              />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          <Card className="transform hover:scale-105 transition-all duration-500 bg-opacity-90">
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
      </div>
  );
};

export default HomeSection;