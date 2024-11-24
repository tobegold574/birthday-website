"use client"

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg ${className}`}>
    {children}
  </div>
);

export default Card;