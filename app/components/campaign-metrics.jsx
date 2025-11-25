export default function CampaignMetrics({ campaigns }) {
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalDailyBudget = campaigns.reduce((sum, c) => sum + c.daily_budget, 0);
  const pausedCampaigns = campaigns.filter((c) => c.status === "paused").length;

  const metrics = [
    {
      label: "Active Campaigns",
      value: activeCampaigns.toString(),
      color: "from-green-500/10 to-green-600/5 border-green-200 dark:border-green-900/30",
      textColor: "text-green-700 dark:text-green-400",
    },
    {
      label: "Total Budget",
      value: `$${(totalBudget / 1000).toFixed(1)}K`,
      color: "from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-900/30",
      textColor: "text-blue-700 dark:text-blue-400",
    },
    {
      label: "Daily Budget",
      value: `$${(totalDailyBudget / 1000).toFixed(1)}K`,
      color: "from-purple-500/10 to-purple-600/5 border-purple-200 dark:border-purple-900/30",
      textColor: "text-purple-700 dark:text-purple-400",
    },
    {
      label: "Paused Campaigns",
      value: pausedCampaigns.toString(),
      color: "from-amber-500/10 to-amber-600/5 border-amber-200 dark:border-amber-900/30",
      textColor: "text-amber-700 dark:text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className={`bg-gradient-to-br ${metric.color} border rounded-lg p-6`}
        >
          <div className="text-sm font-medium text-muted-foreground mb-3">
            {metric.label}
          </div>
          <div className={`text-3xl font-bold ${metric.textColor}`}>
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  );
}
