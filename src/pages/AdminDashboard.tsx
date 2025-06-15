
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

interface TabConfig {
  value: string;
  label: string;
  component: React.ReactNode;
}

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('users');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const tabs: TabConfig[] = [
    { value: 'users', label: 'Users', component: <div>Users Content</div> },
    { value: 'settings', label: 'Settings', component: <div>Settings Content</div> },
    { value: 'analytics', label: 'Analytics', component: <div>Analytics Content</div> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header and Hamburger/Menu */}
      <header className="w-full border-b bg-background flex items-center px-4 py-2 md:px-6">
        <div className="grow flex items-center">
          <span className="text-xl font-bold">Admin Dashboard</span>
          {/* Mobile Hamburger Menu */}
          <div className="ml-auto flex md:hidden">
            <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                  <DrawerDescription>Navigate the dashboard</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col space-y-2">
                  {tabs.map(tab => (
                    <Button
                      key={tab.value}
                      variant="ghost"
                      onClick={() => {
                        setSelectedTab(tab.value);
                        setIsMenuOpen(false);
                      }}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
                <DrawerFooter>
                  <Button variant="outline" onClick={() => setIsMenuOpen(false)}>
                    Close
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        {/* Desktop Tabs - moved Tabs here */}
        <nav className="hidden md:block w-auto ml-6 flex-shrink-0">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex items-center">
              {/* TabsList with responsive gap and scroll */}
              <TabsList className="gap-1 overflow-x-auto max-w-full">
                {/* Render all tab triggers */}
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="min-w-[100px] md:min-w-[128px]"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {/* Desktop TabsContent */}
            <div>
              {tabs.map(tab => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="py-4"
                >
                  {/* Wrap tab content for responsiveness */}
                  <section className="w-full flex flex-col gap-6 lg:gap-8">
                    {tab.component}
                  </section>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </nav>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full px-2 sm:px-6 md:px-8 lg:px-16">
        {/* Mobile: Render current tab content only, full width, no Tabs */}
        <div className="block md:hidden pt-3">
          {/* Hamburger dropdown for mobile navigation */}
          <div className="mb-2">
            {/* Mobile tab selector */}
            <select
              className="block w-full px-3 py-2 rounded bg-muted text-foreground font-medium border border-input focus:ring-2 focus:ring-ring"
              value={selectedTab}
              onChange={e => setSelectedTab(e.target.value)}
            >
              {tabs.map(tab => (
                <option key={tab.value} value={tab.value}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
          <section className="w-full flex flex-col gap-4">
            {/* Responsive content for the selected tab */}
            {tabs.find(tab => tab.value === selectedTab)?.component}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
