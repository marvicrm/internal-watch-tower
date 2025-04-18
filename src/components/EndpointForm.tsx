
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Endpoint } from "./EndpointCard";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Must be a valid URL including http:// or https://"),
  checkInterval: z.coerce.number().int().min(1, "Must be at least 1 minute"),
  notifications: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface EndpointFormProps {
  endpoint?: Endpoint;
  onSubmit: (values: FormValues) => void;
  isSubmitting: boolean;
}

const EndpointForm = ({ endpoint, onSubmit, isSubmitting }: EndpointFormProps) => {
  const isEditing = !!endpoint;

  const defaultValues: Partial<FormValues> = {
    name: endpoint?.name || "",
    url: endpoint?.url || "",
    checkInterval: 5,
    notifications: endpoint?.notifications ?? true,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint Name</FormLabel>
              <FormControl>
                <Input placeholder="My API Service" {...field} />
              </FormControl>
              <FormDescription>
                A friendly name to identify this endpoint
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://api.example.com/health" {...field} />
              </FormControl>
              <FormDescription>
                The URL to monitor (including http:// or https://)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check Interval (minutes)</FormLabel>
              <FormControl>
                <Input type="number" min={1} {...field} />
              </FormControl>
              <FormDescription>
                How often to check this endpoint
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Email Notifications</FormLabel>
                <FormDescription>
                  Receive email alerts when this endpoint goes down
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? (isSubmitting ? "Saving..." : "Save Changes") : (isSubmitting ? "Adding..." : "Add Endpoint")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EndpointForm;
