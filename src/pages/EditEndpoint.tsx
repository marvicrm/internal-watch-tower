
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EndpointForm from "@/components/EndpointForm";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Endpoint } from "@/components/EndpointCard";

// Mock data - would come from API in real app
const mockEndpoints: Record<string, Endpoint> = {
  "1": {
    id: "1",
    url: "https://api.example.com/health",
    name: "Example API",
    status: "up",
    responseTime: 123,
    lastChecked: new Date().toISOString(),
    notifications: true,
    uptimePercent: 99.8,
  },
  "2": {
    id: "2",
    url: "https://dashboard.example.com",
    name: "Dashboard Service",
    status: "up",
    responseTime: 245,
    lastChecked: new Date().toISOString(),
    notifications: true,
    uptimePercent: 99.5,
  },
  "3": {
    id: "3",
    url: "https://auth.example.com/status",
    name: "Auth Service",
    status: "down",
    responseTime: 0,
    lastChecked: new Date().toISOString(),
    notifications: true,
    uptimePercent: 95.2,
  },
};

const EditEndpoint = () => {
  const { id } = useParams<{ id: string }>();
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching endpoint data - replace with actual API call when backend is connected
    const fetchEndpoint = () => {
      if (id && mockEndpoints[id]) {
        setEndpoint(mockEndpoints[id]);
      } else {
        toast({
          title: "Endpoint not found",
          description: "The endpoint you are trying to edit does not exist.",
          variant: "destructive",
        });
        navigate("/");
      }
      setIsLoading(false);
    };

    // Simulate API delay
    setTimeout(fetchEndpoint, 500);
  }, [id, navigate, toast]);

  const handleSubmit = (values: {
    name: string;
    url: string;
    checkInterval: number;
    notifications: boolean;
  }) => {
    setIsSubmitting(true);

    // Simulate updating an endpoint - replace with actual API call when backend is connected
    setTimeout(() => {
      toast({
        title: "Endpoint updated",
        description: `${values.name} has been updated.`,
      });
      
      setIsSubmitting(false);
      navigate("/");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading endpoint data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Endpoint</h1>
        <p className="text-muted-foreground">
          Update the details of your monitored endpoint
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Endpoint Details</CardTitle>
          <CardDescription>
            Modify the monitoring configuration for this endpoint
          </CardDescription>
        </CardHeader>
        <CardContent>
          {endpoint && (
            <EndpointForm 
              endpoint={endpoint} 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEndpoint;
