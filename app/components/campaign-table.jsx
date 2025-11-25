"use client";
import Link from "next/link";
import { useState } from "react";

export default function CampaignTable({ campaigns }) {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  const paginatedCampaigns = campaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    const badges = {
      active: {
        color:
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300 border border-green-200 dark:border-green-900/50",
        label: "Active",
      },
      paused: {
        color:
          "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50",
        label: "Paused",
      },
      completed: {
        color:
          "bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-300 border border-slate-200 dark:border-slate-900/50",
        label: "Completed",
      },
    };
    return badges[status] || badges.paused;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getPlatformBadge = (platform) => {
    const platforms = {
      meta: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      google: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
      linkedin: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
      other: "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
    };
    return platforms[platform] || platforms.other;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Campaign Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Total Budget
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Daily Budget
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Platforms
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Created
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedCampaigns.map((campaign, idx) => {
              const statusBadge = getStatusBadge(campaign.status);

              return (
                <tr
                  key={campaign.id}
                  className={`border-b border-border transition-colors hover:bg-muted/20 cursor-pointer ${
                    idx % 2 === 0 ? "bg-background" : "bg-muted/5"
                  }`}
                >
                  <td colSpan={6}>
                    <Link href={`/campaign/${campaign.id}`}>
                      <div className="px-6 py-4 grid grid-cols-6 gap-4">
                        <div>
                          <div className="font-semibold text-foreground">
                            {campaign.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {campaign.id}
                          </div>
                        </div>

                        <div>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mr-2 inline-block"
                              style={{
                                backgroundColor:
                                  campaign.status === "active"
                                    ? "#16a34a"
                                    : campaign.status === "paused"
                                    ? "#ca8a04"
                                    : "#64748b",
                              }}
                            />
                            {statusBadge.label}
                          </span>
                        </div>

                        <div>
                          <div className="font-semibold text-foreground">
                            ${campaign.budget.toLocaleString()}
                          </div>
                        </div>

                        <div>
                          <div className="text-foreground">
                            ${campaign.daily_budget.toLocaleString()}
                          </div>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-2">
                            {campaign.platforms.map((platform) => (
                              <span
                                key={platform}
                                className={`inline-block px-2.5 py-1 rounded text-xs font-semibold capitalize ${getPlatformBadge(
                                  platform
                                )}`}
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {formatDate(campaign.created_at)}
                        </div>
                      </div>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 items-center p-4 border-t border-border">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 rounded bg-muted text-sm disabled:opacity-40"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === index + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 rounded bg-muted text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
