import { Link as RouterLink } from "react-router-dom";
import { forwardRef } from "react";

interface OptimizedLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const OptimizedLink = forwardRef<HTMLAnchorElement, OptimizedLinkProps>(
  ({ to, className, children, style, ...props }, ref) => {
    return (
      <RouterLink
        ref={ref}
        to={to}
        className={className}
        style={{
          contentVisibility: 'auto',
          contain: 'layout style paint',
          ...style
        }}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);

OptimizedLink.displayName = 'OptimizedLink';

export default OptimizedLink; 