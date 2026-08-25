import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container text-center py-5" style={{ marginTop: "8rem" }}>
      <h1 className="display-1 fw-bold text-secondary">404</h1>
      <h3 className="fw-bold mb-3">Page Not Found</h3>
      <p className="text-muted mb-4">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="btn btn-primary px-4 py-2 rounded-pill">
        Return Home
      </Link>
    </div>
  );
}
