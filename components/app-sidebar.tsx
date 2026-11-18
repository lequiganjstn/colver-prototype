"use client"

import Link from "next/link"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent,
} from "@/components/ui/sidebar"
import { Stethoscope } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-12 data-[slot=sidebar-menu-button]:p-2!"
              render={<Link href="/dashboard" />}
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope aria-hidden="true" className="size-4" />
              </span>
              <span className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-semibold">Colver</span>
                <span className="text-xs text-muted-foreground">Care workspace</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={[{ title: "Patient records", url: "/dashboard", icon: <Stethoscope /> }]} />
      </SidebarContent>
    </Sidebar>
  )
}
