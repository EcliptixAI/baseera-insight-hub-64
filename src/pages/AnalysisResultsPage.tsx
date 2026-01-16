import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Download,
  Edit,
  CheckCircle2,
  Archive,
  AlertTriangle,
  Scale,
  Users,
  Settings2,
  ArrowLeft,
  TrendingUp,
  Clock,
  FileText,
} from "lucide-react";
import { mockAnalyses, mockSensitiveTerms, mockRecommendations } from "@/data/mockAnalyses";
import { mockCases } from "@/data/mockCases";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

export default function AnalysisResultsPage() {
  const { id } = useParams();
  const analysis = mockAnalyses.find((a) => a.id === id) || mockAnalyses[0];
  const historicalCases = mockCases.slice(0, 2);

  const getRiskColor = (score: number) => {
    if (score <= 3) return "text-risk-low";
    if (score <= 6) return "text-risk-medium";
    return "text-risk-high";
  };

  const getRiskBg = (score: number) => {
    if (score <= 3) return "bg-emerald-50";
    if (score <= 6) return "bg-amber-50";
    return "bg-red-50";
  };

  const getRiskLabel = (score: number) => {
    if (score <= 3) return "منخفض";
    if (score <= 6) return "متوسط";
    return "عالي";
  };

  const overallRiskLevel = analysis.riskLevel;
  const recommendationText =
    overallRiskLevel === "high"
      ? "مخاطر عالية - توقف"
      : overallRiskLevel === "medium"
      ? "مراجعة مطلوبة"
      : "موافق للتنفيذ";

  const handleDownload = () => {
    toast.success("جاري تحميل التقرير...", {
      description: "سيتم تحميل الملف خلال لحظات",
    });
  };

  const handleApprove = () => {
    toast.success("تم اعتماد القرار بنجاح", {
      description: "سيتم إرسال إشعار للجهات المعنية",
    });
  };

  const handleArchive = () => {
    toast.info("تم أرشفة التحليل", {
      description: "يمكنك الوصول إليه من قسم الأرشيف",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Link
            to="/analyses"
            className="mt-1 p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{analysis.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {new Date(analysis.date).toLocaleDateString("ar-SA")}
              </span>
              <span className="flex items-center gap-1">
                <FileText size={14} />
                {analysis.documentName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={handleDownload}>
            <Download size={18} />
            تحميل التقرير
          </Button>
          <Link to="/analysis/new">
            <Button variant="outline" className="gap-2">
              <Edit size={18} />
              تعديل وإعادة التحليل
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Overall Score Card */}
      <motion.div
        variants={itemVariants}
        className={cn(
          "p-8 rounded-2xl border-2",
          overallRiskLevel === "high"
            ? "bg-red-50 border-red-200"
            : overallRiskLevel === "medium"
            ? "bg-amber-50 border-amber-200"
            : "bg-emerald-50 border-emerald-200"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Risk Circle */}
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/50"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={251}
                  className={cn(
                    overallRiskLevel === "high"
                      ? "text-risk-high"
                      : overallRiskLevel === "medium"
                      ? "text-risk-medium"
                      : "text-risk-low"
                  )}
                  initial={{ strokeDashoffset: 251 }}
                  animate={{ strokeDashoffset: 251 - (analysis.overallScore / 100) * 251 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <motion.span
                  className="text-3xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {analysis.overallScore}
                </motion.span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">مستوى المخاطر الإجمالي</p>
              <h2 className="text-3xl font-bold text-foreground">
                {overallRiskLevel === "high"
                  ? "عالي"
                  : overallRiskLevel === "medium"
                  ? "متوسط"
                  : "منخفض"}
              </h2>
            </div>
          </div>

          <div
            className={cn(
              "px-6 py-4 rounded-xl flex items-center gap-3",
              overallRiskLevel === "high"
                ? "bg-red-100 text-red-700"
                : overallRiskLevel === "medium"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700"
            )}
          >
            {overallRiskLevel === "high" ? (
              <AlertTriangle size={24} />
            ) : overallRiskLevel === "medium" ? (
              <AlertTriangle size={24} />
            ) : (
              <CheckCircle2 size={24} />
            )}
            <div>
              <p className="text-sm font-medium">التوصية</p>
              <p className="text-lg font-bold">{recommendationText}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Risk Scorecard */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "المخاطر القانونية",
            score: analysis.legalRisk,
            icon: Scale,
          },
          {
            title: "مخاطر السمعة",
            score: analysis.reputationRisk,
            icon: Users,
          },
          {
            title: "المخاطر التشغيلية",
            score: analysis.operationalRisk,
            icon: Settings2,
          },
        ].map((risk) => (
          <div
            key={risk.title}
            className={cn("p-6 rounded-xl border border-border bg-white", getRiskBg(risk.score))}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("p-2 rounded-lg", getRiskBg(risk.score))}>
                <risk.icon size={20} className={getRiskColor(risk.score)} />
              </div>
              <span className="font-medium text-foreground">{risk.title}</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className={cn("text-4xl font-bold", getRiskColor(risk.score))}>
                  {risk.score}
                </p>
                <p className="text-sm text-muted-foreground">/ 10</p>
              </div>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  risk.score <= 3
                    ? "bg-emerald-100 text-emerald-700"
                    : risk.score <= 6
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                {getRiskLabel(risk.score)}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Sensitive Terms */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl border border-border overflow-hidden"
      >
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <AlertTriangle size={20} className="text-risk-medium" />
            المصطلحات الحساسة المكتشفة
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                  المصطلح
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                  السياق
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                  مستوى الحساسية
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                  البديل المقترح
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockSensitiveTerms.map((term, index) => (
                <motion.tr
                  key={term.term}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:bg-muted/30"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    "{term.term}"
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">
                    {term.context}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        term.sensitivity === "high"
                          ? "bg-red-100 text-red-700"
                          : term.sensitivity === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      )}
                    >
                      {term.sensitivity === "high"
                        ? "🔴 عالي"
                        : term.sensitivity === "medium"
                        ? "🟡 متوسط"
                        : "🟢 منخفض"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-status-success font-medium">
                    "{term.suggestion}"
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Historical Cases */}
      <motion.div variants={itemVariants}>
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          الحالات المشابهة تاريخياً
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {historicalCases.map((caseItem) => (
            <div
              key={caseItem.id}
              className="bg-white rounded-xl border border-border p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-foreground">{caseItem.title}</h4>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    caseItem.outcome === "success"
                      ? "bg-emerald-100 text-emerald-700"
                      : caseItem.outcome === "failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {caseItem.outcome === "success"
                    ? "🟢 ناجح"
                    : caseItem.outcome === "failed"
                    ? "🔴 واجه تحديات"
                    : "🟡 نتائج متفاوتة"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{caseItem.entity}</p>
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="text-primary font-medium">
                  نسبة التشابه: {caseItem.similarity}%
                </span>
                <span className="text-muted-foreground">{caseItem.year}</span>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm font-medium text-foreground">الدرس الرئيسي:</p>
                <p className="text-sm text-muted-foreground mt-1">{caseItem.keyLesson}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl border border-border p-6">
        <h3 className="font-semibold text-lg mb-4">التوصيات</h3>
        <div className="space-y-3">
          {mockRecommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg",
                rec.priority === "high"
                  ? "bg-red-50"
                  : rec.priority === "medium"
                  ? "bg-amber-50"
                  : "bg-muted/50"
              )}
            >
              <span
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0",
                  rec.priority === "high"
                    ? "bg-risk-high"
                    : rec.priority === "medium"
                    ? "bg-risk-medium"
                    : "bg-muted-foreground"
                )}
              >
                {index + 1}
              </span>
              <p className="text-foreground">{rec.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Improved Draft */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl border border-border p-6">
        <h3 className="font-semibold text-lg mb-4">المسودة المحسنة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">النص الأصلي</p>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-foreground">
                "التطبيق <span className="bg-red-200 px-1">إلزامي</span> على الجميع دون
                استثناء، وستُفرض <span className="bg-red-200 px-1">عقوبات صارمة</span> على
                المخالفين. التنفيذ <span className="bg-red-200 px-1">الفوري</span> مطلوب من
                جميع الإدارات."
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">النص المحسن</p>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-foreground">
                "التطبيق <span className="bg-emerald-200 px-1">مُوصى به بشدة</span> لجميع
                المنسوبين، وسيتم اتخاذ{" "}
                <span className="bg-emerald-200 px-1">إجراءات تصحيحية</span> عند الحاجة.
                يُفضل البدء بالتنفيذ{" "}
                <span className="bg-emerald-200 px-1">في أقرب وقت ممكن</span> بالتنسيق مع
                الإدارات المعنية."
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" className="gap-2" onClick={handleArchive}>
          <Archive size={18} />
          أرشفة
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={handleDownload}>
            <Download size={18} />
            تحميل التقرير الكامل
          </Button>
          {overallRiskLevel !== "high" && (
            <Button className="gap-2" onClick={handleApprove}>
              <CheckCircle2 size={18} />
              اعتماد القرار
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
