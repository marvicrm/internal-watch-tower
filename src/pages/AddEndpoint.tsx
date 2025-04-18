
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import EndpointForm from "@/components/EndpointForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AddEndpoint = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (values: {
    name: string;
    url: string;
    checkInterval: number;
    emailRecipients: string[];
    notifications: boolean;
  }) => {
    setIsSubmitting(true);

    // Simulate adding an endpoint - replace with actual API call when backend is connected
    setTimeout(() => {
      toast({
        title: "Endpoint added",
        description: `${values.name} has been added to monitoring.`,
      });
      
      setIsSubmitting(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Add Endpoint</h1>
        <p className="text-muted-foreground">
          Add a new service endpoint to monitor
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Endpoint Details</CardTitle>
          <CardDescription>
            Enter the details of the service you want to monitor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EndpointForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEndpoint;
