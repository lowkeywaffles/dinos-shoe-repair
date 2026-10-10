import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Libre_Franklin } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LangProvider } from "@/lib/i18n";
import strings from "@/content/strings.json";
import "./globals.css";

const f0 = Alfa_Slab_One({ variable: "--font-alfa", subsets: ["latin"], weight: "400" });
const f1 = Libre_Franklin({ variable: "--font-franklin", subsets: ["latin"] });

const EN = strings.en as Record<string, string>;
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%231f3a2e'/%3E%3Crect x='5' y='5' width='54' height='54' rx='10' fill='none' stroke='%23c9a24a' stroke-width='2'/%3E%3Ctext x='32' y='45' text-anchor='middle' font-family='Rockwell,Georgia' font-weight='900' font-size='34' fill='%23d4ad52'%3ED%3C/text%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: EN.title.replace(/&amp;/g, "&"),
  description: EN.desc,
  icons: { icon: ICON },
};
export const viewport: Viewport = { themeColor: "#1f3a2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${f0.variable} ${f1.variable}`}>
      <body className="min-h-dvh leading-relaxed">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
