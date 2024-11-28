"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { MusicContext } from '@/lib/MusicContext';

const WaveAnimation = () => {
  return (
      <div className="fixed bottom-0 left-0 w-full">
        <div className="flex justify-between items-end h-20 px-4 gap-1 pb-4">
          {Array.from({ length: 100 }, (_, i) => {
            return (
                <div
                    key={i}
                    className={`w-1 rounded-t-full bg-purple-400/50`}
                    style={{
                      height: `${Math.random() * 100}%`,
                      animation: `waveAnim ${Math.random() * 1 + 0.5}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 0.5}s`
                    }}
                />
            );
          })}
        </div>
      </div>
  );
};

const Music = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentMusic, setCurrentMusic] = useState('normal'); // 'normal' or 'wish'
  const audioRefs = useRef({
    normal: null,
    wish: null
  });

  useEffect(() => {
    // 初始化两个音频实例
    audioRefs.current.normal = new Audio('/Advertime.mp3');
    audioRefs.current.wish = new Audio('/Advertime.mp3'); // 替换为你的许愿音乐文件

    // 为两个音频实例都添加时间更新监听
    const handleTimeUpdate = () => {
      setCurrentTime(audioRefs.current[currentMusic].currentTime);
    };

    audioRefs.current.normal.addEventListener('timeupdate', handleTimeUpdate);
    audioRefs.current.wish.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      // 清理所有音频实例
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.removeEventListener('timeupdate', handleTimeUpdate);
        }
      });
    };
  }, [currentMusic]);

  const togglePlay = () => {
    const currentAudio = audioRefs.current[currentMusic];
    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 向上暴露控制方法
  const controls = {
    play: () => {
      const currentAudio = audioRefs.current[currentMusic];
      currentAudio.play();
      setIsPlaying(true);
    },
    pause: () => {
      const currentAudio = audioRefs.current[currentMusic];
      currentAudio.pause();
      setIsPlaying(false);
    },
    isPlaying,
    togglePlay,
    setIsVisible
  };

  return (
      <MusicContext.Provider value={controls}>
        <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="fixed bottom-28 left-4 bg-white rounded-lg shadow-lg p-4 z-50">
            <div className="flex items-center gap-4">
              <button
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div className="text-sm">
                <div className="font-semibold">
                  {currentMusic === 'normal' ? 'Advertime' : 'Birthday Wish'}
                </div>
                <div className="text-gray-500">BGM</div>
              </div>
            </div>
          </div>

          {isPlaying && <WaveAnimation />}
        </div>

        <style jsx global>{`
        @keyframes waveAnim {
          0%, 100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
      `}</style>
        {children}
      </MusicContext.Provider>
  );
};

export default Music;