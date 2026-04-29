import Link from "next/link";

export default function PaymentSuccessPage() {
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
      <span style={{ fontSize: "3rem" }}>✨</span>
      <h1>Payment Successful!</h1>
      <p style={{ maxWidth: "440px" }}>
        Thank you for booking with <strong>Dare Beauty</strong>. We&apos;ll be in touch shortly
        to confirm your appointment details.
      </p>
      <p style={{ maxWidth: "440px", fontSize: "0.9rem", opacity: 0.75 }}>
        Didn&apos;t receive a confirmation email? Drop us a message on WhatsApp and we&apos;ll
        sort it out right away.
      </p>
      <Link href="/" className="book-btn">
        Back to Home
      </Link>
    </main>
  );
}