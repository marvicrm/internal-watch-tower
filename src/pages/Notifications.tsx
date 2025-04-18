
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Bell, AlertTriangle, CheckCircle2 } from "lucide-react";

// Mock notifications data - this would come from your backend
const mockNotifications = [
  {
    id: 1,
    endpoint: "https://api.example.com/health",
    status: "down",
    message: "Endpoint is down",
    timestamp: "2024-04-18T10:30:00Z",
  },
  {
    id: 2,
    endpoint: "https://dashboard.example.com",
    status: "up",
    message: "Endpoint is back online",
    timestamp: "2024-04-18T09:15:00Z",
  },
  {
    id: 3,
    endpoint: "https://auth.example.com/status",
    status: "down",
    message: "Connection timeout",
    timestamp: "2024-04-18T08:45:00Z",
  },
];

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "up" | "down">("all");

  const filteredNotifications = mockNotifications.filter((notification) => {
    const matchesSearch = notification.endpoint
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || notification.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Monitor endpoint status notifications and alerts
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative md:w-80 lg:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notifications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as "all" | "up" | "down")}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="up">Online</SelectItem>
            <SelectItem value="down">Offline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Status</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  {notification.status === "down" ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {notification.endpoint}
                </TableCell>
                <TableCell>{notification.message}</TableCell>
                <TableCell className="text-right">
                  {new Date(notification.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Notifications;
