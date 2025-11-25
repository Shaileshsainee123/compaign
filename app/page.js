"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import CampaignMetrics from "./components/campaign-metrics"
import CampaignFilters from "./components/campaign-filters"
import CampaignTable from "./components/campaign-table"
export default function Home() {
   const [campaigns, setCampaigns] = useState([])
  const [filteredCampaigns, setFilteredCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://mixo-fe-backend-task.vercel.app/campaigns")
        if (!response.ok) throw new Error("Failed to fetch campaigns")
        const data = await response.json()
        setCampaigns(data.campaigns || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchCampaigns()
  }, [])

  // Filter campaigns based on status
  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredCampaigns(campaigns)
    } else {
      setFilteredCampaigns(campaigns.filter((c) => c.status === selectedStatus))
    }
  }, [campaigns, selectedStatus])
  return (
    <div className="bg-background">
      <div className="border-b border-border bg-card md:pt-0 pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Campaign Monitor</h1>
              <p className="text-muted-foreground text-lg">
                Track and manage your advertising campaigns across all platforms
              </p>
            </div>
            <Link
              href="/insights"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Insights
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Metrics */}
        {!loading && !error && <CampaignMetrics campaigns={campaigns} />}

        {/* Filters */}
        <CampaignFilters selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />

        {/* Content */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin mb-4" />
              <div className="text-lg text-muted-foreground">Loading campaigns...</div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 border border-destructive/20">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {!loading && !error && filteredCampaigns.length === 0 && (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground text-lg">No campaigns found</p>
          </div>
        )}

        {!loading && !error && filteredCampaigns.length > 0 && <CampaignTable campaigns={filteredCampaigns} />}
      </div>
    </div>
  );
}
