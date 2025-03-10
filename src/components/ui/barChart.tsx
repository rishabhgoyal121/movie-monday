"use client";

import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

// Define types for our data
interface ChartDataItem {
  month: string;
  desktop: number;
  avatar: string;
  initials: string;
}

// Extended data to include avatar information
const chartData: ChartDataItem[] = [
  {
    month: "January",
    desktop: 186,
    avatar: "https://github.com/shadcn.png",
    initials: "JA",
  },
  {
    month: "February",
    desktop: 305,
    avatar: "https://github.com/shadcn.png",
    initials: "FE",
  },
  {
    month: "March",
    desktop: 237,
    avatar: "https://github.com/shadcn.png",
    initials: "MA",
  },
  {
    month: "April",
    desktop: 73,
    avatar: "https://github.com/shadcn.png",
    initials: "AP",
  },
  {
    month: "May",
    desktop: 209,
    avatar: "https://github.com/shadcn.png",
    initials: "MY",
  },
  {
    month: "June",
    desktop: 214,
    avatar: "https://github.com/shadcn.png",
    initials: "JU",
  },
];

// Define types for custom tick props
interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

// Custom Y-Axis tick with Avatar
const CustomYAxisTick: React.FC<CustomYAxisTickProps> = ({
  x = 0,
  y = 0,
  payload,
}) => {
  if (!payload) return null;

  const data = chartData.find((item) => item.month === payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject width="40" height="40" x="-45" y="-20">
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={data?.avatar} alt={data?.month || ""} />
            <AvatarFallback>{data?.initials}</AvatarFallback>
          </Avatar>
        </div>
      </foreignObject>
    </g>
  );
};

// Define types for custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: ChartDataItem;
  }>;
}

// Custom tooltip component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm text-sm">
        <p className="font-medium">{`${payload[0].payload.month}`}</p>
        <p className="text-gray-600">{`Visitors: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const CustomBarChart: React.FC = () => {
  return (
    <Card className="w-full border-0">
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                left: 50,
                right: 30,
                top: 10,
                bottom: 5,
              }}
            >
              <XAxis type="number" dataKey="desktop" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tick={<CustomYAxisTick />}
                axisLine={false}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="desktop" fill="#e76e50" radius={5}>
                <LabelList dataKey="desktop" position="right" fill="#666" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomBarChart;
