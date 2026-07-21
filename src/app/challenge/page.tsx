import { Suspense } from "react";
import { ChallengeClient } from "@/components/challenge/ChallengeClient";

export default function ChallengePage() {
  return (
    <Suspense fallback={null}>
      <ChallengeClient />
    </Suspense>
  );
}
