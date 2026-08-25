import { Suspense } from "react";
import SignupView from "@/sections/auth/SignupView";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="container text-center py-5">Loading...</div>}>
      <SignupView />
    </Suspense>
  );
}
