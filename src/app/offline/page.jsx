import Link from "next/link";
import { ArrowLeft, WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <main className="offline-page">
      <div className="offline-card">
        <span className="offline-icon">
          <WifiOff aria-hidden="true" size={25} />
        </span>
        <p className="eyebrow">You’re offline</p>
        <h1 className="section-heading">A connection is needed for this page.</h1>
        <p>
          Check your connection and try again. The homepage may still be
          available from your last visit.
        </p>
        <Link className="button-primary offline-link" href="/">
          <ArrowLeft aria-hidden="true" size={17} /> Back to the website
        </Link>
      </div>
    </main>
  );
}
