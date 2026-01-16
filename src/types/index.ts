export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string | null;
  permissions: string[];
}

export interface Analysis {
  id: string;
  title: string;
  documentName: string;
  category: AnalysisCategory;
  date: string;
  status: AnalysisStatus;
  riskLevel: RiskLevel;
  overallScore: number;
  legalRisk: number;
  reputationRisk: number;
  operationalRisk: number;
}

export type AnalysisCategory = 
  | "administrative" 
  | "financial" 
  | "policy" 
  | "hr" 
  | "communication";

export type AnalysisStatus = 
  | "completed" 
  | "pending" 
  | "archived" 
  | "review";

export type RiskLevel = "high" | "medium" | "low";

export interface SensitiveTerm {
  term: string;
  context: string;
  sensitivity: RiskLevel;
  suggestion: string;
}

export interface HistoricalCase {
  id: string;
  title: string;
  entity: string;
  year: number;
  similarity: number;
  outcome: "success" | "failed" | "mixed";
  keyLesson: string;
  category: string;
  sector: "government" | "semi-gov" | "private";
  description: string;
  challenges: string[];
  lessonsLearned: string[];
  tags: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "analysis" | "case" | "report" | "system";
  date: string;
  read: boolean;
}

export interface Report {
  id: string;
  name: string;
  date: string;
  type: "summary" | "detailed" | "comparative";
  size: string;
  status: "ready" | "generating";
}

export interface DashboardStats {
  totalAnalyses: number;
  highRiskCaught: number;
  avgProcessingTime: number;
  accuracyRate: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  monthlyAnalyses: number;
  trendsData: { month: string; count: number }[];
}

export interface Recommendation {
  id: string;
  text: string;
  priority: "high" | "medium" | "low";
}
