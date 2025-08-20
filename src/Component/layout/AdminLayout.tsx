import { SidebarProvider } from "@/components/ui/sidebar";
import { Navber } from "./Navber";
import { AppSidebar } from "./AppSidebar";
import { Footer } from "./Footer";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navber />
          <main className="flex-1 p-6">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}