"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function CampaignInsightsPage() {
  const params = useParams()
  const campaignId = params.id
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://mixo-fe-backend-task.vercel.app/campaigns/${campaignId}/insights`
        )
        if (!response.ok) throw new Error("Failed to fetch campaign insights")
        const data = await response.json()
        setInsights(data.insights)
      } catch (err) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [campaignId])

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toLocaleString()
  }

  const formatCurrency = (num) => {
    return `$${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Link
                href={`/campaign/${campaignId}`}
                className="text-primary hover:underline text-sm font-medium mb-4 inline-block"
              >
                ← Back to Campaign Details
              </Link>

              <h1 className="text-4xl font-bold text-foreground">Campaign Insights</h1>
              <p className="text-muted-foreground text-lg mt-2">
                Detailed performance metrics for this campaign
              </p>
            </div>

            <Link
              href="/"
              className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin mb-4" />
              <div className="text-lg text-muted-foreground">Loading campaign insights...</div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {!loading && !error && insights && (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-3">Total Impressions</div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {formatNumber(insights.impressions)}
                </div>
                <div className="text-xs text-muted-foreground">Audience reach</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-3">Total Clicks</div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {formatNumber(insights.clicks)}
                </div>
                <div className="text-xs text-muted-foreground">User interactions</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-3">Total Conversions</div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {formatNumber(insights.conversions)}
                </div>
                <div className="text-xs text-muted-foreground">Completed actions</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="text-sm font-medium text-muted-foreground mb-3">Total Spend</div>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {formatCurrency(insights.spend)}
                </div>
                <div className="text-xs text-muted-foreground">Campaign budget used</div>
              </div>
            </div>

            {/* Extra Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* CTR */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  Click-Through Rate (CTR)
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="text-5xl font-bold text-primary">{insights.ctr.toFixed(2)}</div>
                  <div className="text-xl text-muted-foreground">%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${Math.min(insights.ctr * 10, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {insights.clicks} clicks from {insights.impressions} impressions
                </p>
              </div>

              {/* CPC */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  Cost Per Click (CPC)
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="text-5xl font-bold text-primary">${insights.cpc.toFixed(2)}</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${Math.min((insights.cpc / 10) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {formatCurrency(insights.spend)} spent for {formatNumber(insights.clicks)} clicks
                </p>
              </div>

              {/* Conversion Rate */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
                  Conversion Rate
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <div className="text-5xl font-bold text-primary">
                    {insights.conversion_rate.toFixed(2)}
                  </div>
                  <div className="text-xl text-muted-foreground">%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: `${Math.min(insights.conversion_rate * 10, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {formatNumber(insights.conversions)} conversions from{" "}
                  {formatNumber(insights.clicks)} clicks
                </p>
              </div>
            </div>

            {/* Efficiency */}
            <div className="bg-gradient-to-br from-card to-muted/30 border border-border rounded-lg p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">Efficiency Analysis</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-2">
                    Cost Per Conversion
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {formatCurrency(
                      insights.spend / Math.max(insights.conversions, 1)
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-2">
                    Impressions Per Conversion
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {(insights.impressions / Math.max(insights.conversions, 1)).toFixed(0)}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-2">
                    Average Cost Per Impression
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    ${((insights.spend / insights.impressions) * 1000).toFixed(3)}
                  </div>
                  <div className="text-xs text-muted-foreground">per 1000 impressions (CPM)</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-2">
                    Clicks Per Conversion
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {(insights.clicks / Math.max(insights.conversions, 1)).toFixed(1)}
                  </div>
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-center py-6 text-sm text-muted-foreground border-t border-border">
              <p>Last updated: {new Date(insights.timestamp).toLocaleString()}</p>
            </div>

            {/* Streaming Link */}
            <Link
              href={`/campaign/${campaignId}/insights/stream`}
              className="block w-full py-4 px-6 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors text-center"
            >
              View Real-Time Streaming Data
            </Link>
          </div>
        )}

        {!loading && !error && !insights && (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground text-lg">Insights not found</p>
          </div>
        )}
      </div>
    </div>
  )
}
