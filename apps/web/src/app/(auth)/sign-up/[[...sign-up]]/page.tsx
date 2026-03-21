"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { ShieldCheck, ArrowLeft, Sparkles } from "lucide-react";
import anime from "animejs";

export default function SignUpPage() {
  React.useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    tl.add({
      targets: '.anime-auth-card',
      scale: [0.95, 1],
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1200
    })
    .add({
      targets: '.anime-auth-nav',
      translateY: [-20, 0],
      opacity: [0, 1],
    }, '-=800')
    .add({
      targets: '.anime-auth-bg',
      opacity: [0, 1],
      duration: 2000
    }, '-=1500');
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0 anime-auth-bg opacity-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center px-6 md:px-12 justify-between anime-auth-nav opacity-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(255,70,37,0.3)] rotate-6 group-hover:rotate-0 transition-transform duration-500">
            <ShieldCheck className="size-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-0 leading-tight">
            <span className="text-2xl font-display font-black tracking-tight text-foreground whitespace-nowrap uppercase">Gig<span className="text-primary italic">Shield</span></span>
            <span className="text-[8px] font-bold tracking-[0.2em] text-muted-foreground uppercase opacity-60 whitespace-nowrap">Parametric Oracle</span>
          </div>
        </Link>
        
        <Link href="/" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portal
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-[440px] anime-auth-card opacity-0">
          <div className="mb-8 flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary">
              <Sparkles size={14} className="text-secondary animate-pulse" />
              <span>Node Initialization</span>
            </div>
            <h1 className="text-4xl font-display font-black tracking-tighter uppercase">Join the <span className="text-secondary italic">Network</span></h1>
            <p className="text-sm text-muted-foreground font-medium max-w-[280px]">
              Provision your auditor profile for the global safety net protocol.
            </p>
          </div>

          <div className="relative group">
            {/* Tactical Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-secondary/10 via-primary/5 to-secondary/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
            
            <SignUp 
              routing="path" 
              path="/sign-up" 
              signInUrl="/sign-in"
              forceRedirectUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "w-full m-0",
                }
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <div className="fixed bottom-8 left-0 right-0 text-center pointer-events-none anime-auth-nav opacity-0">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-30">
          Sync Status: Encrypted & Active (v2.4)
        </p>
      </div>
    </div>
  );
}
