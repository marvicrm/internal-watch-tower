
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

interface UptimeChartProps {
  endpointId: string;
  endpointName: string;
}

// Mock data for chart
const generateMockData = (days: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate random uptime between 95-100% for most days, and occasional dips
    let uptime = Math.random() > 0.1 ? 
      Math.floor(Math.random() * (100 - 98) + 98) : 
      Math.floor(Math.random() * (98 - 50) + 50);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      uptime: uptime,
      responseTime: Math.floor(Math.random() * 400) + 100,
    });
  }
  
  return data;
};

const UptimeChart = ({ endpointId, endpointName }: UptimeChartProps) => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d">("7d");
  const data = timeRange === "7d" ? generateMockData(7) : generateMockData(30);

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Uptime History: {endpointName}</CardTitle>
        <Tabs defaultValue="7d" value={timeRange} onValueChange={(value) => setTimeRange(value as "7d" | "30d")}>
          <TabsList className="grid w-[180px] grid-cols-2">
            <TabsTrigger value="7d">Last 7 Days</TabsTrigger>
            <TabsTrigger value="30d">Last 30 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              unit="%"
            />
            <RechartsTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {label}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Uptime
                          </span>
                          <span className="font-bold">
                            {payload[0].value}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="uptime"
              stroke="hsl(142, 76%, 36%)"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UptimeChart;
