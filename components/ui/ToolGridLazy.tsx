"use client";

import dynamic from "next/dynamic";

type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  popular: boolean;
  icon: string;
  status: string;
};

const ToolGrid = dynamic(
  () => import("@/components/ui/ToolGrid").then((m) => ({ default: m.ToolGrid })),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    ),
  }
);

export function ToolGridLazy({ tools }: { tools: Tool[] }) {
  return <ToolGrid tools={tools} />;
}
