"use client"

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './BirthdayCake.css';

const BirthdayCake = () => {
    const [isBlown, setIsBlown] = useState(false);
    const [isDimmed, setIsDimmed] = useState(false);
    const [isWishing, setIsWishing] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const [showWishText, setShowWishText] = useState(false);

    const triggerConfetti = () => {
        // 创建多彩的碎屑效果
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 100
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const handleWish = () => {
        setIsWishing(true);
        setIsDimmed(true);
        setShowWishText(true);

        // 开始10秒倒计时
        let timeLeft = 10;
        setCountdown(timeLeft);

        const timer = setInterval(() => {
            timeLeft -= 1;
            setCountdown(timeLeft);

            if (timeLeft === 0) {
                clearInterval(timer);
                setIsDimmed(false);
                setIsWishing(false);
                setShowWishText(false);
                setCountdown(null);
                triggerConfetti();

                // 吹灭蜡烛
                setIsBlown(true);
                setTimeout(() => {
                    setIsBlown(false);
                }, 3000);
            }
        }, 1000);
    };

    return (
        <div className={`cake-wrapper ${isDimmed ? 'dimmed' : ''}`}>
            <div className="cake-container">
                <div className={`cake ${isBlown ? 'blown' : ''}`}>
                    <div className="velas">
                        <div className="fuego"></div>
                        <div className="fuego"></div>
                        <div className="fuego"></div>
                        <div className="fuego"></div>
                        <div className="fuego"></div>
                    </div>
                    <div className="cobertura"></div>
                    <div className="bizcocho"></div>
                </div>
            </div>

            {countdown && (
                <div className="countdown">
                    {countdown}
                </div>
            )}

            <div className={`wish-text ${showWishText ? 'show' : ''}`}>
                闭上眼睛，许下你的生日愿望...
                <br />
                愿你所求皆如愿，所想皆成真。
            </div>

            <button
                className="wish-button"
                onClick={handleWish}
                disabled={isWishing}
            >
                {isWishing ? '许愿中...' : '许下生日愿望'}
            </button>
        </div>
    );
};

export default BirthdayCake;