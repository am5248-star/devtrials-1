"use client";

import React, { useEffect, useState } from "react";
import StatsCard from "@/components/StatsCard";
import TriggerTable from "@/components/TriggerTable";
import { fetchTriggers, fetchZones, checkHealth, Trigger, Zone } from "@/lib/api";
import { RefreshCcw, Activity as ActivityIcon, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [health, setHealth] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  async function init() {
    setLoading(true);
    try {
      // Trigger a poll to get latest weather data from APIs (including AccuWeather)
      const { manualPoll } = await import("@/lib/api");
      try {
        await manualPoll();
      } catch (pollErr) {
        console.warn("Manual poll failed, using existing cache", pollErr);
      }

      const [t, z, h] = await Promise.all([fetchTriggers(), fetchZones(), checkHealth()]);
      setTriggers(t);
      setZones(z);
      setHealth(h);
    } catch (err) {
      console.error("Data fetch error", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="flex flex-col gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-10 bg-gradient-to-r from-primary to-transparent rounded-full" />
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground opacity-60">GigShield Protocol v2.4</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-black tracking-tight text-foreground uppercase leading-[0.85]">
            Live <br /> <span className="text-secondary italic">Monitoring</span>
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground leading-relaxed font-medium">
            Real-time monitoring of weather and air quality triggers protecting India&apos;s gig economy across all metropolitan clusters.
          </p>
        </div>
        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl glass">
            <div className={`size-2.5 rounded-full ${health ? 'bg-success neon-success animate-pulse' : 'bg-warning'}`} />
            <span className="text-[11px] font-bold uppercase tracking-wider">{health ? 'Operational' : 'Disconnected'}</span>
          </div>
          <Button
            onClick={init}
            size="lg"
            className="rounded-xl bg-secondary text-white font-bold uppercase h-12 px-8 text-sm shadow-[0_0_20px_rgba(0,216,255,0.2)] hover:scale-105 active:scale-95 transition-all w-full md:w-auto group border-none"
          >
            <RefreshCcw className={loading ? "animate-spin mr-2" : "mr-2 group-hover:rotate-180 transition-transform duration-500"} size={18} />
            Synchronize
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Active Alerts"
          value={triggers.filter(t => t.status === "ACTIVE").length}
          icon="zap"
          status={health ? "active" : "danger"}
          subtitle="Real-time trigger pipeline"
        />
        <StatsCard
          title="Protected Hubs"
          value={zones.length}
          icon="map"
          subtitle="Indian Metropolitan Coverage"
        />
        <StatsCard
          title="Yield Index"
          value="1.24x"
          icon="trend"
          subtitle="Current Payout Velocity"
        />
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-display font-black text-foreground tracking-tight uppercase">Activity Stream</h2>
            <div className="h-2 w-16 bg-primary rounded-full" />
          </div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary transition-colors flex items-center gap-1.5 group">
            View Analytics
            <ArrowUpRight className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="rounded-2xl glass card-glow overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <TriggerTable triggers={triggers} loading={loading} />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-2xl glass card-glow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <ShieldCheck className="size-20 text-primary" />
          </div>
          <div className="relative z-10 space-y-4">
            <h4 className="text-3xl font-display font-black tracking-tight uppercase">Immutable Logging</h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Every environmental trigger is hashed and stored in our distributed ledger, ensuring total transparency between platforms and gig workers.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary">
              Verification Verified
              <div className="size-2 bg-primary rounded-full" />
            </div>
          </div>
        </div>

        <div className="p-8 rounded-2xl glass card-glow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <ActivityIcon className="size-20 text-secondary" />
          </div>
          <div className="relative z-10 space-y-4">
            <h4 className="text-3xl font-display font-black tracking-tight uppercase">Health Metrics</h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Global monitoring nodes are operating within normal latency thresholds. Data ingestion pipeline v4.0 is active across all regions.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-secondary">
              Latency: 24ms
              <div className="size-2 bg-secondary rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
