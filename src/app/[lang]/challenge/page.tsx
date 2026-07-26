import { Suspense } from "react";
import type { Metadata } from "next";
import { ChallengeClient } from "@/components/challenge/ChallengeClient";

export const metadata: Metadata = {
  title: "מפרק בועות",
  description:
    "בחרתם כבר מפלגה? בחנו את העמדות שלכם מול הטיעונים החזקים ביותר של המחנה הנגדי.",
};

export default function ChallengePage() {
  return (
    <Suspense fallback={null}>
      <ChallengeClient />
    </Suspense>
  );
}
