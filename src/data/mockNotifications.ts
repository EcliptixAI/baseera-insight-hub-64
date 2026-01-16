import { Notification } from "@/types";

export const mockNotifications: Notification[] = [
  {
    id: "notif_001",
    title: "اكتمل التحليل",
    message: "تم الانتهاء من تحليل 'قرار تعديل سياسة العمل عن بُعد' بنجاح",
    type: "analysis",
    date: "2024-01-15T10:30:00",
    read: false,
  },
  {
    id: "notif_002",
    title: "حالة دراسية جديدة",
    message: "تمت إضافة حالة دراسية جديدة: 'تطبيق نظام المشتريات الإلكتروني'",
    type: "case",
    date: "2024-01-14T15:45:00",
    read: false,
  },
  {
    id: "notif_003",
    title: "التقرير جاهز",
    message: "تقرير الربع الأول 2024 جاهز للتحميل",
    type: "report",
    date: "2024-01-14T09:00:00",
    read: false,
  },
  {
    id: "notif_004",
    title: "تحديث النظام",
    message: "تم تحديث خوارزميات التحليل لتحسين دقة النتائج",
    type: "system",
    date: "2024-01-13T11:20:00",
    read: true,
  },
  {
    id: "notif_005",
    title: "تحليل يحتاج مراجعة",
    message: "التحليل 'اتفاقية الشراكة الاستراتيجية' يحتاج لمراجعتك",
    type: "analysis",
    date: "2024-01-12T14:00:00",
    read: true,
  },
  {
    id: "notif_006",
    title: "تذكير أمني",
    message: "يرجى تحديث كلمة المرور الخاصة بك خلال الأسبوع القادم",
    type: "system",
    date: "2024-01-11T08:30:00",
    read: true,
  },
];
