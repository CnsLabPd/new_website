export default function RefundPolicy() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative pt-48 pb-20 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6">
          <h1 className="mb-8 text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Refund and Cancellation Policy
          </h1>
          <p className="text-muted-foreground text-sm">Effective Date: 09/03/2026</p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-8">
            We strive to ensure satisfaction with our neurotechnology products and educational workshops. Our policy regarding cancellations and refunds is as follows:
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">1. Workshops and Training</h2>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-6 space-y-3">
            <li><strong>Cancellation by User:</strong> You may cancel your registration for workshops up to 24 hours before the start date for a full refund.</li>
            <li><strong>Cancellation by Neurogati:</strong> If a workshop is canceled or rescheduled by us, users will be offered a full refund or the option to attend a future session.</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Non-Refundable Situations</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Refunds may not be applicable in the following cases:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-6 space-y-2">
            <li>Failure to attend a registered workshop</li>
            <li>Digital products or software tools that have already been delivered or accessed</li>
            <li>Services that have already been completed</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">2. Software and Subscriptions</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            <strong>SaaS Products:</strong> For subscription-based games and tools, you may cancel your subscription at any time. Refunds for the current billing cycle are only available if requested within 7 days of payment, provided the service has not been extensively utilized.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">3. Digital Content</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Downloadable research materials or pre-recorded educational content are generally non-refundable once access is granted.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">4. Refund Process</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            To request a refund, please email <a href="mailto:contactus@neurogati.com" className="text-blue-400 hover:text-blue-300 underline">contactus@neurogati.com</a> with your transaction details. Approved refunds will be processed via the original payment method (such as UPI, card payment, bank transfer, or payment gateway transaction) within 5–7 working days.
          </p>
        </div>
      </section>
    </div>
  );
}
