import { User } from "@/types";

export const currentUser: User = {
  id: "usr_001",
  name: "أحمد محمد العتيبي",
  email: "ahmed.otaibi@example.gov.sa",
  role: "محلل قرارات أول",
  department: "إدارة التخطيط الاستراتيجي",
  avatar: null,
  permissions: ["analyze", "view_cases", "export_reports", "manage_settings"]
};
