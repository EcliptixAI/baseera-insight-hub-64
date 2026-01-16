import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3,
  FileSearch,
  AlertTriangle,
  Clock,
  Target,
  Plus,
  Library,
  FileText,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { mockStats } from "@/data/mockStats";
import { mockAnalyses, categoryLabels, statusLabels } from "@/data/mockAnalyses";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const recentAnalyses = mockAnalyses.slice(0, 5);

  const stats = [
    {
      title: "إجمالي التحليلات",
      value: mockStats.totalAnalyses.toLocaleString("ar-SA"),
      icon: BarChart3,
      color: "text-primary",
      bgColor: "bg-primary-50",
    },
    {
      title: "مخاطر عالية تم رصدها",
      value: mockStats.highRiskCaught.toLocaleString("ar-SA"),
      icon: AlertTriangle,
      color: "text-risk-high",
      bgColor: "bg-red-50",
    },
    {
      title: "متوسط وقت المعالجة",
      value: `${mockStats.avgProcessingTime} ثانية`,
      icon: Clock,
      color: "text-status-info",
      bgColor: "bg-blue-50",
    },
    {
      title: "نسبة الدقة",
      value: `${mockStats.accuracyRate}%`,
      icon: Target,
      color: "text-status-success",
      bgColor: "bg-emerald-50",
    },
  ];

  const getRiskBadge = (level: string) => {
    const styles = {
      low: "bg-emerald-100 text-emerald-700 border-emerald-200",
      medium: "bg-amber-100 text-amber-700 border-amber-200",
      high: "bg-red-100 text-red-700 border-red-200",
    };
    const labels = { low: "منخفض", medium: "متوسط", high: "عالي" };
    return (
      <span
        className={cn(
          "px-2 py-1 rounded-full text-xs font-medium border",
          styles[level as keyof typeof styles]
        )}
      >
        {labels[level as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: "bg-emerald-100 text-emerald-700",
      pending: "bg-blue-100 text-blue-700",
      archived: "bg-gray-100 text-gray-700",
      review: "bg-amber-100 text-amber-700",
    };
    return (
      <span
        className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          styles[status as keyof typeof styles]
        )}
      >
        {statusLabels[status]}
      </span>
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Title */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="text-muted-foreground mt-1">مرحباً بك، هذه نظرة عامة على نشاطك</p>
        </div>
        <Link to="/analysis/new">
          <Button className="gap-2">
            <Plus size={18} />
            تحليل جديد
          </Button>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl p-6 border border-border shadow-sm card-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-2 text-foreground">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Analyses */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-xl border border-border shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileSearch size={20} className="text-primary" />
              <h2 className="font-semibold text-lg">أحدث التحليلات</h2>
            </div>
            <Link to="/analyses" className="text-sm text-primary hover:underline flex items-center gap-1">
              عرض الكل
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentAnalyses.map((analysis, index) => (
              <motion.div
                key={analysis.id}
                className="p-4 hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Link
                      to={`/analysis/${analysis.id}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {analysis.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span>{categoryLabels[analysis.category]}</span>
                      <span>•</span>
                      <span>{new Date(analysis.date).toLocaleDateString("ar-SA")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(analysis.status)}
                    {getRiskBadge(analysis.riskLevel)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl border border-border shadow-sm p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={20} className="text-primary" />
            <h2 className="font-semibold text-lg">توزيع المخاطر</h2>
          </div>

          {/* Donut Chart */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
              />
              {/* Low risk - Green */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--risk-low))"
                strokeWidth="12"
                strokeDasharray={`${mockStats.riskDistribution.low * 2.51} 251`}
                strokeDashoffset="0"
                initial={{ strokeDasharray: "0 251" }}
                animate={{ strokeDasharray: `${mockStats.riskDistribution.low * 2.51} 251` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              {/* Medium risk - Amber */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--risk-medium))"
                strokeWidth="12"
                strokeDasharray={`${mockStats.riskDistribution.medium * 2.51} 251`}
                strokeDashoffset={`-${mockStats.riskDistribution.low * 2.51}`}
                initial={{ strokeDasharray: "0 251" }}
                animate={{ strokeDasharray: `${mockStats.riskDistribution.medium * 2.51} 251` }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              {/* High risk - Red */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--risk-high))"
                strokeWidth="12"
                strokeDasharray={`${mockStats.riskDistribution.high * 2.51} 251`}
                strokeDashoffset={`-${(mockStats.riskDistribution.low + mockStats.riskDistribution.medium) * 2.51}`}
                initial={{ strokeDasharray: "0 251" }}
                animate={{ strokeDasharray: `${mockStats.riskDistribution.high * 2.51} 251` }}
                transition={{ duration: 1, delay: 0.9 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-foreground">{mockStats.monthlyAnalyses}</span>
              <span className="text-sm text-muted-foreground">هذا الشهر</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {[
              { label: "منخفض", value: mockStats.riskDistribution.low, color: "bg-risk-low" },
              { label: "متوسط", value: mockStats.riskDistribution.medium, color: "bg-risk-medium" },
              { label: "عالي", value: mockStats.riskDistribution.high, color: "bg-risk-high" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", item.color)} />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "تحليل قرار جديد",
            description: "ابدأ تحليل مستند جديد لتقييم المخاطر",
            icon: Plus,
            link: "/analysis/new",
            primary: true,
          },
          {
            title: "استعراض الحالات",
            description: "تصفح مكتبة الحالات الدراسية",
            icon: Library,
            link: "/cases",
            primary: false,
          },
          {
            title: "عرض التقارير",
            description: "اطلع على التقارير والإحصائيات",
            icon: FileText,
            link: "/reports",
            primary: false,
          },
        ].map((action) => (
          <Link
            key={action.title}
            to={action.link}
            className={cn(
              "p-6 rounded-xl border transition-all card-hover flex items-start gap-4",
              action.primary
                ? "gradient-primary pattern-islamic text-white border-transparent"
                : "bg-white border-border hover:border-primary/30"
            )}
          >
            <div
              className={cn(
                "p-3 rounded-xl",
                action.primary ? "bg-white/20" : "bg-primary-50"
              )}
            >
              <action.icon
                size={24}
                className={action.primary ? "text-white" : "text-primary"}
              />
            </div>
            <div>
              <h3
                className={cn(
                  "font-semibold",
                  action.primary ? "text-white" : "text-foreground"
                )}
              >
                {action.title}
              </h3>
              <p
                className={cn(
                  "text-sm mt-1",
                  action.primary ? "text-white/80" : "text-muted-foreground"
                )}
              >
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
