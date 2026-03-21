"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight, Zap, ShieldCheck, MapPin, Wind, CloudRain, ThermometerSun, PlayCircle, Globe, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import anime from "animejs";
import dynamic from "next/dynamic";

// Dynamically import 3D component to ensure it only renders on client
const HeroShield = dynamic(() => import("@/components/HeroShield"), { ssr: false });

export default function HomePage() {
  React.useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    tl.add({
      targets: '.anime-hero-content > *',
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(150),
    })
    .add({
      targets: '.anime-hero-image',
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 1500,
    }, '-=800')
    .add({
      targets: '.anime-banner-item',
      translateX: [-20, 0],
      opacity: [0, 0.6],
      delay: anime.stagger(100),
    }, '-=1000')
    .add({
      targets: '.anime-feature-card',
      translateY: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'spring(1, 80, 10, 0)',
    }, '-=800')
    .add({
      targets: '.anime-stats-section',
      translateY: [30, 0],
      opacity: [0, 1],
    }, '-=500');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/6 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 glass-strong flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-[#ff8c00] flex items-center justify-center neon-primary">
            <Zap className="size-5 text-white fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-display font-black tracking-tight leading-none uppercase">GigShield</span>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-secondary opacity-80 mt-1">Parametric Oracle</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {["Protocols", "Ecosystem", "Governance", "Network"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button className="rounded-xl glass border border-white/10 px-6 font-bold uppercase text-[11px] h-10 hover:bg-primary hover:text-white hover:border-primary/50 hover:neon-primary transition-all">
              Access Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col pt-28 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto w-full gap-28 relative z-10">
        <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          <div className="space-y-10 z-10 anime-hero-content">
            <div className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-secondary opacity-0">
              <Sparkles size={14} className="text-secondary animate-pulse" />
              <span>Hyper-Local Protection Protocol</span>
            </div>

            <div className="space-y-4 opacity-0">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[110px] font-display font-black tracking-tight leading-[0.85] text-foreground uppercase">
                Shield the <br />
                <span className="text-primary italic">Driven.</span>
              </h1>
              <div className="h-2 w-32 bg-primary rounded-full" />
            </div>

            <p className="max-w-lg text-base text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-6 py-2 opacity-0">
              Autonomous safety nets for India&apos;s essential gig workforce.
              Real-time environmental synchronization providing <span className="text-foreground font-bold">instant payouts</span> during climate emergencies.
            </p>

            <div className="flex flex-wrap gap-5 pt-4 opacity-0">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold uppercase h-14 px-10 text-sm shadow-[0_0_20px_rgba(255,70,37,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group border-none">
                  Enter Console
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="rounded-2xl font-bold uppercase h-14 px-8 text-sm hover:bg-secondary/10 hover:text-secondary transition-all flex items-center gap-3 group">
                <div className="size-9 rounded-full glass flex items-center justify-center group-hover:neon-secondary transition-all">
                  <PlayCircle className="size-5 text-secondary fill-current" />
                </div>
                The Protocol
              </Button>
            </div>
          </div>

          <div className="relative group anime-hero-image opacity-0">
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
            <div className="relative overflow-visible">
              <div className="aspect-[4/5] relative">
                <HeroShield />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
              </div>

              {/* Floating tactical card */}

              {/* Floating tactical card */}
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl glass-strong flex items-center justify-between translate-y-3 group-hover:translate-y-0 transition-transform duration-700">
                <div className="space-y-1">
                  <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-[0.2em]">Payout Velocity</p>
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-bold text-foreground tabular-nums font-mono tracking-tighter">0.14s</p>
                    <div className="px-2 py-0.5 rounded-full bg-success/15 border border-success/20 text-[8px] font-bold text-success uppercase neon-success">Instant</div>
                  </div>
                </div>
                <div className="size-12 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
                  <ShieldCheck className="size-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Banner */}
        <section className="py-8 border-y border-white/5 flex flex-wrap gap-10 justify-between items-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
          {["AQI MONITORING", "PRECIPITATION ORACLE", "HEATWAVE PROTECTION", "SMART CONTRACT PAYOUTS"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 relative z-10 opacity-0 anime-banner-item hover:opacity-100 transition-opacity">
              <div className="size-1.5 bg-secondary rounded-full neon-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]">{item}</span>
            </div>
          ))}
        </section>

        {/* Feature Grid — Glassmorphism Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: CloudRain,
              title: "Precipitation",
              desc: "Hyper-local monitoring of rainfall intensity. Automatic indexing for high-volume precipitation events.",
              color: "bg-fs-blue",
              iconColor: "text-white",
            },
            {
              icon: Wind,
              title: "Pollution",
              desc: "Active intervention for hazardous air quality levels. Dynamic thresholds synchronized with national AQI feeds.",
              color: "bg-fs-purple",
              iconColor: "text-white",
            },
            {
              icon: ThermometerSun,
              title: "Thermal",
              desc: "Tactical heat-index monitoring. Integrated rest-period incentives during peak tropical heat events.",
              color: "bg-fs-yellow",
              iconColor: "text-white",
            }
          ].map((feature, i) => (
            <div key={feature.title} className="group p-8 rounded-3xl glass-subtle card-glow flex flex-col gap-6 hover:translate-y-[-4px] transition-all duration-300 anime-feature-card opacity-0">
              <div className={cn("size-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110", feature.color)}>
                <feature.icon className={cn("size-8", feature.iconColor)} strokeWidth={2.5} />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-display font-black tracking-tight text-foreground leading-none uppercase">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
              <div className="mt-auto pt-4">
                <div className="flex items-center gap-2 text-primary text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 duration-500">
                  Integrate Protocol <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* World Statistics */}
        <section className="p-14 rounded-3xl glass card-glow relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-14 group anime-stats-section opacity-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,70,37,0.08)_0%,transparent_40%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,216,255,0.05)_0%,transparent_40%)]" />
          <div className="space-y-6 relative z-10 lg:max-w-xl">
            <div className="flex items-center gap-3 text-secondary font-bold uppercase tracking-widest text-[11px]">
              <Globe className="size-4 animate-spin-slow" />
              Global Expansion Phase
            </div>
            <h2 className="text-6xl md:text-7xl font-display font-black tracking-tight leading-[0.9] uppercase">
              Covering the <br /> <span className="text-secondary italic">Global South</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              By EOFY 2026, GigShield will provide parametric protection to over 4 million gig workers across the African and South-Asian continents.
            </p>
            <Button className="h-12 px-8 rounded-xl bg-secondary text-white font-bold uppercase hover:scale-105 transition-all flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,216,255,0.2)] border-none">
              Explore Territories <MapPin size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
            {[
              { label: "Active Riders", val: "1.2M+" },
              { label: "Platform Nodes", val: "84" },
              { label: "Safety Payouts", val: "$4.1M" },
              { label: "Response Time", val: "2s" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl glass-subtle group-hover:border-secondary/30 transition-all duration-500">
                <p className="text-5xl font-display font-black text-foreground tabular-nums tracking-tight">{stat.val}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 flex flex-col gap-14 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(255,70,37,0.3)]">
                  <Zap className="size-5 text-white fill-current" />
                </div>
                <h4 className="text-3xl font-display font-black tracking-tight uppercase">GigShield</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The world&apos;s first decentralized parametric insurance oracle built specifically for the vulnerable gig-economy nodes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-14">
              {[
                { title: "Protocol", links: ["Documentation", "Audit", "GitHub", "Paper"] },
                { title: "Company", links: ["Ecosystem", "Founders", "Regions", "Careers"] },
                { title: "Legal", links: ["Privacy", "Standard", "AML", "Terms"] }
              ].map((section) => (
                <div key={section.title} className="space-y-4">
                  <h5 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground">{section.title}</h5>
                  <ul className="space-y-3">
                    {section.links.map(link => (
                      <li key={link}>
                        <Link href="#" className="text-xs text-muted-foreground hover:text-secondary transition-colors">{link}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-white/5 gap-6">
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-40">© 2026 GigShield Autonomous DAO. All Rights Reserved.</span>
            <div className="flex items-center gap-6">
              <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 glass rounded-full text-success border border-success/20 neon-success">Oracle Sync: Active</span>
              <div className="flex gap-5">
                <Globe className="size-4 text-muted-foreground hover:text-secondary transition-colors cursor-pointer" />
                <Zap className="size-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                <ShieldCheck className="size-4 text-muted-foreground hover:text-secondary transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
