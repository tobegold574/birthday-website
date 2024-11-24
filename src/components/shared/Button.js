"use client"

const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const baseStyles = "px-4 py-2 rounded-full transition-all duration-300";
  const variants = {
    primary: "bg-purple-500 text-white hover:bg-purple-600",
    secondary: "bg-white/50 hover:bg-purple-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;