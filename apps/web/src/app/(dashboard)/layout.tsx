"use client";

import { AppHeader } from "@/components/app-header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      <AppSidebar />
      <SidebarInset className={cn(
        "bg-background flex flex-col overflow-hidden relative transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isCollapsed ? "md:ml-0" : "md:ml-[16rem]" // Exact width of the sidebar
      )}>
        <AppHeader />
        <div className={cn(
          "flex-1 overflow-y-auto py-[clamp(2.5rem,8vh,5rem)] w-full flex flex-col gap-[clamp(2.5rem,6vh,4.5rem)] animate-in fade-in duration-1000",
          isCollapsed 
            ? "px-[clamp(1.5rem,6vw,6.5rem)] max-w-[1800px] mx-auto" 
            : "px-[clamp(1.5rem,4vw,4rem)]" // Slightly reduced padding when pushed
        )}>
          <div className={cn(
            "w-full transition-all duration-500 ease-out",
            !isCollapsed ? "scale-[0.99] origin-left" : "scale-100"
          )}>
            {children}
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
