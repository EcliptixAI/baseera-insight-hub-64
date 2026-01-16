import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Building2, Calendar, TrendingUp } from "lucide-react";
import { mockCases, outcomeLabels, sectorLabels } from "@/data/mockCases";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState("all");

  const filteredCases = mockCases.filter((c) => {
    const matchesSearch = c.title.includes(searchQuery) || c.entity.includes(searchQuery);
    const matchesOutcome = selectedOutcome === "all" || c.outcome === selectedOutcome;
    return matchesSearch && matchesOutcome;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">مكتبة الحالات الدراسية</h1>
          <p className="text-muted-foreground mt-1">تصفح وتعلم من القرارات السابقة</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="بحث في الحالات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "success", "failed", "mixed"].map((outcome) => (
            <button
              key={outcome}
              onClick={() => setSelectedOutcome(outcome)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedOutcome === outcome
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {outcome === "all" ? "الكل" : outcomeLabels[outcome]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map((caseItem, index) => (
          <motion.div
            key={caseItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-border p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                caseItem.outcome === "success" ? "bg-emerald-100 text-emerald-700" :
                caseItem.outcome === "failed" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
              )}>
                {outcomeLabels[caseItem.outcome]}
              </span>
              <span className="text-xs text-muted-foreground">{caseItem.year}</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{caseItem.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Building2 size={14} />
              <span className="truncate">{caseItem.entity}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{caseItem.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-muted px-2 py-1 rounded">{sectorLabels[caseItem.sector]}</span>
              <Link to={`/cases/${caseItem.id}`} className="text-sm text-primary hover:underline">
                عرض التفاصيل
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
