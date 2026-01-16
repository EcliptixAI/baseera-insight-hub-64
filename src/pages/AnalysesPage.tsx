import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { mockAnalyses, categoryLabels, statusLabels } from "@/data/mockAnalyses";
import { cn } from "@/lib/utils";
import { FileSearch, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalysesPage() {
  const getRiskBadge = (level: string) => {
    const styles = {
      low: "bg-emerald-100 text-emerald-700",
      medium: "bg-amber-100 text-amber-700",
      high: "bg-red-100 text-red-700",
    };
    const labels = { low: "منخفض", medium: "متوسط", high: "عالي" };
    return <span className={cn("px-2 py-1 rounded-full text-xs font-medium", styles[level as keyof typeof styles])}>{labels[level as keyof typeof labels]}</span>;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">التحليلات السابقة</h1>
          <p className="text-muted-foreground mt-1">جميع التحليلات التي تم إجراؤها</p>
        </div>
        <Link to="/analysis/new"><Button className="gap-2"><Plus size={18} />تحليل جديد</Button></Link>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">العنوان</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">التصنيف</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">التاريخ</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">الحالة</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">المخاطر</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockAnalyses.map((analysis) => (
              <tr key={analysis.id} className="hover:bg-muted/30">
                <td className="px-6 py-4">
                  <Link to={`/analysis/${analysis.id}`} className="font-medium text-foreground hover:text-primary">{analysis.title}</Link>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{categoryLabels[analysis.category]}</td>
                <td className="px-6 py-4 text-muted-foreground">{new Date(analysis.date).toLocaleDateString("ar-SA")}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 rounded-full text-xs font-medium bg-muted">{statusLabels[analysis.status]}</span></td>
                <td className="px-6 py-4">{getRiskBadge(analysis.riskLevel)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
