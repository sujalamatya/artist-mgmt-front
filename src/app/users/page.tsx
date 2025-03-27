"use client";
import { AppSidebar } from "@/components/common/app-sidebar";
import Navbar from "@/components/common/nav-bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AddUserSheet } from "@/components/users/add-user";
import UserTable from "@/components/users/user-table";
import { useState } from "react";

export default function Users() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserAdded = () => {
    setRefreshKey((prev) => prev + 1); // Increment key to trigger refresh
  };
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumb className="top-0">
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Users</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="px-4">
              <Navbar />
            </div>
          </header>
          <div className="w-full h-full gap-4 p-4 mt-10">
            <div className="flex justify-end">
              <AddUserSheet onUserAdded={handleUserAdded} />
            </div>
            <UserTable refreshKey={refreshKey} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
