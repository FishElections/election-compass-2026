import type { Metadata } from "next";
import { HotTopicsClient } from "@/components/topics/HotTopicsClient";

export const metadata: Metadata = {
  title: "הנושאים החמים בבחירות 2026",
  description:
    "הסברים פשוטים וללא הטיה לסוגיות הכי שנויות במחלוקת בפוליטיקה הישראלית, בלי קשר למפלגות.",
};

export default function HotTopicsPage() {
  return <HotTopicsClient />;
}
