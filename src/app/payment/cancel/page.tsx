import Link from "next/link";
import { whatsappLink } from "@/data/siteContent";

export default function PaymentCancelPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.2rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "3rem" }}>💜</span>
      <h1>Payment Cancelled</h1>
      <p style={{ maxWidth: "440px" }}>
        No worries — your payment was cancelled and nothing has been charged.
        If you need help or have questions, we&apos;re always happy to assist.
      </p>
      <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/#parties" className="book-btn">
          Try Again
        </Link>
        <a className="secondary-btn" href={whatsappLink} target="_blank" rel="noreferrer">
          Chat on WhatsApp
        </a>
      </div>
    </main>
  );
}