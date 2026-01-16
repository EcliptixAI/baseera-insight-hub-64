import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-4 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>© 2024 بصيرة - جميع الحقوق محفوظة</span>
          <span className="text-xs bg-muted px-2 py-1 rounded">v1.0.0-beta</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">
            سياسة الخصوصية
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            الشروط والأحكام
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            الدعم الفني
          </a>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Shield size={14} className="text-status-success" />
          <span>متوافق مع معايير الهيئة الوطنية للأمن السيبراني</span>
        </div>
      </div>
    </footer>
  );
}
