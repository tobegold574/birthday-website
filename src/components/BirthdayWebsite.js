"use client"

import { useState } from 'react';
import Navigation from './navigation/Navigation';
import HomeSection from './home/HomeSection';
import MessageWall from './messages/MessageWall';
import CakeGame from './game/CakeGame';
import VirtualCake from "@/components/cake/VirtualCake";
import TimelineWall from "@/components/timeline/Timeline";
import Footer from "@/components/shared/Footer";
import ContributePage from "@/app/contribute/page";

const BirthdayWebsite = () => {
    const [currentPage, setCurrentPage] = useState('首页');

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <div className="pt-20">
                {currentPage === '首页' && <HomeSection />}
                {currentPage === '留言墙' && <MessageWall />}
                {currentPage === '小游戏' && <CakeGame />}
                {currentPage === '我们的故事' && <TimelineWall />}
                {currentPage === '生日蛋糕' && <VirtualCake />}
                {currentPage === '送祝福' && <ContributePage />}
            </div>

            <Footer></Footer>
        </div>
    );
};

export default BirthdayWebsite;