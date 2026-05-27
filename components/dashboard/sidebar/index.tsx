"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import AtomIcon from "@/components/icons/atom";
import BracketsIcon from "@/components/icons/brackets";
import ProcessorIcon from "@/components/icons/proccesor";
import CuteRobotIcon from "@/components/icons/cute-robot";
import EmailIcon from "@/components/icons/email";
import GearIcon from "@/components/icons/gear";
import MonkeyIcon from "@/components/icons/monkey";
import DotsVerticalIcon from "@/components/icons/dots-vertical";
import ArrowLeftIcon from "@/components/icons/arrow-left";
import { Bullet } from "@/components/ui/bullet";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const getNavData = (currentPath: string) => ({
  navMain: [
    {
      title: "Tools",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: BracketsIcon,
          isActive: currentPath === "/",
        },
        {
					title: "Accounts",
					url: "/accounts",
					icon: CuteRobotIcon,
					isActive: currentPath === "/accounts",
        },
        {
          title: "Journal",
          url: "/journal",
          icon: AtomIcon,
          isActive: currentPath === "/journal",
        },
        {
          title: "Trading Plan",
          url: "/trading-plan",
          icon: ProcessorIcon,
          isActive: currentPath === "/trading-plan",
        },
      ],
    },
  ],
  desktop: {
    title: "Desktop (Online)",
    status: "online",
  },
  user: {
    name: "over-geek",
    email: "kagyare100@gmail.com",
    avatar: "/avatars/user_krimson.png",
  },
});

export function DashboardSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, state } = useSidebar();
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    // Set initial path
    setCurrentPath(window.location.pathname);

    // Listen for page changes
    const handlePageChange = (event: any) => {
      setCurrentPath(event.detail);
    };

    window.addEventListener('page-changed', handlePageChange);

    return () => {
      window.removeEventListener('page-changed', handlePageChange);
    };
  }, []);

  const data = getNavData(currentPath);

  return (
    <Sidebar {...props} className={cn("", className)} collapsible="icon">
      <div className="py-sides h-full flex flex-col justify-between px-2 group-data-[collapsible=icon]:px-1">
        <SidebarHeader className="ring-2 ring-sidebar-foreground/[0.08] bg-dark rounded-t-lg flex gap-3 flex-row rounded-b-none relative group-data-[collapsible=icon]:justify-center">
          <div className="flex overflow-clip size-12 shrink-0 items-center justify-center rounded bg-sidebar-primary-foreground/10 transition-colors group-hover:bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:size-8">
            <MonkeyIcon className="size-10 group-hover:scale-[1.7] origin-top-left transition-transform group-data-[collapsible=icon]:size-6" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-2xl font-display">TradeVault</span>
            <span className="text-xs uppercase">Plan, Trade, Succeed</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute -right-3 top-1/2 -translate-y-1/2 size-6 bg-sidebar-border hover:bg-sidebar-accent rounded-full shadow-sm z-10"
          >
            <ArrowLeftIcon 
              className={cn(
                "size-3 transition-transform duration-200",
                state === "collapsed" && "rotate-180"
              )}
            />
          </Button>
        </SidebarHeader>
        <SidebarContent>
          {data.navMain.map((group, i) => (
            <SidebarGroup
              className={cn(i === 0 && "rounded-t-none")}
              key={group.title}
            >
              <SidebarGroupLabel>
                <Bullet className="mr-2" />
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        isActive={item.isActive} 
                        tooltip={item.title}
                        onClick={() => {
                          // We'll import and use navigation here
                          if (typeof window !== 'undefined') {
                            const event = new CustomEvent('navigate', { detail: item.url });
                            window.dispatchEvent(event);
                          }
                        }}
                      >
                        <item.icon className="size-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter className="p-0">
          <SidebarGroup>
            <SidebarGroupLabel>
              <Bullet className="mr-2" />
              User
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Popover>
                    <PopoverTrigger className="flex gap-0.5 w-full group cursor-pointer group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
                      <div className="shrink-0 flex size-14 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground overflow-clip group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:rounded-md">
                        <Image
                          src={data.user.avatar}
                          alt={data.user.name}
                          width={120}
                          height={120}
                        />
                      </div>
                      <div className="group/item pl-3 pr-1.5 pt-2 pb-1.5 flex-1 flex bg-sidebar-accent hover:bg-sidebar-accent-active/75 items-center rounded group-data-[state=open]:bg-sidebar-accent-active group-data-[state=open]:hover:bg-sidebar-accent-active group-data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden">
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate text-xl font-display">
                            {data.user.name}
                          </span>
                          <span className="truncate text-xs uppercase opacity-50 group-hover/item:opacity-100">
                            {data.user.email}
                          </span>
                        </div>
                        <DotsVerticalIcon className="ml-auto size-4" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-56 p-0"
                      side={state === "collapsed" ? "right" : "bottom"}
                      align={state === "collapsed" ? "start" : "end"}
                      sideOffset={4}
                    >
                      <div className="flex flex-col">
                        <button className="flex items-center px-4 py-2 text-sm hover:bg-accent">
                          <MonkeyIcon className="mr-2 h-4 w-4" />
                          Account
                        </button>
                        <button className="flex items-center px-4 py-2 text-sm hover:bg-accent">
                          <GearIcon className="mr-2 h-4 w-4" />
                          Settings
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
