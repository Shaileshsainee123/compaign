"use client";

export default function CampaignFilters({ selectedStatus, onStatusChange }) {
  const statuses = [
    { value: "all", label: "All Campaigns", count: "all" },
    { value: "active", label: "Active", count: "active" },
    { value: "paused", label: "Paused", count: "paused" },
    { value: "completed", label: "Completed", count: "completed" },
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
              selectedStatus === status.value
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-foreground border border-border hover:border-primary/50 hover:bg-card/80"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}
