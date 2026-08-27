import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
  target?: string;
  rel?: string;
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  as = 'button',
  target,
  rel,
}: ButtonProps) {
  const baseClasses =
    'font-semibold rounded-lg transition-colors duration-300 inline-flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'bg-cosmic-violet hover:bg-cosmic-violet/80 text-cosmic-white',
    secondary: 'bg-cosmic-cyan hover:bg-cosmic-cyan/80 text-cosmic-black',
    outline: 'border border-cosmic-violet/50 hover:border-cosmic-violet text-cosmic-white',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      {as === 'a' && href ? (
        <a href={href} target={target} rel={rel} className={classes}>
          {children}
        </a>
      ) : (
        <button onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
