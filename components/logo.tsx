"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className, width = 180, height = 50 }: LogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until after mount
  if (!mounted) return null;

  const logoFilter = theme === 'dark' ? 'none' : 'invert(1)';

  return (
    <Link href="/" className={className}>
      <Image
        src="/images/logo-nobg.png"
        alt="YoloMatrix Logo"
        width={width}
        height={height}
        className="object-contain"
        style={{ filter: logoFilter }}
        priority
      />
    </Link>
  );
}
