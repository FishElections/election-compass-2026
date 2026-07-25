import type { Metadata } from "next";
import { GuideClient } from "@/components/guide/GuideClient";

export const metadata: Metadata = {
  title: "איך הבחירות בישראל עובדות? המדריך הפשוט | מצפן בחירות 2026",
  description:
    "המסע של פתק אחד: מהקלפי ועד הממשלה. מנדטים, אחוז החסימה, קואליציה ואופוזיציה - מוסבר פשוט, ציורי וב-5 דקות. בלי ז'רגון ובלי פוליטיקה.",
};

export default function HowItWorksPage() {
  return <GuideClient />;
}
