"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="pink" // 기본 테마를 pink로 설정!
      themes={["light", "dark", "pink", "system"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}