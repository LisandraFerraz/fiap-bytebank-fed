// components/CustomLink.tsx
import { useRouter } from "next/router";
import React from "react";

type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const CustomLink = ({ href, children, className }: CustomLinkProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        router.push(href);
      });
    } else {
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
