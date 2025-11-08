"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
  PawPrint,
  Stethoscope,
  Briefcase,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Pets",
    href: "/pet",
    icon: Heart,
  },
  {
    title: "Veterinários",
    href: "/veterinarian",
    icon: Stethoscope,
  },
  {
    title: "Serviços",
    href: "/service",
    icon: Briefcase,
  },
  {
    title: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({
  isCollapsed,
  onToggle,
  isMobile = false,
}: SidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <PawPrint className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Pet Impacta</span>
          </div>
        )}

        {isCollapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-pink-500">
            <PawPrint className="h-4 w-4 text-white" />
          </div>
        )}

        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Footer */}
      <div className="p-4">
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground">
            <p>© 2024 Pet Impacta</p>
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex h-full w-64 flex-col border-r bg-background">
        <SidebarContent />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent />
    </div>
  );
}
