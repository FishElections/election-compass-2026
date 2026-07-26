import type { Metadata } from "next";
import { PlatformsClient } from "@/components/platforms/PlatformsClient";

export const metadata: Metadata = {
  title: "מצעי המפלגות לבחירות 2026 בקצרה",
  description:
    "סיכום עמדות המפלגות המתמודדות בבחירות 2026, נושא אחרי נושא: ביטחון, כלכלה, מערכת המשפט, דת ומדינה וחברה.",
};

export default function PlatformsPage() {
  return <PlatformsClient />;
}
