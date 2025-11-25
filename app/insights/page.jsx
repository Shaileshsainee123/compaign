"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function InsightsPage() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://mixo-fe-backend-task.vercel.app/campaigns/insights");
        if (!response.ok) throw new Error("Failed to fetch insights");
        const data = await response.json();
        setInsights(data.insights);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  const formatCurrency = (num) => {
    return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Campaign Insights</h1>
              <p className="text-muted-foreground text-lg">Comprehensive analytics across all campaigns</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin mb-4" />
              <div className="text-lg text-muted-foreground">Loading insights...</div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 border border-destructive/20">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {!loading && !error && insights && (
          <div className="space-y-8">
            {/* Campaign Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200 dark:border-blue-900/30 rounded-lg p-6">
                <div className="text-sm font-medium text-muted-foreground mb-3">Total Campaigns</div>
                <div className="text-4xl font-bold text-blue-700 dark:text-blue-400">{insights.total_campaigns}</div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-200 dark:border-green-900/30 rounded-lg p-6">
                <div className="text-sm font-medium text-muted-foreground mb-3">Active</div>
                <div className="text-4xl font-bold text-green-700 dark:text-green-400">{insights.active_campaigns}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {((insights.active_campaigns / insights.total_campaigns) * 100).toFixed(0)}% of total
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-200 dark:border-amber-900/30 rounded-lg p-6">
                <div className="text-sm font-medium text-muted-foreground mb-3">Paused</div>
                <div className="text-4xl font-bold text-amber-700 dark:text-amber-400">{insights.paused_campaigns}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {((insights.paused_campaigns / insights.total_campaigns) * 100).toFixed(0)}% of total
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200 dark:border-purple-900/30 rounded-lg p-6">
                <div className="text-sm font-medium text-muted-foreground mb-3">Completed</div>
                <div className="text-4xl font-bold text-purple-700 dark:text-purple-400">
                  {insights.completed_campaigns}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {((insights.completed_campaigns / insights.total_campaigns) * 100).toFixed(0)}% of total
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Impressions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-muted-foreground">Total Impressions</div>
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg">👁️</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(insights.total_impressions)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {(insights.total_impressions / insights.total_campaigns).toFixed(0)} avg per campaign
                </div>
              </div>

              {/* Total Clicks */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-muted-foreground">Total Clicks</div>
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🖱️</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{formatNumber(insights.total_clicks)}</div>
                <div className="text-xs text-muted-foreground">
                  {(insights.total_clicks / insights.total_campaigns).toFixed(0)} avg per campaign
                </div>
              </div>

              {/* Total Conversions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-muted-foreground">Total Conversions</div>
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg">✓</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {formatNumber(insights.total_conversions)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {(insights.total_conversions / insights.total_campaigns).toFixed(0)} avg per campaign
                </div>
              </div>

              {/* Total Spend */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-muted-foreground">Total Spend</div>
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg">💰</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{formatCurrency(insights.total_spend)}</div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrency(insights.total_spend / insights.total_campaigns)} avg per campaign
                </div>
              </div>

              {/* Average CTR */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-muted-foreground">Average CTR</div>
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg">%</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{insights.avg_ctr.toFixed(2)}%</div>
                <div className="text-xs text-muted-foreground">Click-through rate</div>
              </div>

              {/* Average CPC */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium text-muted-foreground">Average CPC</div>
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg">$</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{insights.avg_cpc.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">Cost per click</div>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Average Conversion Rate</h3>
                  <p className="text-muted-foreground">Percentage of clicks that result in conversions</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {insights.avg_conversion_rate.toFixed(2)}%
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-primary/70 h-full rounded-full"
                  style={{ width: `${Math.min(insights.avg_conversion_rate, 100)}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                Conversion metrics based on {insights.total_conversions} total conversions from {insights.total_clicks}{" "}
                clicks
              </div>
            </div>

            {/* Data Updated */}
            <div className="text-center py-6 text-sm text-muted-foreground border-t border-border">
              <p>Last updated: {new Date(insights.timestamp).toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
