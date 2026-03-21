"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Search,
  ChevronDown,
  Settings,
  User,
  Database,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0a0a12]/70 backdrop-blur-2xl px-6 md:px-10 transition-all">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-primary/10 transition-colors rounded-lg" />
        <Separator orientation="vertical" className="h-4 bg-white/[0.06] hidden md:block" />
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-subtle text-[10px] font-black uppercase tracking-[0.12em] border-none">
            <Globe className="size-3.5 text-secondary animate-pulse" />
            <span className="text-white">IND-MUM-04</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:bg-white/[0.03] p-2 rounded-lg transition-colors">
            <Database className="size-3.5 text-muted-foreground group-hover:text-secondary transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">Oracle Synced</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground group-focus-within:text-secondary transition-colors" />
          <input
            type="text"
            placeholder="Search Intelligence..."
            className="h-9 pl-9 pr-4 w-56 glass rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-secondary/30 focus:border-secondary/30 transition-all placeholder:text-muted-foreground/30"
          />
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="size-9 rounded-lg hover:bg-primary/10 hover:text-primary group">
            <Bell className="size-4 group-hover:animate-bounce" />
          </Button>
          <Button variant="ghost" size="icon" className="size-9 rounded-lg hover:bg-secondary/10 hover:text-secondary">
            <Settings className="size-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-5 bg-white/[0.06]" />

        <div className="flex items-center gap-3 pl-1 group cursor-pointer">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs font-display font-black text-foreground group-hover:text-secondary transition-colors uppercase">Arunavo Gupta</span>
            <span className="text-[8px] font-display font-black uppercase tracking-widest text-muted-foreground opacity-50">Senior Auditor</span>
          </div>
          <div className="size-9 rounded-xl bg-secondary p-[1.5px] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,183,255,0.2)]">
            <div className="size-full rounded-[10px] bg-card flex items-center justify-center">
              <User className="size-5 text-foreground" />
            </div>
          </div>
          <ChevronDown className="size-3.5 text-muted-foreground group-hover:text-secondary transition-all group-hover:translate-y-0.5" />
        </div>
      </div>
    </header>
  );
}
