
import { Bell, Home, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/",
    },
    {
      title: "Add Endpoint",
      icon: <Plus className="h-5 w-5" />,
      href: "/add-endpoint",
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      href: "/notifications",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform md:static",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-6 w-6 rounded-full bg-primary"></div>
          <span>WatchTower</span>
        </div>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-secondary",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground"
                  )
                }
              >
                {item.icon}
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            A
          </div>
          <div className="text-sm">
            <div className="font-medium">Admin User</div>
            <div className="text-xs text-muted-foreground">admin@example.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
