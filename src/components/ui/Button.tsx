import React from "react";

export type ButtonVariant = "underline-link" | "square-outline";

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsAnchor = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsNative = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export type ButtonProps = ButtonAsAnchor | ButtonAsNative;

export default function Button({
  variant = "square-outline",
  children,
  className = "",
  ...props
}: ButtonProps) {
  if (variant === "underline-link") {
    // Shares the exact same vertical box metrics (py-4, leading-5, box-sizing) as square-outline.
    // The underline is anchored directly to the bottom edge of this box (bottom: 0).
    const linkClasses = `group relative inline-flex items-center text-xs sm:text-sm uppercase tracking-wider font-semibold text-brand-text leading-5 py-4 px-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand cursor-pointer select-none whitespace-nowrap ${className}`;

    const content = (
      <>
        <span>{children}</span>
        {/* Base underline: always visible at rest at the bottom edge (bottom: 0) */}
        <span
          className="absolute left-0 bottom-0 w-full h-px bg-brand-text/40 pointer-events-none"
          aria-hidden="true"
        />
        {/* Animated underline: redraws left-to-right on hover/focus (scaleX 0 to 1, origin-left, 0.4s strong ease-out) and exits right on leave */}
        <span
          className="absolute left-0 bottom-0 w-full h-[1.5px] bg-brand-text pointer-events-none scale-x-0 origin-right transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-hover:origin-left group-focus-visible:scale-x-100 group-focus-visible:origin-left motion-reduce:scale-x-100 motion-reduce:origin-left motion-reduce:transition-none"
          aria-hidden="true"
        />
      </>
    );

    if ("href" in props && props.href) {
      return (
        <a className={linkClasses} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      );
    }

    return (
      <button className={linkClasses} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {content}
      </button>
    );
  }

  // square-outline variant
  const squareClasses = `group relative inline-flex items-center justify-center overflow-hidden rounded-none border border-hairline bg-transparent px-8 py-4 text-xs sm:text-sm uppercase tracking-wider font-semibold text-ink leading-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer select-none whitespace-nowrap transition-colors duration-300 ${className}`;

  const squareContent = (
    <>
      {/* Brand Fill rising from bottom */}
      <span
        className="absolute inset-0 bg-brand translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none pointer-events-none"
        aria-hidden="true"
      />
      {/* Text turning dark on hover in both themes */}
      <span className="relative z-10 transition-colors duration-300 text-ink group-hover:text-[#070b08] group-focus-visible:text-[#070b08]">
        {children}
      </span>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <a className={squareClasses} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {squareContent}
      </a>
    );
  }

  return (
    <button className={squareClasses} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {squareContent}
    </button>
  );
}
