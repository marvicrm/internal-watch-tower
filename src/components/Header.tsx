
import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex-1">
        <h1 className="text-xl font-bold">WatchTower</h1>
      </div>
      <div className="relative hidden md:flex md:w-80 lg:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search endpoints..."
          className="w-full rounded-lg bg-background pl-8 md:w-80 lg:w-96"
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-danger" />
        <span className="sr-only">Notifications</span>
      </Button>
      <Button variant="outline" size="icon" aria-label="User account">
        <User className="h-5 w-5" />
        <span className="sr-only">Account</span>
      </Button>
    </header>
  );
};

export default Header;
