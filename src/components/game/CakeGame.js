"use client"

import { useState, useEffect } from 'react';
import BirthdayLetter from "@/components/game/BithdayLetter";
// 速度等级提示组件
const SpeedAlert = ({ show }) => (
    <div
        className={`
      absolute top-4 left-1/2 -translate-x-1/2 z-10
      bg-[#E25E3E] text-white px-6 py-2 rounded-full
      transform transition-all duration-500
      ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
    `}
    >
      ⚡ 要加速了！
    </div>
);

// 游戏状态显示组件
const GameStatus = ({ score, level }) => (
    <div className="flex justify-between items-center mb-4">
      <div className="text-[#E25E3E]">
        得分: {score} / 30
      </div>
      <div className="text-[#FF9B50]">
        难度等级: {level}
      </div>
    </div>
);

const CakeGame = () => {
  const [position, setPosition] = useState(50);
  const [cakePosition, setCakePosition] = useState({ x: 50, y: 0 });
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showSpeedAlert, setShowSpeedAlert] = useState(false);

  // 根据分数计算当前速度等级
  const currentLevel = Math.floor(score / 10) + 1;

  useEffect(() => {
    if (!isPlaying) return;

    // 检查是否需要显示加速提示
    if (score > 0 && score % 10 === 9) {
      setShowSpeedAlert(true);
      setTimeout(() => setShowSpeedAlert(false), 2000);
    }

    // 根据得分调整速度
    const newSpeed = Math.min(1 + Math.floor(score / 10) * 0.5, 3);
    setSpeed(newSpeed);

    const gameLoop = setInterval(() => {
      setCakePosition(prev => ({
        ...prev,
        y: prev.y + newSpeed
      }));
    }, 20);

    return () => clearInterval(gameLoop);
  }, [isPlaying, score]);

  useEffect(() => {
    if (score >= 30) {
      setIsPlaying(false);
      setShowLetter(true);
    }

    if (cakePosition.y > 90) {
      const hitPosition = position;
      const cakeX = cakePosition.x;

      if (Math.abs(hitPosition - cakeX) < 15) {
        setScore(s => s + 1);
        setCakePosition({
          x: Math.random() * 90,
          y: 0
        });
      } else {
        setGameOver(true);
        setIsPlaying(false);
      }
    }
  }, [cakePosition, position, score]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setPosition(p => Math.max(0, p - 10));
    } else if (e.key === 'ArrowRight') {
      setPosition(p => Math.min(100, p + 10));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startGame = () => {
    setScore(0);
    setGameOver(false);
    setPosition(50);
    setCakePosition({ x: Math.random() * 90, y: 0 });
    setIsPlaying(true);
    setShowLetter(false);
    setSpeed(1);
    setShowSpeedAlert(false);
  };

  return (
      <div className="w-full max-w-lg mx-auto p-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg mt-20">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-[#E25E3E] mb-2">接住生日蛋糕</h2>
            <GameStatus score={score} level={currentLevel} />
          </div>

          {!isPlaying && (
              <button
                  onClick={startGame}
                  className="w-full mb-4 px-6 py-2 bg-[#FF9B50] text-white rounded-full hover:bg-[#E25E3E] transition-colors duration-300"
              >
                {gameOver ? '重新开始' : '开始游戏'}
              </button>
          )}

          <div className="relative w-full h-[400px] bg-[#FFF8F0] rounded-lg overflow-hidden">
            {/* 速度提示 */}
            <SpeedAlert show={showSpeedAlert} />

            {/* 蛋糕 */}
            <div
                className="absolute w-8 h-8 text-[#E25E3E]"
                style={{ left: `${cakePosition.x}%`, top: `${cakePosition.y}%` }}
            >
              🎂
            </div>

            {/* 接蛋糕的盘子 */}
            <div
                className="absolute bottom-0 w-32 h-4 bg-[#FF9B50] rounded-t-full"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            />
          </div>

          {gameOver && (
              <div className="text-center mt-4">
                <p className="text-xl text-[#E25E3E]">游戏结束!</p>
                <p className="text-lg text-[#FF9B50]">
                  你接住了 {score} 个蛋糕
                  {score > 0 && <span>，达到难度 {currentLevel} ！</span>}
                </p>
              </div>
          )}

          <p className="text-sm text-[#E25E3E] mt-4 text-center">
            使用键盘的左右箭头键移动盘子接住掉落的蛋糕
          </p>
        </div>

        {showLetter && (
            <BirthdayLetter
                score={score}
                onClose={() => setShowLetter(false)}
            />
        )}
      </div>
  );
};

export default CakeGame;