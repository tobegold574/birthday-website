"use client"

import { Heart } from 'lucide-react';

const Footer = ({ isDimmed = false }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={`
        fixed bottom-0 left-0 right-0 
        py-4 px-6
        bg-gradient-to-t from-white/10 to-transparent
        backdrop-blur-sm
        transition-opacity duration-1000
        ${isDimmed ? 'opacity-0' : 'opacity-100'}
      `}
        >
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center text-sm text-[#E25E3E] gap-2">
                    <div className="flex items-center gap-1">
                        Made with
                        <Heart
                            className="w-4 h-4 text-[#FF9B50] animate-pulse"
                            fill="#FF9B50"
                        />
                        0kr
                    </div>
                    <span className="hidden md:inline mx-2">|</span>
                    <div>
                        Copyright © {currentYear} All Rights Reserved
                    </div>
                </div>

                <div className="mt-2 text-center text-xs text-[#E25E3E]/80">
                    Designed for My Dear Friend&apos;s 20th Birthday
                </div>
            </div>
        </footer>
    );
};

export default Footer;