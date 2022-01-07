import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { useState } from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({
  children,
}: DashboardLayoutProps): React.ReactElement => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-5 w-full max-w-9xl mx-auto">
            <div>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export { DashboardLayout };
