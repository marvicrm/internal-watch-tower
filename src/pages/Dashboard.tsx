
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EndpointCard, { Endpoint } from "@/components/EndpointCard";
import UptimeChart from "@/components/UptimeChart";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data for initial endpoints
const mockEndpoints: Endpoint[] = [
  {
    id: "1",
    url: "https://api.example.com/health",
    name: "Example API",
    status: "up",
    responseTime: 123,
    lastChecked: new Date().toISOString(),
    notifications: true,
    uptimePercent: 99.8,
  },
  {
    id: "2",
    url: "https://dashboard.example.com",
    name: "Dashboard Service",
    status: "up",
    responseTime: 245,
    lastChecked: new Date().toISOString(),
    notifications: true,
    uptimePercent: 99.5,
  },
  {
    id: "3",
    url: "https://auth.example.com/status",
    name: "Auth Service",
    status: "down",
    responseTime: 0,
    lastChecked: new Date().toISOString(),
    notifications: true,
    uptimePercent: 95.2,
  },
  {
    id: "4",
    url: "https://storage.example.com/health",
    name: "Storage Service",
    status: "maintenance",
    responseTime: 350,
    lastChecked: new Date().toISOString(),
    notifications: false,
    uptimePercent: 98.1,
  },
];

const Dashboard = () => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(mockEndpoints);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "up" | "down" | "maintenance">("all");
  const [deletingEndpointId, setDeletingEndpointId] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(endpoints[0]);
  const { toast } = useToast();

  const handleDeleteEndpoint = (id: string) => {
    setDeletingEndpointId(id);
  };

  const confirmDelete = () => {
    if (deletingEndpointId) {
      const newEndpoints = endpoints.filter((e) => e.id !== deletingEndpointId);
      setEndpoints(newEndpoints);
      
      // If the deleted endpoint was selected for the chart, reset selection
      if (selectedEndpoint?.id === deletingEndpointId) {
        setSelectedEndpoint(newEndpoints[0] || null);
      }
      
      toast({
        title: "Endpoint deleted",
        description: "The endpoint was successfully removed from monitoring.",
      });
      
      setDeletingEndpointId(null);
    }
  };

  const handleToggleNotifications = (id: string) => {
    setEndpoints(
      endpoints.map((endpoint) =>
        endpoint.id === id
          ? { ...endpoint, notifications: !endpoint.notifications }
          : endpoint
      )
    );
    
    const endpoint = endpoints.find((e) => e.id === id);
    const newState = !endpoint?.notifications;
    
    toast({
      title: `Notifications ${newState ? "enabled" : "disabled"}`,
      description: `Email alerts ${newState ? "will now be sent" : "have been turned off"} for ${endpoint?.name}.`,
    });
  };

  const filteredEndpoints = endpoints.filter((endpoint) => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          endpoint.url.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || endpoint.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage your service endpoints
          </p>
        </div>
        <Button asChild>
          <Link to="/add-endpoint">
            <Plus className="mr-2 h-4 w-4" />
            Add Endpoint
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative md:w-80 lg:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search endpoints..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as "all" | "up" | "down" | "maintenance")}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="up">Online</SelectItem>
            <SelectItem value="down">Offline</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredEndpoints.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEndpoints.map((endpoint) => (
              <EndpointCard
                key={endpoint.id}
                endpoint={endpoint}
                onDelete={handleDeleteEndpoint}
                onToggleNotifications={handleToggleNotifications}
              />
            ))}
          </div>
          
          {selectedEndpoint && (
            <UptimeChart 
              endpointId={selectedEndpoint.id} 
              endpointName={selectedEndpoint.name} 
            />
          )}
        </>
      ) : (
        <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No endpoints found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter to find what you're looking for."
              : "Get started by adding your first endpoint to monitor."}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <Button asChild>
              <Link to="/add-endpoint">
                <Plus className="mr-2 h-4 w-4" />
                Add Endpoint
              </Link>
            </Button>
          )}
        </div>
      )}
      
      <DeleteConfirmDialog
        isOpen={!!deletingEndpointId}
        onClose={() => setDeletingEndpointId(null)}
        onConfirm={confirmDelete}
        title="Delete Endpoint"
        description="Are you sure you want to delete this endpoint? This action cannot be undone."
      />
    </div>
  );
};

export default Dashboard;
