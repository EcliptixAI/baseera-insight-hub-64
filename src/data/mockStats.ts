import { DashboardStats, Report } from "@/types";

export const mockStats: DashboardStats = {
  totalAnalyses: 1247,
  highRiskCaught: 89,
  avgProcessingTime: 12,
  accuracyRate: 94.7,
  riskDistribution: {
    low: 67,
    medium: 24,
    high: 9,
  },
  monthlyAnalyses: 47,
  trendsData: [
    { month: "يناير", count: 42 },
    { month: "فبراير", count: 38 },
    { month: "مارس", count: 55 },
    { month: "أبريل", count: 47 },
    { month: "مايو", count: 62 },
    { month: "يونيو", count: 58 },
  ],
};

export const mockReports: Report[] = [
  {
    id: "rep_001",
    name: "تقرير الربع الأول 2024",
    date: "2024-04-01",
    type: "detailed",
    size: "2.4 MB",
    status: "ready",
  },
  {
    id: "rep_002",
    name: "ملخص شهر مارس 2024",
    date: "2024-03-31",
    type: "summary",
    size: "856 KB",
    status: "ready",
  },
  {
    id: "rep_003",
    name: "تقرير مقارنة السياسات",
    date: "2024-03-15",
    type: "comparative",
    size: "1.8 MB",
    status: "ready",
  },
  {
    id: "rep_004",
    name: "تقرير الربع الرابع 2023",
    date: "2024-01-05",
    type: "detailed",
    size: "3.1 MB",
    status: "ready",
  },
  {
    id: "rep_005",
    name: "تحليل المخاطر السنوي",
    date: "2024-01-01",
    type: "comparative",
    size: "4.2 MB",
    status: "ready",
  },
];
