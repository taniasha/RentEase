"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import Card from "@/customComponents/Card";
import { ApexOptions } from "apexcharts";
import { getMyRentals } from "@/actions/tenant";
import { PaymentRecord } from "@/types/paymentTimeline";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[220px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl">
      <div className="flex flex-col items-center gap-2 text-slate-400">
        <Icon icon="solar:chart-2-bold-duotone" className="w-8 h-8 animate-pulse text-blue-500" />
        <span className="text-xs font-medium">Loading Apex Chart...</span>
      </div>
    </div>
  ),
});

export default function TenantTimelineGraph() {
  const [chartType, setChartType] = useState<"bar" | "area">("bar");
  const [timelineData, setTimelineData] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentalTimeline = async () => {
      try {
        const data = await getMyRentals();
        if (data && Array.isArray(data) && data.length > 0) {
          // Sort chronologically ascending
          const sorted = [...data].sort((a, b) => {
            const dateA = new Date(a.paidAt || a.createdAt || 0).getTime();
            const dateB = new Date(b.paidAt || b.createdAt || 0).getTime();
            return dateA - dateB;
          });

          const mapped: PaymentRecord[] = sorted.map((r) => {
            const rawDate = r.paidAt || r.createdAt ? new Date(r.paidAt || r.createdAt!) : new Date();
            const monthStr = rawDate.toLocaleDateString("en-IN", { month: "short" });
            const yearStr = rawDate.getFullYear().toString();
            const paidDateStr = rawDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
            const dueDateStr = `05 ${monthStr} ${yearStr}`;

            const paidDay = rawDate.getDate();
            const daysEarly = Math.max(0, 5 - paidDay);
            const score = Math.min(100, Math.max(70, 85 + daysEarly * 3));

            return {
              month: monthStr,
              year: yearStr,
              amount: `₹${Number(r.rentAmount || 0).toLocaleString("en-IN")}`,
              dueDate: dueDateStr,
              paidDate: paidDateStr,
              daysEarly: daysEarly,
              status: daysEarly > 0 ? "early" : "on_time",
              score: score,
            };
          });

          setTimelineData(mapped);
        } else {
          setTimelineData([]);
        }
      } catch (err) {
        console.error("Error loading timeline data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalTimeline();
  }, []);

  const punctualityScore =
    timelineData.length > 0
      ? Math.round(
          timelineData.reduce((acc, curr) => acc + curr.score, 0) / timelineData.length
        )
      : 100;

  // Apex Chart Configuration
  const chartOptions: ApexOptions = {
    chart: {
      type: chartType,
      height: 220,
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        borderRadiusApplication: "end",
        columnWidth: "40%",
        distributed: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#182E60", "#2563eb", "#0d9488", "#059669", "#3b82f6", "#1e40af"],
    dataLabels: {
      enabled: chartType === "bar",
      formatter: (val: number) => `${val}%`,
      offsetY: -16,
      style: {
        fontSize: "10px",
        fontWeight: "bold",
        colors: ["#64748b"],
      },
    },
    stroke: {
      curve: "smooth",
      width: chartType === "area" ? 3 : 0,
      colors: ["#2563eb"],
    },
    fill: {
      type: chartType === "area" ? "gradient" : "solid",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 95, 100],
      },
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
      padding: {
        top: 10,
        right: 12,
        bottom: 0,
        left: 12,
      },
    },
    xaxis: {
      categories: timelineData.map((p) => p.month),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "12px",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      min: 50,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (val) => `${val}%`,
        style: {
          colors: "#94a3b8",
          fontSize: "10px",
        },
      },
    },
    tooltip: {
      theme: "light",
      custom: ({ dataPointIndex }) => {
        const item = timelineData[dataPointIndex];
        if (!item) return "";
        const badgeText =
          item.daysEarly > 0
            ? `Paid ${item.daysEarly}d Early`
            : item.daysEarly === 0
            ? "Paid On Due Date"
            : "Grace Period";

        return `
          <div style="padding: 10px 14px; background: #ffffff; border-radius: 10px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; font-family: inherit;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
              <span style="font-weight: 700; color: #0f172a; font-size: 13px;">${item.month} ${item.year}</span>
              <span style="font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 9999px; background: ${
                item.daysEarly > 0 ? "#d1fae5" : "#dbeafe"
              }; color: ${item.daysEarly > 0 ? "#065f46" : "#1e40af"};">${badgeText}</span>
            </div>
            <div style="font-size: 11px; color: #64748b; line-height: 1.5;">
              <div><strong>Amount:</strong> <span style="color: #0f172a; font-weight: 600;">${item.amount}</span></div>
              <div><strong>Due Date:</strong> ${item.dueDate}</div>
              <div><strong>Paid Date:</strong> <span style="color: #059669; font-weight: 600;">${item.paidDate}</span></div>
              <div><strong>Timeliness Score:</strong> <span style="color: #2563eb; font-weight: 700;">${item.score}%</span></div>
            </div>
          </div>
        `;
      },
    },
  };

  const chartSeries = [
    {
      name: "Timeliness Score",
      data: timelineData.map((p) => p.score),
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Icon icon="solar:chart-square-bold-duotone" className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Payment Timeline
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-md font-black text-slate-900 tracking-tight">
              {punctualityScore}%
            </span>
            <span className="text-[10px] font-bold text-emerald-600 flex items-center">
              <Icon icon="solar:arrow-right-up-linear" className="w-3.5 h-3.5" />
              Flawless
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-5 space-y-4">
        {loading ? (
          <div className="h-[220px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl">
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <Icon icon="solar:chart-2-bold-duotone" className="w-8 h-8 animate-pulse text-blue-500" />
              <span className="text-xs font-medium">Loading timeline...</span>
            </div>
          </div>
        ) : timelineData.length === 0 ? (
          <div className="h-[220px] w-full flex flex-col items-center justify-center text-center p-6 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <Icon icon="solar:bill-check-bold-duotone" className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-700">No payment history yet</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              When you pay rent for your rental properties, your payment timeline & punctuality score will appear here.
            </p>
          </div>
        ) : (
          <div className="w-full">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type={chartType}
              height={220}
              width="100%"
            />
          </div>
        )}
      </Card>
    </div>
  );
}
