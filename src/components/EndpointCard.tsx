
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Bell, Clock, Edit, ExternalLink, Trash } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

export interface Endpoint {
  id: string;
  url: string;
  name: string;
  status: "up" | "down" | "maintenance";
  responseTime: number;
  lastChecked: string;
  notifications: boolean;
  uptimePercent: number;
}

interface EndpointCardProps {
  endpoint: Endpoint;
  onDelete: (id: string) => void;
  onToggleNotifications: (id: string) => void;
}

const EndpointCard: FC<EndpointCardProps> = ({ endpoint, onDelete, onToggleNotifications }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
        return "bg-success text-success-foreground";
      case "down":
        return "bg-danger text-danger-foreground";
      case "maintenance":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.hostname}${parsedUrl.pathname}`;
    } catch (e) {
      return url;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full animate-pulse-status ${getStatusColor(endpoint.status)}`} />
            <CardTitle className="text-base font-medium">{endpoint.name}</CardTitle>
          </div>
          <Badge variant={endpoint.status === "up" ? "outline" : "destructive"}>
            {endpoint.status === "up" ? "Online" : endpoint.status === "down" ? "Offline" : "Maintenance"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            <a 
              href={endpoint.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="truncate hover:underline"
            >
              {formatUrl(endpoint.url)}
            </a>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Response: {endpoint.responseTime}ms</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bell className="h-4 w-4" />
            <div className="flex items-center gap-2">
              <span>Notifications:</span>
              <Switch 
                checked={endpoint.notifications} 
                onCheckedChange={() => onToggleNotifications(endpoint.id)}
                aria-label="Toggle notifications"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <div className="h-2.5 w-full bg-muted">
        <div 
          className="h-full bg-success" 
          style={{ width: `${endpoint.uptimePercent}%` }}
          aria-label={`${endpoint.uptimePercent}% uptime`}
        />
      </div>
      <CardFooter className="flex items-center justify-between border-t p-4 text-xs text-muted-foreground">
        <div>Last check: {new Date(endpoint.lastChecked).toLocaleString()}</div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <Link to={`/endpoint/${endpoint.id}`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Endpoint</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onDelete(endpoint.id)}
                >
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Endpoint</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EndpointCard;
