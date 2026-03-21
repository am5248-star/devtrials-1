import type { Metadata } from "next";
import { Inter, Nunito, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
const nunito = Nunito({ weight: ["400", "700", "900"], variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GigShield | Parametric Income Insurance",
  description: "Monitor disaster triggers and manage parametric insurance payouts for the gig economy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#ff4625",
          colorBackground: "#0a0a12",
          colorInputBackground: "#141421",
          colorInputText: "#ffffff",
          colorTextSecondary: "#94a3b8",
        },
        elements: {
          card: "rounded-3xl border border-white/5 shadow-2xl glass-strong",
          formButtonPrimary: "bg-primary hover:bg-primary/90 rounded-2xl h-12 uppercase tracking-widest font-black transition-all",
          headerTitle: "font-display font-black tracking-tight",
          socialButtonsBlockButton: "rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors h-12",
        }
      }}
    >
      <html lang="en" className={cn(inter.variable, jetbrainsMono.variable, nunito.variable, "dark", "scroll-smooth")}>
        <body className="antialiased min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
