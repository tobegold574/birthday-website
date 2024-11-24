"use client"

import Button from '../shared/Button';

const Navigation = ({ currentPage, setCurrentPage }) => {
    const pages = ['首页', '我们的故事', '留言墙', '小游戏', '生日蛋糕'];

    return (
    <div className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-sm shadow-md z-50">
      <nav className="flex justify-center gap-8 p-4">
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            variant={currentPage === page ? "primary" : "secondary"}
            className={currentPage === page ? "shadow-lg scale-105" : ""}
          >
            {page}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;