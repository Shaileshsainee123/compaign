"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CampaignDetail() {
  const params = useParams();
  const campaignId = params.id;
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://mixo-fe-backend-task.vercel.app/campaigns/${campaignId}`
        );
        if (!response.ok) throw new Error("Failed to fetch campaign");

        const data = await response.json();
        setCampaign(data.campaign || null);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
        bgColor: "#16a34a",
        textColor: "#ffffff",
      },
      paused: {
        color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        bgColor: "#ca8a04",
        textColor: "#ffffff",
      },
      completed: {
        color: "bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300",
        bgColor: "#64748b",
        textColor: "#ffffff",
      },
    };
    return statusConfig[status] || statusConfig.paused;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      meta: "📱",
      google: "🔍",
      linkedin: "💼",
    };
    return icons[platform] || "📊";
  };

  const statusBadge = campaign ? getStatusBadge(campaign.status) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="px-6 py-6">
          <Link
            href="/"
            className="text-primary hover:underline text-sm font-medium mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Campaign Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin mb-4" />
              <div className="text-lg text-muted-foreground">
                Loading campaign details...
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {!loading && !error && campaign && (
          <div className="space-y-6">
            {/* Main Info Card */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {campaign.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Campaign ID: {campaign.id}
                  </p>
                </div>
                {statusBadge && (
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm gap-2 ${statusBadge.color}`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: statusBadge.bgColor,
                      }}
                    />
                    {campaign.status.charAt(0).toUpperCase() +
                      campaign.status.slice(1)}
                  </div>
                )}
              </div>

              {/* Budget Section */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">
                    Total Budget
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    ${campaign.budget.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">
                    Daily Budget
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    ${campaign.daily_budget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Brand Info */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Brand Information
                </h3>
                <p className="text-lg font-medium text-foreground">
                  {campaign.brand_id}
                </p>
              </div>

              {/* Platforms */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Platforms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {campaign.platforms.map((platform) => (
                    <div
                      key={platform}
                      className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg border border-border"
                    >
                      <span className="text-xl">{getPlatformIcon(platform)}</span>
                      <span className="font-medium text-foreground capitalize">
                        {platform}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Timeline
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mb-2" />
                  <div className="w-0.5 h-8 bg-border" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Created
                  </p>
                  <p className="text-foreground font-medium">
                    {formatDate(campaign.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-muted/30 border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Campaign Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-foreground capitalize">
                    {campaign.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Spend Rate</span>
                  <span className="font-medium text-foreground">
                    ${campaign.daily_budget.toLocaleString()} / day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Duration</span>
                  <span className="font-medium text-foreground">
                    {(campaign.budget / campaign.daily_budget).toFixed(0)} days
                  </span>
                </div>
              </div>
            </div>
            <Link
              href={`/campaign/${campaignId}/insights`}
              className="block w-full py-4 px-6 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors text-center"
            >
              View Campaign Insights
            </Link>
          </div>
        )}

        {!loading && !error && !campaign && (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground text-lg">
              Campaign not found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
