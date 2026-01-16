import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Settings2,
  Check,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "رفع المستند", icon: Upload },
  { id: 2, title: "إعدادات التحليل", icon: Settings2 },
  { id: 3, title: "المعالجة", icon: Loader2 },
];

const categories = [
  { value: "administrative", label: "إداري" },
  { value: "financial", label: "مالي" },
  { value: "policy", label: "سياسات" },
  { value: "hr", label: "موارد بشرية" },
  { value: "communication", label: "تواصل" },
];

const sensitivities = [
  { value: "standard", label: "عادي" },
  { value: "high", label: "عالي" },
  { value: "critical", label: "حرج" },
];

const audiences = [
  { value: "internal", label: "داخلي" },
  { value: "public", label: "عام" },
  { value: "stakeholders", label: "أصحاب المصلحة" },
];

const processingSteps = [
  { id: 1, text: "جاري تحليل النص...", duration: 2000 },
  { id: 2, text: "فحص المصطلحات الحساسة...", duration: 1500 },
  { id: 3, text: "مقارنة مع الحالات السابقة...", duration: 2000 },
  { id: 4, text: "إنشاء التقرير...", duration: 1500 },
];

export default function NewAnalysisPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState("policy");
  const [sensitivity, setSensitivity] = useState("standard");
  const [audience, setAudience] = useState("internal");
  const [includeHistorical, setIncludeHistorical] = useState(true);
  const [processingStep, setProcessingStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate file upload
    setUploadedFile("قرار_تعديل_سياسة_العمل_عن_بعد.pdf");
  };

  const handleFileSelect = () => {
    // Simulate file selection
    setUploadedFile("قرار_تعديل_سياسة_العمل_عن_بعد.pdf");
  };

  const startProcessing = async () => {
    setCurrentStep(3);
    
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise((resolve) => setTimeout(resolve, processingSteps[i].duration));
      setCompletedSteps((prev) => [...prev, i]);
    }

    // Navigate to results
    setTimeout(() => {
      navigate("/analysis/ana_001");
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-full transition-all",
                currentStep === step.id
                  ? "bg-primary text-primary-foreground"
                  : currentStep > step.id
                  ? "bg-primary-100 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {currentStep > step.id ? (
                <Check size={18} />
              ) : (
                <step.icon size={18} className={currentStep === step.id ? "animate-pulse" : ""} />
              )}
              <span className="font-medium text-sm">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 h-0.5 mx-2",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Upload */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">رفع المستند</h1>
              <p className="text-muted-foreground mt-2">
                قم برفع المستند الذي تريد تحليله
              </p>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={handleFileSelect}
              className={cn(
                "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
                isDragging
                  ? "border-primary bg-primary-50"
                  : uploadedFile
                  ? "border-status-success bg-emerald-50"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              {uploadedFile ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-status-success/20 rounded-full flex items-center justify-center mb-4">
                    <FileText size={32} className="text-status-success" />
                  </div>
                  <p className="font-medium text-foreground">{uploadedFile}</p>
                  <p className="text-sm text-muted-foreground mt-1">2.4 ميجابايت</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="text-sm text-destructive hover:underline mt-3"
                  >
                    إزالة الملف
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={32} className="text-primary" />
                  </div>
                  <p className="font-medium text-foreground mb-2">
                    اسحب وأفلت الملف هنا
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    أو اختر ملفاً من جهازك
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span>الصيغ المدعومة: PDF, DOCX, TXT</span>
                    <span>•</span>
                    <span>الحجم الأقصى: 25 ميجابايت</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!uploadedFile}
                className="gap-2"
              >
                التالي
                <ChevronLeft size={18} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Configuration */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">إعدادات التحليل</h1>
              <p className="text-muted-foreground mt-2">
                حدد خيارات التحليل المناسبة
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border p-6 space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  تصنيف القرار
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={cn(
                        "p-3 rounded-lg border text-sm font-medium transition-all",
                        category === cat.value
                          ? "border-primary bg-primary-50 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sensitivity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  مستوى الحساسية
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {sensitivities.map((sens) => (
                    <button
                      key={sens.value}
                      onClick={() => setSensitivity(sens.value)}
                      className={cn(
                        "p-3 rounded-lg border text-sm font-medium transition-all",
                        sensitivity === sens.value
                          ? "border-primary bg-primary-50 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {sens.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audience */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  الجمهور المستهدف
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {audiences.map((aud) => (
                    <button
                      key={aud.value}
                      onClick={() => setAudience(aud.value)}
                      className={cn(
                        "p-3 rounded-lg border text-sm font-medium transition-all",
                        audience === aud.value
                          ? "border-primary bg-primary-50 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Historical Comparison Toggle */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">تضمين المقارنة التاريخية</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    مقارنة مع حالات مشابهة سابقة
                  </p>
                </div>
                <button
                  onClick={() => setIncludeHistorical(!includeHistorical)}
                  className={cn(
                    "w-12 h-7 rounded-full transition-colors relative",
                    includeHistorical ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full absolute top-1"
                    animate={{ left: includeHistorical ? 26 : 4 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                رجوع
              </Button>
              <Button onClick={startProcessing} className="gap-2">
                بدء التحليل
                <ChevronLeft size={18} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Processing */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center py-12"
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-8 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </motion.div>

            <h1 className="text-2xl font-bold text-foreground mb-2">جاري المعالجة</h1>
            <p className="text-muted-foreground mb-12">
              يتم الآن تحليل المستند، يرجى الانتظار...
            </p>

            <div className="max-w-md mx-auto space-y-4">
              {processingSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg transition-colors",
                    completedSteps.includes(index)
                      ? "bg-emerald-50"
                      : processingStep === index
                      ? "bg-primary-50"
                      : "bg-muted/50"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      completedSteps.includes(index)
                        ? "bg-status-success text-white"
                        : processingStep === index
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {completedSteps.includes(index) ? (
                      <Check size={16} />
                    ) : processingStep === index ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "font-medium",
                      completedSteps.includes(index) || processingStep === index
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
